// src/pages/admin/post/AdminPendingPosts.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminPendingPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all pending posts
  useEffect(() => {
    fetch("https://yessghor-server.vercel.app/admin/posts/pending")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pending posts:", err);
        setLoading(false);
      });
  }, []);

  // Approve / Reject post
  const updatePost = async (postId, action) => {
    await fetch(
      `https://yessghor-server.vercel.app/admin/posts/${postId}/${action}`,
      {
        method: "PATCH",
      }
    );
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  if (loading)
    return (
      <p className="p-6 text-gray-600 text-center text-lg">
        Loading pending posts...
      </p>
    );
  if (posts.length === 0)
    return (
      <p className="p-6 text-gray-600 text-center text-lg">
        No pending posts.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Pending Posts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            {/* Post Image */}
            {post.images?.[0] && (
              <Link to={`/details/${post._id}`}>
                <img
                  src={post.images[0]}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              </Link>
            )}

            {/* Post Info */}
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">Category:</span> {post.category}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Location:</span> {post.location}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Rent:</span> TK {post.rent}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">House No:</span> {post.houseNo}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">User ID:</span> {post.userId}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Created At:</span>{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => updatePost(post._id, "approve")}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Approve
              </button>
              <button
                onClick={() => updatePost(post._id, "reject")}
                className="flex-1 px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-700 transition"
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
