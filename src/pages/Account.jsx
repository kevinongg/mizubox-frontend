import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

const Profile = () => {
  const { logout } = useAuth();
  const { navigate } = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="account-container">
  <h1>My Account</h1>
  <div className="profile-card">
    <h2>Profile</h2>
    <div className="profile-info">
      <p>Welcome to your account</p>
    </div>
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </div>
</div>
  );
};

export default Profile;
