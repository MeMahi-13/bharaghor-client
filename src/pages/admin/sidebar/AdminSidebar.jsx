// @flow strict
import * as React from 'react';
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import './Sidebar.css'
import useAuth from "../../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";
import { FiHome } from "react-icons/fi";
import { BsBuildings } from "react-icons/bs";
import { PiNotepadLight } from "react-icons/pi";
import { BsBookmark } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
function AdminSidebar() {
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
    <div>
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/assets/logo.svg" alt="Logo" className="logo" />

        </div>

        {user ? (
          <>
            <div className="sidebar-content sidebar">
              <div className="user-info ">
              
                <p className=" text-center user-name">{user.name}</p>
                  <p className="user-email text-center">{user._id}</p>
                <p className=" text-center user-email">{user.email}</p>
              </div>

              <nav className="menu ">
                <a href="/admin/dashboard" className="menu-item">
                  <span className="icon"><FiHome /></span>
                  Dashboard
                </a>

                <a href="/admin/posts/pending" className="menu-item">
                  <span className="icon"><BsBuildings /></span>
                  Pending Properties
                </a>
                <a href="/admin/dashboard/manage-users" className="menu-item">
                  <span className="icon"><LuUsers /></span>
                  User Management
                </a>
                <a href="/admin/revenue" className="menu-item">
                  <span className="icon"><BsBuildings /></span>
                  Revenue
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
    </div>
  );
};

export default AdminSidebar;