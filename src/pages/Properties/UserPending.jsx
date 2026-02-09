import React, { useEffect, useState } from "react";
import PropertyCard from "../../Components/PropertyCard";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

export default function UserPending() {
  const { user } = useAuth();
  const [pendingPosts, setPendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal state
  const [editPost, setEditPost] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch pending posts
  useEffect(() => {
    if (!user?._id) return;

    setLoading(true);
    fetch(`https://yessghor-server.vercel.app/users/${user._id}/posts/pending`,{
      credentials:"include"
    })
      .then((res) => res.json())
      .then((data) => {
        const mappedPosts = data.map((post) => ({
          _id: typeof post._id === "object" ? post._id.$oid : post._id,
          image: post.images?.[0] || "/placeholder.png",
          title: post.title || "",
          location: post.location || "",
          houseNo: post.houseNo || "",
          date: new Date(post.createdAt).toLocaleDateString(),
          houseType: post.category || "",
          price: post.rent || "",
          description: post.description || "",
          division: post.division || "",
          district: post.district || "",
          upazila: post.upazila || "",
        }));
        setPendingPosts(mappedPosts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch pending posts:", err);
        setLoading(false);
      });
  }, [user]);

  // Open modal
  const handleEditClick = (post) => {
    setEditPost(post);
    setFormData({
      title: post.title || "",
      location: post.location || "",
      division: post.division || "",
      district: post.district || "",
      upazila: post.upazila || "",
      houseType: post.houseType || "",
      price: post.price || "",
      description: post.description || "",
    });
  };

  // handle form change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // submit updated post
const handleUpdatePost = async () => {
  if (!editPost?._id) return;

  try {
    const payload = {
      userId: user._id, 
      title: formData.title,
      division: formData.division,
      district: formData.district || editPost.district,
      upazila: formData.upazila || editPost.upazila,
      location: formData.location,
      category: formData.houseType,
      rent: Number(formData.price),
      description: formData.description,
    };

    const res = await fetch(
      `https://yessghor-server.vercel.app/posts/${editPost._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Update failed");

    Swal.fire({
      icon: "success",
      title: "Post Updated",
      text: "Your post has been updated successfully.",
      confirmButtonColor: "#1b4965",
    });

    setPendingPosts((prev) =>
      prev.map((p) =>
        p._id === editPost._id ? { ...p, ...formData } : p
      )
    );

    setEditPost(null);
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Update failed",
      text: err.message,
      confirmButtonColor: "#1b4965",
    });
  }
};


  if (loading) return <p className="p-6">Loading posts...</p>;
  if (!pendingPosts.length) return <p className="p-6">You have no pending posts.</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2 className="font-semibold text-2xl py-5">Your Pending Properties</h2>

      <PropertyCard
        places={pendingPosts.map((post) => ({
          ...post,
          onEdit: () => handleEditClick(post),
        }))}
        showEdit
      />

      {/* Edit Modal */}
      {editPost && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2 style={{ marginBottom: "15px" }}>Edit Property</h2>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              style={modalStyles.input}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              style={modalStyles.input}
            />
            <input
              type="text"
              name="division"
              placeholder="Division"
              value={formData.division}
              onChange={handleChange}
              style={modalStyles.input}
            />
            <input
              type="text"
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
              style={modalStyles.input}
            />
            <input
              type="text"
              name="upazila"
              placeholder="Upazila"
              value={formData.upazila}
              onChange={handleChange}
              style={modalStyles.input}
            />
            <input
              type="text"
              name="houseType"
              placeholder="Category"
              value={formData.houseType}
              onChange={handleChange}
              style={modalStyles.input}
            />
            <input
              type="number"
              name="price"
              placeholder="Rent"
              value={formData.price}
              onChange={handleChange}
              style={modalStyles.input}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              style={{ ...modalStyles.input, height: "80px" }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                style={modalStyles.cancelBtn}
                onClick={() => setEditPost(null)}
              >
                Cancel
              </button>
              <button
                style={modalStyles.saveBtn}
                onClick={handleUpdatePost}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple inline styles for modal
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "400px",
    maxWidth: "90%",
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  cancelBtn: {
    background: "#ccc",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  saveBtn: {
    background: "#1b4965",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
