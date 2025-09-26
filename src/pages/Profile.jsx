import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  // User data from your API
  const [user] = useState({
    user_id: 5,
    name: "AKHI",
    email: "akhi1@gmail.com",
    role: "user",
    custom_boxes: null,
    orders: null,
  });

  const handleLogout = () => {
    // Add logout logic
    localStorage.removeItem("mizubox_token");
    window.location.href = "/login";
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar">{user.name.charAt(0)}</div>
          <h1>{user.name}</h1>
          <p className="user-role">{user.role}</p>
        </div>

        {/* User Information */}
        <div className="profile-info">
          <div className="info-item">
            <span className="label">User ID</span>
            <span className="value">#{user.user_id}</span>
          </div>

          <div className="info-item">
            <span className="label">Name</span>
            <span className="value">{user.name}</span>
          </div>

          <div className="info-item">
            <span className="label">Email</span>
            <span className="value">{user.email}</span>
          </div>

          <div className="info-item">
            <span className="label">Account Type</span>
            <span className="value">{user.role}</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="stat-box">
            <span className="stat-number">0</span>
            <span className="stat-label">Orders</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">0</span>
            <span className="stat-label">Custom Boxes</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions">
          <button className="btn-edit">Edit Profile</button>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
