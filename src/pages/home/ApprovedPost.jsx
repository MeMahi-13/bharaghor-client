import { useEffect, useState, useContext } from "react";
import PropertyCard from "../../Components/PropertyCard";
import HouseCategory from "../../Components/HouseCategory";
import { AuthContext } from "../../context/AuthContext";

function ApprovedPosts() {
  const { user } = useContext(AuthContext);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resPosts = await fetch("https://yessghor-server.vercel.app/posts");
        const postsData = await resPosts.json();

        let bookmarkedIds = [];
        if (user?._id) {
          const resBookmarks = await fetch(
            `https://yessghor-server.vercel.app/users/${user._id}/bookmarks`
          );
          if (resBookmarks.ok) {
            const bookmarksData = await resBookmarks.json();
            bookmarkedIds = bookmarksData.map((post) => post._id);
          }
        }

        const formattedData = postsData.map((post) => ({
          _id: post._id,
          title: post.title,
          division: post.division || "",
          district: post.district || "",
          upazila: post.upazila || "",
          location: post.location,
          houseNo: post.houseNo,
          date: post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : "",
          houseType: post.category || "",
          image: post.images?.length
            ? `https://yessghor-server.vercel.app${post.images[0]}`
            : "/no-image.png",
          price: post.rent,
          bookmarked: bookmarkedIds.includes(post._id),
        }));

        setPlaces(formattedData);
      } catch (err) {
        console.error("Failed to fetch posts or bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  // Toggle bookmark
  const toggleBookmark = async (postId, index) => {
    if (!user?._id) return alert("Please login first to bookmark");

    try {
      const res = await fetch(
        `https://yessghor-server.vercel.app/users/${user._id}/bookmark/${postId}`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("Failed to toggle bookmark");
      const data = await res.json();

      setPlaces((prev) => {
        const updated = [...prev];
        updated[index].bookmarked = data.bookmarked;
        return updated;
      });
    } catch (err) {
      console.error("Bookmark toggle error:", err);
    }
  };

  if (loading) return <p>Loading approved posts...</p>;

  //  Filter places according to selected category
  const filteredPlaces =
    selectedType === "All"
      ? places
      : places.filter(
          (place) =>
            place.houseType?.toLowerCase() === selectedType.toLowerCase()
        );

  return (
    <div className="px-6">
      

      {/* Category Filter */}
      <HouseCategory 
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      {/* Property Cards */}
      <h2>Featured Place</h2>
      <PropertyCard
        places={filteredPlaces}
        onToggleBookmark={toggleBookmark}
      />
    </div>
  );
}

export default ApprovedPosts;
