// src/pages/admin/post/PendingPostsByUser.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PendingPostsByUser() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://yessghor-server.vercel.app//admin/posts/pending/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching user posts:", err);
        setLoading(false);
      });
  }, [userId]);

  const updatePost = async (postId, action) => {
    await fetch(`https://yessghor-server.vercel.app/admin/posts/${postId}/${action}`, {
      method: "PATCH",
    });
    setPosts(prev => prev.filter(p => p._id !== postId));
  };

  if (loading) return <p className="p-6">Loading posts...</p>;
  if (posts.length === 0) return <p className="p-6">No pending posts for this user.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Posts for User</h2>
      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post._id} className="border p-4 rounded-lg bg-gray-50">
            <p><b>Title:</b> {post.title}</p>
            <p><b>Category:</b> {post.category}</p>
            <p><b>Location:</b> {post.location}</p>
             <p><b>Location:</b> {post.location}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => updatePost(post._id, "approve")}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updatePost(post._id, "reject")}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingPostsByUser;
