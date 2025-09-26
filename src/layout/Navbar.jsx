import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="header-container">
        <NavLink to="/" className="logo">
          🍣 MizuBox
        </NavLink>

        <nav className="nav-menu">
          <NavLink
            to="/menu"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Menu
          </NavLink>
          <NavLink
            to="/custom-box"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Custom Box
          </NavLink>
          {user && (
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Profile
            </NavLink>
          )}
        </nav>

        <div className="header-actions">
          {user ? (
            <>
              <span className="user-name">Hi, {user.name}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `btn-secondary ${isActive ? "active-link" : ""}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `btn-primary ${isActive ? "active-link" : ""}`
                }
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
