import { useState, useEffect } from "react";

const API_URL = "https://yessghor-server.vercel.app";

export const usePosts = (user) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resPosts = await fetch(`${API_URL}/posts`);
        const postsData = await resPosts.json();

        let bookmarkedIds = [];
        if (user?._id) {
          const resBookmarks = await fetch(
            `${API_URL}/users/${user._id}/bookmarks`
          );
          if (resBookmarks.ok) {
            bookmarkedIds = (await resBookmarks.json()).map((p) => p._id);
          }
        }

        const formatted = postsData.map((p) => ({
          _id: p._id,
          title: p.title,
          division: p.division || "",
          district: p.district || "",
          upazila: p.upazila || "",
          location: p.location,
          houseNo: p.houseNo,
          date: p.createdAt
            ? new Date(p.createdAt).toLocaleDateString()
            : "",
          houseType: p.category || "",
          image: p.images?.[0] || "/no-image.png",
          price: p.rent,
          bookmarked: bookmarkedIds.includes(p._id),
        }));

        setPlaces(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const toggleBookmark = async (postId) => {
    if (!user?._id) return alert("Login to bookmark");

    const res = await fetch(
      `${API_URL}/users/${user._id}/bookmark/${postId}`,
      { method: "PATCH" }
    );

    const data = await res.json();

    setPlaces((prev) =>
      prev.map((p) =>
        p._id === postId ? { ...p, bookmarked: data.bookmarked } : p
      )
    );
  };

  return { places, loading, toggleBookmark };
};
