import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

const Profile = () => {
  const { logout } = useAuth();
  const { navigate } = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Profile</h1>
      <h2>
        <Link to="/" onClick={() => handleLogout()}>
          Logout
        </Link>
      </h2>
      <p>
        Welcome to your profile. Here you will be able to view all your personal
        details
      </p>
    </div>
  );
};

export default Profile;
