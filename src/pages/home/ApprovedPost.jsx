import { useEffect, useState, useContext } from "react";
import PropertyCard from "../../Components/PropertyCard";
import { AuthContext } from "../../context/AuthContext";

function ApprovedPosts() {
  const { user } = useContext(AuthContext); // logged-in user
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch approved posts and user's bookmarks
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch approved posts
        const resPosts = await fetch("https://yessghor-server.vercel.app/posts");
        const postsData = await resPosts.json();

        let bookmarkedIds = [];

        // Fetch user's bookmarks if logged in
        if (user) {
          const resBookmarks = await fetch(
            `https://yessghor-server.vercel.app/users/${user._id}/bookmarks`
          );
          const bookmarks = await resBookmarks.json();
          bookmarkedIds = bookmarks.map((post) => post._id);
        }

        // Format posts
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
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch posts or bookmarks:", err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  // Toggle bookmark
  const toggleBookmark = async (postId, index) => {
    if (!user) return alert("Please login first to bookmark");

    try {
      const res = await fetch(
        `https://yessghor-server.vercel.app/users/${user._id}/bookmark/${postId}`,
        { method: "PATCH" }
      );
      const data = await res.json();

      // Update local state
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

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Available Properties</h2>

      <PropertyCard
        places={places}
        onToggleBookmark={toggleBookmark}
      />
    </div>
  );
}

export default ApprovedPosts;
