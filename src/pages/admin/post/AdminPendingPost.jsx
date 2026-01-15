// src/pages/admin/post/AdminPendingPosts.jsx
import React, { useEffect, useState } from "react";

// working
function AdminPendingPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all pending posts
  useEffect(() => {
  fetch("http://localhost:5000/admin/posts/pending")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching pending posts:", err);
        setLoading(false);
      });
  }, []);

  // Approve / Reject post
  const updatePost = async (postId, action) => {
    await fetch(`http://localhost:5000/admin/posts/${postId}/${action}`, {
      method: "PATCH",
    });

    setPosts(prev => prev.filter(p => p._id !== postId));
  };

  if (loading) return <p className="p-6">Loading pending posts...</p>;
  if (posts.length === 0) return <p className="p-6">No pending posts.</p>;

  return (
    <div className="max-w-7xl mx-auto py-20 p-6">
      <h2 className="text-2xl font-bold mb-6 ">All Pending Posts</h2>
      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post._id} className="border p-4 rounded-lg bg-gray-50">
            <p><b>Title:</b> {post.title}</p>
            {/* <p><b>User:</b> {post.user?.name} ({post.user?.email})</p> */}
            <p><b>Category:</b> {post.category}</p>
            <p><b>Location:</b> {post.location}</p>
              <p><b>Rent:</b> {post.rent}</p>
              <p><b>House No:</b> {post.houseNo}</p>
              <p><b>House No:</b> {post.houseNo}</p>
              <p><b>House No:</b> {post.houseNo}</p>
              <p><b>House No:</b> {post.houseNo}</p>
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

export default AdminPendingPosts;
