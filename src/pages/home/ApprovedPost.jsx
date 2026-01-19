import { useEffect, useState, useContext } from "react";
import PropertyCard from "../../Components/PropertyCard";
import { AuthContext } from "../../context/AuthContext";

function ApprovedPosts() {
  const { user } = useContext(AuthContext);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://yessghor-server.vercel.app";

  // Fetch approved posts and user's bookmarks
  useEffect(() => {
    const fetchPosts = async () => {
      try {
<<<<<<< HEAD
        // 1️⃣ Fetch approved posts
        const resPosts = await fetch(`${API_URL}/posts`);
=======
        // Fetch approved posts
        const resPosts = await fetch("https://yessghor-server.vercel.app/posts");
>>>>>>> 2143951f930a6a6b636a0a4f5b953ff91a302e11
        const postsData = await resPosts.json();

        let bookmarkedIds = [];

        // 2️⃣ Fetch user's bookmarks if logged in
        if (user?._id) {
          const resBookmarks = await fetch(
<<<<<<< HEAD
            `${API_URL}/users/${user._id}/bookmarks`
=======
            `https://yessghor-server.vercel.app/users/${user._id}/bookmarks`
>>>>>>> 2143951f930a6a6b636a0a4f5b953ff91a302e11
          );
          if (resBookmarks.ok) {
            const bookmarksData = await resBookmarks.json();
            // Store only the post IDs
            bookmarkedIds = bookmarksData.map((post) => post._id);
          }
        }

        // 3️⃣ Format posts with bookmarked info
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
<<<<<<< HEAD
            ? `${post.images[0]}` // or include full URL if needed
=======
            ? `https://yessghor-server.vercel.app${post.images[0]}`
>>>>>>> 2143951f930a6a6b636a0a4f5b953ff91a302e11
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
<<<<<<< HEAD
        `${API_URL}/users/${user._id}/bookmark/${postId}`,
=======
        `https://yessghor-server.vercel.app/users/${user._id}/bookmark/${postId}`,
>>>>>>> 2143951f930a6a6b636a0a4f5b953ff91a302e11
        { method: "PATCH" }
      );

      if (!res.ok) throw new Error("Failed to toggle bookmark");

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

      <PropertyCard places={places} onToggleBookmark={toggleBookmark} />
    </div>
  );
}

export default ApprovedPosts;
