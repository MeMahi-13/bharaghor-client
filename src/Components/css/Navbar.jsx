import React, { useState,useRef, useEffect } from 'react';
import { AiFillAppstore } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { LuLogOut } from "react-icons/lu";
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [showProfileModal, setShowProfileModal] = useState(false);
     const navigate = useNavigate();

  const modalRef = useRef(null);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowProfileModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
    return (
        <div style={styles.container}>
            <div className='flex gap-5 items-center'>
                <AiFillAppstore size={24} />
           <h1> Logo</h1>
            </div>
            <div className='flex gap-2'>
              {!isLoggedIn && (
        <div className="flex gap-5 items-center">
          <a className="border-none px-2 py-1 rounded-xl" href="/login">Login</a>
          <a className="border-none px-2 py-1 rounded-xl" href="/register">Sign Up</a>
        </div>
      )}
      
      {isLoggedIn && (
        <LuLogOut
          size={24}
          style={{ cursor: "pointer" }}
          onClick={() => setIsLoggedIn(false)}
        />
      )}

           {/* Right: Profile */}
      <div className='flex items-center relative'>
        <div ref={modalRef} style={{ position: "relative" }}>
          {/* Profile Picture */}
          <img
            src="/images/Ellipse 116.png" // put your image in public/images
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => setShowProfileModal(!showProfileModal)}
          />
          {/* Profile Modal */}
          {showProfileModal && (
            <div style={styles.profileModal}>
              <p  style={styles.modalItem} onClick={() => navigate("/profile")} >My Profile</p>
              <p style={styles.modalItem} onClick={() => navigate("/sidebar")}>Dashboard</p>
              <p style={styles.modalItem}>Settings</p>
              <p style={styles.modalItem}>Logout</p>
            </div>
          )}
        </div>
      </div>
            
            </div>
            
        </div>
    );
};

export default Navbar;
const styles = {
  
  container: {  width: "100%",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",        // 🔥 fixes vertical alignment
    justifyContent: "space-between",
    padding: "14px 24px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)", 
  marginBottom:"4px", },
  input: { width: "100%", padding: "8px", margin: "8px 0" },
  button: { width: "100%", padding: "8px",  },
  link: { color: "blue", cursor: "pointer" },
   profileModal: {
    position: "absolute",
    top: "50px", // below the profile pic
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
