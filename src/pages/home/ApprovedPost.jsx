import { useEffect, useState, useContext, useMemo } from "react";
import PropertyCard from "../../Components/PropertyCard";
import { AuthContext } from "../../context/AuthContext";

function ApprovedPosts({
  selectedType,
  searchQuery,
  selectedDivision,
  selectedDistrict,
  selectedUpazila,
}) {
  const { user } = useContext(AuthContext);

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://yessghor-server.vercel.app";

  /* ============================
     Fetch Approved Posts
  ============================ */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        //  Fetch approved posts
        const resPosts = await fetch(`${API_URL}/posts`);
        const postsData = await resPosts.json();

        //  Fetch bookmarks (if logged in)
        let bookmarkedIds = [];
        if (user?._id) {
          const resBookmarks = await fetch(
            `${API_URL}/users/${user._id}/bookmarks`
          );
          if (resBookmarks.ok) {
            const bookmarksData = await resBookmarks.json();
            bookmarkedIds = bookmarksData.map((p) => p._id);
          }
        }

        //  Normalize data
        const formattedData = postsData.map((post) => ({
          _id: post._id,
          title: post.title || "",
          division: post.division || "",
          district: post.district || "",
          upazila: post.upazila || "",
          houseNo: post.houseNo || "",
          date: post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : "",
          houseType: post.category?.toLowerCase() || "",
          image: post.images?.[0] || "/no-image.png",
          price: post.rent,
          bookmarked: bookmarkedIds.includes(post._id),
        }));

        setPlaces(formattedData);
      } catch (err) {
        console.error("Failed to fetch approved posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  /* ============================
     Toggle Bookmark
  ============================ */
  const toggleBookmark = async (postId) => {
    if (!user?._id) {
      alert("Please login first to bookmark");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/users/${user._id}/bookmark/${postId}`,
        { method: "PATCH" }
      );

      if (!res.ok) throw new Error("Bookmark toggle failed");

      const data = await res.json();

      setPlaces((prev) =>
        prev.map((p) =>
          p._id === postId ? { ...p, bookmarked: data.bookmarked } : p
        )
      );
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  /* ============================
     Filtering Logic (FIXED)
  ============================ */
  const filteredPlaces = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return places
      // House type filter
      .filter(
        (p) =>
          selectedType === "All" ||
          p.houseType === selectedType.toLowerCase()
      )
      // Location filters
      .filter(
        (p) =>
          (!selectedDivision || p.division === selectedDivision) &&
          (!selectedDistrict || p.district === selectedDistrict) &&
          (!selectedUpazila || p.upazila === selectedUpazila)
      )
      // Alphabetic search (SAFE)
      .filter((p) => {
        if (!q) return true;

        return (
          p.title.toLowerCase().includes(q) ||
          p.division.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q) ||
          p.upazila.toLowerCase().includes(q)
        );
      });
  }, [
    places,
    selectedType,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    searchQuery,
  ]);

  /* ============================
     UI
  ============================ */
  if (loading) {
    return (
      <p style={{ textAlign: "center", padding: "20px" }}>
        Loading approved posts...
      </p>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={styles.heading}>Approved Properties</h2>
      <p style={styles.subHeading}>
        Explore the latest approved listings filtered by your preferences.
      </p>

      {filteredPlaces.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px", color: "#555" }}>
          No properties found
        </p>
      ) : (
        <PropertyCard
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
    color: "#1b4965",
    marginBottom: "6px",
  },
  subHeading: {
    fontSize: "16px",
    color: "#073032",
    marginBottom: "20px",
  },
};
