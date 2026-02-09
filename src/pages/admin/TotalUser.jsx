import React, { useEffect, useState } from "react";
import { MdBlock } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";

const TotalUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "https://yessghor-server.vercel.app";

  // ================= FETCH USERS =================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/users`, {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setUsers(data);
          setFilteredUsers(data);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ================= FILTER =================
  useEffect(() => {
    if (!statusFilter) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.status &&
            user.status.toUpperCase() === statusFilter.toUpperCase()
        )
      );
    }
  }, [statusFilter, users]);

  // ================= BAN USER =================
  const handleBanUser = async (id) => {
    try {
      const res = await fetch(`${API_URL}/admin/ban-user/${id}`, {
        method: "PATCH",
        credentials: "include",
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, status: "BANNED" } : u
          )
        );
      }
    } catch (err) {
      console.error("Ban failed:", err);
    }
  };

  // ================= STATUS STYLE =================
  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case "VERIFIED":
        return "bg-green-100 text-green-600";
      case "BANNED":
        return "bg-red-100 text-red-600";
      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  return (
    <div className="mt-8">

      {/* ================= FILTER SECTION ================= */}
      <div className="px-4 py-4 bg-white flex flex-wrap items-center gap-3 rounded-xl border-2 border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <CiFilter className="text-xl text-[#6A7282]" />
          <p className="font-medium text-lg text-[#101828]">Filters:</p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border-2 border-[#D1D5DC] rounded-xl px-4 py-2 text-sm focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="VERIFIED">Verified</option>
          <option value="BANNED">Banned</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      {/* ================= TABLE HEADER ================= */}
      <div className="hidden md:flex bg-gray-50 p-4 font-medium text-[#101828] text-sm uppercase mt-4">
        <div className="flex-1">User Info</div>
        <div className="flex-1 text-center">Properties</div>
        <div className="flex-1 text-center">Status</div>
        <div className="flex-1 text-right">Join Date</div>
        <div className="flex-1 text-right">Actions</div>
      </div>

      {/* ================= CONTENT ================= */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading users...
        </div>
      ) : filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div
            key={user._id}
            className="flex flex-col md:flex-row md:items-center p-4 bg-white hover:bg-gray-50 border-b"
          >
            {/* USER INFO */}
            <div className="flex-1 flex items-center gap-3">
              <img
                src={user.profileImage || "/images/default-avatar.png"}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* PROPERTIES */}
            <div className="flex-1 text-center mt-2 md:mt-0">
              {user.properties || 0}
            </div>

            {/* STATUS */}
            <div className="flex-1 text-center mt-2 md:mt-0">
              <span
                className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(
                  user.status
                )}`}
              >
                {user.status || "PENDING"}
              </span>
            </div>

            {/* JOIN DATE */}
            <div className="flex-1 text-right text-sm text-gray-600 mt-2 md:mt-0">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })
                : "—"}
            </div>

            {/* ACTION */}
            <div className="flex-1 flex justify-end mt-3 md:mt-0">
              {user.status !== "BANNED" && (
                <button
                  onClick={() => handleBanUser(user._id)}
                  className="flex items-center gap-1 px-3 py-2 bg-[#101828] text-white rounded-lg text-sm hover:opacity-90 transition"
                >
                  <MdBlock />
                  Ban
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[#D82222]">
            <RxCross1 className="text-[#D82222] text-xl" />
          </div>
          <p className="mt-4 text-center text-gray-500">
            No users found matching your filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default TotalUser;
