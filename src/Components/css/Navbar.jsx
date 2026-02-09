import React, { useRef, useState, useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LanguageSwitch from "../../LanguageSwitch";
import useLanguage from "../../hooks/useLanguage";

const Navbar = ({ searchQuery = "", setSearchQuery }) => {
  const { user, logOut } = useAuth();
  const { language } = useLanguage();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // ================= LOGOUT =================
  const handleLogout = () => {
    logOut();
    localStorage.removeItem("userInfoCompleted");
    setShowProfileModal(false);
    navigate("/login");
  };

  // ================= ADD POST =================
  const handleAddProperty = () => {
    const completed = localStorage.getItem("userInfoCompleted");
    completed ? navigate("/post") : navigate("/user_information");
  };

  // ================= DASHBOARD =================
  const handleDashboard = () => {
    if (!user) return;
    user.role === "admin"
      ? navigate("/admin/dashboard")
      : navigate("/dashboard");
    setShowProfileModal(false);
  };

  // ================= CLICK OUTSIDE =================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowProfileModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ================= DEBOUNCE SEARCH =================
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery?.(localQuery.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [localQuery, setSearchQuery]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3">

        {/* TOP ROW */}
        <div className="flex justify-between items-center gap-4">

          {/* LOGO */}
          <img
            src="https://res.cloudinary.com/dycxc9esi/image/upload/v1769323430/bharaghor_01_iecfzr.png"
            alt="logo"
            className="h-10 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* RIGHT SIDE */}
          <div className="flex flex-wrap items-center gap-3 justify-end">

            {/* AUTH */}
            {user ? (
              <>
                {/* ADD POST */}
                <button
                  onClick={handleAddProperty}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-white bg-[#1b4965] hover:bg-[#073032]"
                >
                  <FaPlus size={14} />
                  {language === "en" ? "Add Post"  : "পোস্ট যুক্ত করুন"}
                </button>

                {/* LANGUAGE */}
                <LanguageSwitch />

                {/* LOGOUT */}
                <LuLogOut
                  size={20}
                  onClick={handleLogout}
                  className="cursor-pointer text-[#073032] hover:text-[#1b4965]"
                  title="Logout"
                />

                {/* PROFILE */}
                <div ref={modalRef} className="relative">
                  <img
                    src={user.profileImage || "/images/Ellipse 116.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer ring-2 ring-[#E3D0B3]"
                    onClick={() => setShowProfileModal((p) => !p)}
                  />

                  {showProfileModal && (
                    <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border border-[#E3D0B3]">
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
                <Link
                  to="/login"
                  className="text-sm border px-4 py-2 rounded-lg
 font-medium bg-[#073032] text-white hover:text-[#ecf0f3]"
                >
                  {language === "en" ?"Login"   : "লগইন"}
                </Link>
              </>
            )}
          </div>
        </div>

        {/* SEARCH ROW */}
        <div className="mt-3 sm:mt-0  sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-auto">
          <input
            type="text"
            placeholder={
              language === "en"
                ? "Search properties..."
                : "প্রোপার্টি খুঁজুন..."
            }
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="w-full sm:w-64 h-9 px-3 rounded-lg border border-[#1b4965] text-sm outline-none focus:ring-2 focus:ring-[#1b4965]/40"
          />
        </div>
      </div>
    </nav>
  );
};

/* ================= MENU ITEM ================= */
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
