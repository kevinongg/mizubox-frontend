import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";

const UserDropdown = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [userDropdown, setUserDropdown] = useState(false);

  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };

  return (
    <div>
      <button type="button" onClick={() => setUserDropdown((prev) => !prev)}>
        <span className="icon-user">👤</span>
      </button>

      {userDropdown && (
        <div>
          <NavLink to="/account" onClick={() => setUserDropdown(false)}>
            Account
          </NavLink>
          <NavLink to="/orders" onClick={() => setUserDropdown(false)}>
            Orders
          </NavLink>
          {!token ? (
            <NavLink to="/login" onClick={() => setUserDropdown(false)}>
              Login
            </NavLink>
          ) : (
            <NavLink to={"/login"} onClick={() => logout()}>
              Logout
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
