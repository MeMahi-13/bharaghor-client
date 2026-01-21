import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import './Sidebar.css'
import useAuth from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";
import { FiHome } from "react-icons/fi";
import { BsBuildings } from "react-icons/bs";
import { PiNotepadLight } from "react-icons/pi";
import { BsBookmark } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
const Sidebar = () => {
   const auth = useAuth(); 
  //  const user = auth?.user; 
   const navigate = useNavigate();
   const { user, logOut } = useAuth();
   
   console.log(user);
   //const [uiOpen, setUiOpen] = useState(false);
     const [showProfileModal, setShowProfileModal] = useState(false);

 const handleLogout = async () => {
    try {
      await logOut();
      setShowProfileModal(false);
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/assets/logo.svg" alt="Logo" className="logo" />
        
      </div>

      {user ? (
        <>
          <div className="sidebar-content sidebar">
        <div className="user-info ">
           {/* <p className="user-name">Name:{user.uid}</p> */}
          <p className=" text-center user-name">{user.name}</p>
          <p className=" text-center user-email">{user.email}</p>
        </div>

        <nav className="menu ">
          <a href="/dashboard" className="menu-item">
            <span className="icon"><FiHome /></span>
            Dashboard
          </a>

          <a href="/dashboard/properties" className="menu-item">
            <span className="icon"><BsBuildings /></span>
            Propeties
          </a>

          <a href="/dashboard/booking"
            className="menu-item"
            
          >
            <span className="icon"><PiNotepadLight /></span>
            Booking
       
          </a>
          <a href="/dashboard/Saved" className="menu-item">
            <span className="icon"><BsBookmark /></span>
            Saved
          </a>

          <a href="/dashboard/profile" className="menu-item">
            <span className="icon"><LuUsers /></span>
            Manage Profile
          </a>
          <a href="/" className="menu-item">
            <span className="icon"><FaArrowLeft /></span>
            back to Homepage
          </a>
        </nav>

        <div className="sidebar-footer">
          <a href="/settings">Settings</a>
          <span>|</span>
          <a onClick={handleLogout} >Logout</a>
        </div>
      </div>
    
        </>
      ) : (
        <p className="user-name">Loading user...</p>
      )}
</aside>
 
    
  );
}

export default Sidebar;
