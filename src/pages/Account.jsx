import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

const Profile = () => {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Profile</h1>
      <h2>
        <NavLink to="/" onClick={() => logout()}>
          Logout
        </NavLink>
      </h2>
      <p>
        Welcome to your profile. Here you will be able to view all your personal
        details
      </p>
    </div>
  );
};

export default Profile;
