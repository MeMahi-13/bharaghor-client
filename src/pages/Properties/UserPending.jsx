// UserPending.jsx
import React, { useEffect, useState } from "react";
import PropertyCard from "../../Components/PropertyCard";
import useAuth from "../../hooks/useAuth"; 

export default function UserPending() {
  const { user } = useAuth();
  const [pendingPosts, setPendingPosts] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    fetch(`https://yessghor-server.vercel.app/users/${user._id}/posts/pending`)
      .then((res) => res.json())
      .then((data) => {
        const mappedPosts = data.map((post) => ({
          _id: post._id,
          image: post.images?.[0] || "/placeholder.png",
          title: post.title,
          location: `${post.division}, ${post.district}, ${post.upazila}`,
          houseNo: post.houseNo,
          date: new Date(post.createdAt).toLocaleDateString(),
          houseType: post.category,
          price: post.rent,
        }));
        setPendingPosts(mappedPosts);
      })
      .catch((err) => console.error("Failed to fetch pending posts:", err));
  }, [user]);

  return (
    <div style={{ padding: "30px" }}>
      <h2 className="font-semibold text-2xl py-5">Your Pending Properties</h2>
      {pendingPosts.length ? (
        <PropertyCard places={pendingPosts} />
      ) : (
        <p>You have no pending posts.</p>
      )}
    </div>
  );
}
