import React, { useState, useEffect, useContext } from "react";
import PropertyCard from "../../Components/PropertyCard";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";

const API_URL = "https://yessghor-server.vercel.app";

function Saved() {
  const { user } = useContext(AuthContext);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchBookmarks = async () => {
      try {
        const res = await fetch(`${API_URL}/users/${user._id}/bookmarks`,
          {
            credentials:"include"
          }
        );
        const data = await res.json();

        const formatted = data.map(post => ({
          _id: post._id,
          title: post.title,
          location: post.location,
          houseNo: post.houseNo,
          date: post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : "",
          houseType: post.category,
          image: post.images?.[0] || "/no-image.png",
          price: post.rent,
          bookmarked: true,
        }));

        setPlaces(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  const toggleBookmark = async (id) => {
    try {
      await fetch(`${API_URL}/users/${user._id}/bookmark/${id}`, {
        method: "PATCH",
        credentials: "include"
      });

      setPlaces(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user)
    return <p className="text-center py-10">Please log in to view saved properties.</p>;

  if (loading)
    return <p className="text-center py-10">Loading saved properties...</p>;

  if (places.length === 0)
    return (
      <p className="text-center py-16 text-gray-500">
        No saved properties yet.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">
        Saved Properties
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {places.map((place) => (
          <div key={place._id} className="relative group">
            {/* Bookmark */}
            <button
              onClick={() => toggleBookmark(place._id)}
              className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow hover:scale-105 transition"
            >
              <BsBookmarkFill size={18} className="text-[#1b4965]" />
            </button>

            {/* Card */}
            <PropertyCard places={[place]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Saved;
