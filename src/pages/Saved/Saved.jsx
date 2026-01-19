import React, { useState, useEffect, useContext } from "react";
import PropertyCard from "../../Components/PropertyCard";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";

const API_URL = "https://yessghor-server.vercel.app";

function Saved() {
  const { user } = useContext(AuthContext);
  const [featuredPlaces, setFeaturedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookmarks
  useEffect(() => {
    if (!user?._id) return;

    const fetchBookmarks = async () => {
      try {
        const res = await fetch(`${API_URL}/users/${user._id}/bookmarks`);
        if (!res.ok) throw new Error("Failed to fetch bookmarks");

        const data = await res.json();

        const formattedData = data.map((post) => ({
          _id: post._id,
          title: post.title,
          location: post.location,
          houseNo: post.houseNo,
          date: post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : "",
          houseType: post.houseType,
          image: post.images?.length
            ? post.images[0].startsWith("http")
              ? post.images[0]
              : `${API_URL}${post.images[0]}`
            : "/no-image.png",
          price: post.rent,
          bookmarked: true,
        }));

        setFeaturedPlaces(formattedData);
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  // Toggle bookmark
  const toggleBookmark = async (index) => {
    const place = featuredPlaces[index];
    if (!user?._id) return;

    try {
      const res = await fetch(
        `${API_URL}/users/${user._id}/bookmark/${place._id}`,
        {
          method: "PATCH",
        },
      );
      if (!res.ok) throw new Error("Failed to toggle bookmark");

      const data = await res.json();

      // Update frontend
      setFeaturedPlaces((prev) =>
        prev
          .map((p, i) =>
            i === index ? { ...p, bookmarked: data.bookmarked } : p,
          )
          .filter((p) => p.bookmarked),
      );
    } catch (err) {
      console.error("Failed to toggle bookmark:", err);
    }
  };

  if (!user) return <p>Please log in to see your bookmarked properties.</p>;
  if (loading) return <p>Loading bookmarked properties...</p>;
  if (featuredPlaces.length === 0)
    return <p>No bookmarked properties found.</p>;

  return (
    <div>
      <h2 className="font-medium text-2xl mb-4">Saved Properties</h2>

      <div style={{ position: "relative" }}>
        <PropertyCard places={featuredPlaces} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            paddingTop: "10px",
          }}
        >
          {featuredPlaces.map((place, index) => (
            <div
              key={index}
              style={{ position: "relative", pointerEvents: "auto" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                  background: "#fff",
                  borderRadius: "50%",
                  padding: "6px",
                }}
                onClick={() => toggleBookmark(index)}
              >
                {place.bookmarked ? (
                  <BsBookmarkFill color="#007BFF" size={18} />
                ) : (
                  <BsBookmark color="#A1A8B0" size={18} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Saved;
