import React, { useRef, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaPlus } from "react-icons/fa6";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const { user, logOut } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    setShowProfileModal(false);
    localStorage.removeItem("userInfoCompleted");
    navigate("/login");
  };

  const handleAddProperty = () => {
    const completed = localStorage.getItem("userInfoCompleted");
    completed ? navigate("/post") : navigate("/user_information");
  };

  const handleDashboard = () => {
    if (!user) return;
    user.role === "admin"
      ? navigate("/admin/dashboard")
      : navigate("/dashboard");
    setShowProfileModal(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="src/assets/logo bharaghor.png"
            alt="logo"
            className="h-8"
          />
          <img src="src/assets/name.png" alt="name" className="h-5" />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Search */}
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 h-9 px-3 rounded-lg border
                  border-[#217c82] text-sm outline-none
                  focus:ring-2 focus:ring-[#217c82]/40"
              />

              {/* Add Property */}
              <button
                onClick={handleAddProperty}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold
                  rounded-lg text-white bg-[#217c82]
                  hover:bg-[#073032] transition"
              >
                <FaPlus size={14} />
                Add Property
              </button>

              {/* Logout Icon */}
              <LuLogOut
                size={20}
                onClick={handleLogout}
                className="cursor-pointer text-[#073032] hover:text-[#217c82] transition"
              />

              {/* Profile */}
              <div ref={modalRef} className="relative">
                <img
                  src={user.photoURL || "/images/Ellipse 116.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer
                    ring-2 ring-[#E3D0B3]"
                  onClick={() => setShowProfileModal(!showProfileModal)}
                />

                {showProfileModal && (
                  <div
                    className="absolute right-0 mt-3 w-44 bg-white
                      rounded-xl shadow-lg border border-[#E3D0B3] overflow-hidden"
                  >
                    <MenuItem onClick={() => navigate("dashboard/profile")}>
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={handleDashboard}>
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={handleLogout} danger>
                      Logout
                    </MenuItem>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-sm font-medium text-[#073032] hover:text-[#217c82]"
              >
                Login
              </a>
              <a
                href="/register"
                className="text-sm font-medium text-[#217c82]"
              >
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

/* Dropdown Item */
const MenuItem = ({ children, onClick, danger }) => (
  <p
    onClick={onClick}
    className={`px-4 py-2 text-sm cursor-pointer transition
      ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-[#073032] hover:bg-[#E3D0B3]/40"
      }`}
  >
    {children}
  </p>
);

export default Navbar;
