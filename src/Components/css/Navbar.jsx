import React, { useRef, useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaPlus } from "react-icons/fa6";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowProfileModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logOut();
    setShowProfileModal(false);
    localStorage.removeItem("userInfoCompleted");
    navigate("/login");
  };

  const handleAddProperty = () => {
    const userInfoCompleted = localStorage.getItem("userInfoCompleted");
    if (!userInfoCompleted) {
      navigate("/user_information");
    } else {
      navigate("/post");
    }
  };

// role based dashboard
  const handleDashboard = () => {
    if (!user) return;
console.log(user)
    if (user.role === "admin") {
      navigate("/admin/dashboard"); 
    } else {
      navigate("/dashboard");
    }
    setShowProfileModal(false);
  };

  return (
    <div className="fixed z-99" style={styles.container}>
      {/* Left */}
      <div className="flex gap-2 items-center">
        <img className="h-8 w-10" src="src\\assets\\logo bharaghor.png" alt="" />
        <img className="h-5 w-20" src="src\\assets\\name.png" alt="" />
      </div>

      {/* Right */}
      <div className="flex gap-4 items-center">
        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <a href="/login">Login</a>
            <a href="/register">Sign Up</a>
          </>
        )}

        {/* LOGGED IN */}
        {user && (
          <>
            <button className="primary-btn flex items-center gap-2" onClick={handleAddProperty}>
              <FaPlus />Add Property
            </button>
            <LuLogOut size={22} style={{ cursor: "pointer" }} onClick={handleLogout} />

            <div
              ref={modalRef}
              style={{
                position: "relative",
                height: "40px",
                width: "40px",
              }}
            >
              <img
                className="rounded-full"
                src={user.photoURL || "/images/Ellipse 116.png"}
                alt="Profile"
                style={styles.avatar}
                onClick={() => setShowProfileModal(!showProfileModal)}
              />

              {showProfileModal && (
                <div style={styles.profileModal}>
                  <p style={styles.modalItem} onClick={() => navigate("dashboard/profile")}>
                    My Profile
                  </p>
                  <p style={styles.modalItem} onClick={handleDashboard}>
                    Dashboard
                  </p>
                  <p style={styles.modalItem} onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const styles = {
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 24px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    marginBottom: "4px",
  },
  input: { width: "100%", padding: "8px", margin: "8px 0" },
  button: { width: "100%", padding: "8px" },
  link: { color: "blue", cursor: "pointer" },
  profileModal: {
    position: "absolute",
    top: "50px",
    right: 0,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    minWidth: "150px",
    zIndex: 100,
  },
  modalItem: {
    padding: "10px 15px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
};
