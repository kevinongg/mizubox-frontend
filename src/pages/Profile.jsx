import React from "react";
import "./Profile.css";

const Profile = () => {
  // User data
  const user = {
    user_id: 5,
    name: "AKHI",
    email: "akhi1@gmail.com",
    role: "user",
    custom_boxes: null,
    orders: null,
  };

  const handleLogout = () => {
    localStorage.removeItem("mizubox_token");
    window.location.href = "/login";
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>

      <div className="profile-content">
        <div className="info-row">
          <span className="info-label">User ID:</span>
          <span className="info-value">#{user.user_id}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Name:</span>
          <span className="info-value">{user.name}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Email:</span>
          <span className="info-value">{user.email}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Account Type:</span>
          <span className="info-value">{user.role}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Total Orders:</span>
          <span className="info-value">
            {user.orders ? user.orders.length : 0}
          </span>
        </div>

        <div className="info-row">
          <span className="info-label">Custom Boxes:</span>
          <span className="info-value">
            {user.custom_boxes ? user.custom_boxes.length : 0}
          </span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
