import { useEffect, useState, useContext } from "react";
import PropertyCard from "../../Components/PropertyCard";
import { AuthContext } from "../../context/AuthContext";

function ApprovedPosts({ selectedType, searchQuery, selectedDivision, selectedDistrict, selectedUpazila }) {
  const { user } = useContext(AuthContext);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://yessghor-server.vercel.app";

  // Fetch approved posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resPosts = await fetch(`${API_URL}/posts`);
        const postsData = await resPosts.json();

        let bookmarkedIds = [];
        if (user?._id) {
          const resBookmarks = await fetch(`${API_URL}/users/${user._id}/bookmarks`);
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
          date: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "",
          houseType: post.category || "",
          image: post.images?.length ? post.images[0] : "/no-image.png",
          price: post.rent,
          bookmarked: bookmarkedIds.includes(post._id),
        }));

        setPlaces(formattedData);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  // Bookmark toggle
  const toggleBookmark = async (postId) => {
    if (!user?._id) return alert("Please login first to bookmark");

    try {
      const res = await fetch(`${API_URL}/users/${user._id}/bookmark/${postId}`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to toggle bookmark");

      const data = await res.json();

      setPlaces((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, bookmarked: data.bookmarked } : p
        )
      );
    } catch (err) {
      console.error("Bookmark toggle error:", err);
    }
  };

  // Filtered posts
  const filteredPlaces = places
    .filter((p) => selectedType === "All" || p.houseType === selectedType)
    .filter(
      (p) =>
        (!selectedDivision || p.division === selectedDivision) &&
        (!selectedDistrict || p.district === selectedDistrict) &&
        (!selectedUpazila || p.upazila === selectedUpazila)
    )
    .filter(
      (p) =>
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) return <p style={{ textAlign: "center", padding: "20px" }}>Loading approved posts...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* Heading */}
      <h2 style={styles.heading}>Approved Properties</h2>
      <p style={styles.subHeading}>
        Explore the latest approved listings filtered by your preferences.
      </p>

      {/* Property Cards */}
      {filteredPlaces.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px", color: "#555" }}>
          No properties found
        </p>
      ) : (
        <PropertyCard
          className="flex"
          places={filteredPlaces}
          onToggleBookmark={toggleBookmark}
        />
      )}
    </div>
  );
}

export default ApprovedPosts;

const styles = {
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#217c82",
    marginBottom: "6px",
  },
  subHeading: {
    fontSize: "16px",
    color: "#073032",
    marginBottom: "20px",
  },
};
