import React, { useRef, useState, useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LanguageSwitch from "../../LanguageSwitch";
import { useLanguage } from "../../context/LanguageContext"; // import language context

const Navbar = ({ searchQuery = "", setSearchQuery }) => {
  const { user, logOut } = useAuth();
  const { language } = useLanguage(); // get language
  const [showProfileModal, setShowProfileModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Logout
  const handleLogout = async () => {
    await logOut();
    setShowProfileModal(false);
    localStorage.removeItem("userInfoCompleted");
    navigate("/login");
  };

  // Add Property
  const handleAddProperty = () => {
    const completed = localStorage.getItem("userInfoCompleted");
    completed ? navigate("/post") : navigate("/user_information");
  };

  // Dashboard navigation
  const handleDashboard = () => {
    if (!user) return;
    user.role === "admin"
      ? navigate("/admin/dashboard")
      : navigate("/dashboard");
    setShowProfileModal(false);
  };

  // Close profile modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowProfileModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/dycxc9esi/image/upload/v1769323430/bharaghor_01_iecfzr.png"
            alt="logo"
            className="h-10 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder={
              language === "en"
                ? "Search properties..."
                : "প্রোপার্টি খুঁজুন..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery?.(e.target.value)}
            className="w-48 sm:w-32 md:w-48 h-9 px-3 rounded-lg border border-[#1b4965] text-sm outline-none focus:ring-2 focus:ring-[#1b4965]/40"
          />

          {user ? (
            <>
              {/* Add Property */}
              <button
                onClick={handleAddProperty}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-white bg-[#1b4965] hover:bg-[#073032] transition"
              >
                <FaPlus size={14} />
                {language === "en" ? "Add Post" : "পোস্ট যুক্ত করুন"}
              </button>

              {/* Language Dropdown */}
              <LanguageSwitch />

              {/* Logout Icon */}
              <LuLogOut
                size={20}
                onClick={handleLogout}
                className="cursor-pointer text-[#073032] hover:text-[#1b4965] transition"
              />

              {/* Profile */}
              <div ref={modalRef} className="relative">
                <img
                  src={user.profileImage || "/images/Ellipse 116.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer ring-2 ring-[#E3D0B3]"
                  onClick={() => setShowProfileModal(!showProfileModal)}
                />
                {showProfileModal && (
                  <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border border-[#E3D0B3] overflow-hidden">
                    <MenuItem onClick={() => navigate("/dashboard/profile")}>
                      {language === "en" ? "My Profile" : "প্রোফাইল"}
                    </MenuItem>
                    <MenuItem onClick={handleDashboard}>
                      {language === "en" ? "Dashboard" : "ড্যাশবোর্ড"}
                    </MenuItem>
                    <MenuItem onClick={handleLogout} danger>
                      {language === "en" ? "Logout" : "লগ আউট"}
                    </MenuItem>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <LanguageSwitch />
              <a
                href="/login"
                className="text-sm font-medium text-[#073032] hover:text-[#1b4965]"
              >
                {language === "en" ? "Login" : "লগইন"}
              </a>
              <a
                href="/register"
                className="text-sm font-medium text-[#1b4965]"
              >
                {language === "en" ? "Sign Up" : "সাইন আপ"}
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
    className={`px-4 py-2 text-sm cursor-pointer transition ${
      danger
        ? "text-red-600 hover:bg-red-50"
        : "text-[#073032] hover:bg-[#E3D0B3]/40"
    }`}
  >
    {children}
  </p>
);

export default Navbar;
