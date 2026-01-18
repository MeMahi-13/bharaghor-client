import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= Fetch users ================= */
  useEffect(() => {
    fetch("https://yessghor-server.vercel.app//admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load users", err);
        setLoading(false);
      });
  }, []);

  /* ================= Approve / Reject ================= */
  const updateStatus = async (id, action) => {
    await fetch(`https://yessghor-server.vercel.app//admin/users/${id}/${action}-nid`, {
      method: "PATCH",
    });

    setUsers((prev) =>
      prev.map((u) =>
        u._id === id
          ? { ...u, nidStatus: action === "approve" ? "approved" : "rejected" }
          : u
      )
    );
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* ================= Header ================= */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin – User Verification</h2>
      </div>

      {/* ================= Users ================= */}
      <div className="grid gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="border rounded-xl p-5 shadow-sm bg-white"
          >
            {/* User Info */}
            <div className="mb-4">
              <p>
                <b>Name:</b> {user.name}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Phone:</b> {user.phone}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    user.nidStatus === "approved"
                      ? "text-green-600"
                      : user.nidStatus === "rejected"
                      ? "text-red-600"
                      : "text-orange-500"
                  }
                >
                  {user.nidStatus || "not submitted"}
                </span>
              </p>
              {/* Button to view this user's pending posts */}
              <button
                onClick={() =>
                  navigate(`/admin/posts/pending/${user._id}`)
                }
                className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Pending Posts
              </button>
            </div>

            {/* NID Images */}
            {user.nidFront && user.nidBack && (
              <div className="flex gap-4 mb-4">
                <img
                  src={`https://yessghor-server.vercel.app/${user.nidFront}`}
                  alt="NID Front"
                  className="w-40 h-28 object-cover border rounded"
                />
                <img
                  src={`https://yessghor-server.vercel.app/${user.nidBack}`}
                  alt="NID Back"
                  className="w-40 h-28 object-cover border rounded"
                />
              </div>
            )}

            {/* Actions */}
            {user.nidStatus === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(user._id, "approve")}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(user._id, "reject")}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;
