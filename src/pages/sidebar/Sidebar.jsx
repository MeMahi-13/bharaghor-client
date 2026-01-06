import React, { useState } from 'react'
import './Sidebar.css'
import  '../dashboard/dashboard';
const Sidebar = () => {
  const [uiOpen, setUiOpen] = useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/assets/logo.svg" alt="Logo" className="logo" />
      </div>

      <div className="sidebar-content">
        <div className="user-info">
          <p className="user-name">Clyde Miles</p>
          <p className="user-email">clydemiles@elenor.us</p>
        </div>

        <nav className="menu">
          <a href="/dashboard" className="menu-item">
            <span className="icon">🏠</span>
            Dashboard
          </a>

          <a href="/forms" className="menu-item">
            <span className="icon">📋</span>
            Propeties
          </a>

          <div
            className="menu-item has-submenu"
            onClick={() => setUiOpen(!uiOpen)}
          >
            <span className="icon">📦</span>
            Booking
            <span className={`arrow ${uiOpen ? "open" : ""}`}>›</span>
          </div>

          {uiOpen && (
            <div className="submenu">
              <a href="/buttons">Buttons</a>
              <a href="/typography">Typography</a>
            </div>
          )}

          <a href="/tables" className="menu-item">
            <span className="icon">📊</span>
            Saved
          </a>

          <a href="/charts" className="menu-item">
            <span className="icon">📈</span>
            Manage Profile
          </a>
        </nav>

        <div className="sidebar-footer">
          <a href="/settings">Settings</a>
          <span>|</span>
          <a href="/logout">Logout</a>
        </div>
      </div>
    </aside>


  )
}

export default Sidebar