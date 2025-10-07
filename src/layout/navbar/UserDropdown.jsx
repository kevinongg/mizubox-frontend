import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";

const UserDropdown = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [userDropdown, setUserDropdown] = useState(false);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (userDropdownRef && !userDropdownRef.current.contains(event?.target))
        setUserDropdown(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const onLogout = () => {
    logout();
    setUserDropdown(false);
    navigate("/login");
  };

  return (
    <div className="user-menu" ref={userDropdownRef}>
      {/* <button type="button" onClick={() => setUserDropdown((prev) => !prev)}> */}
      <a
        className="icon-link"
        type="button"
        onClick={() => setUserDropdown(!userDropdown)}
      >
        <span className="icon-user">
          👤<span style={{ fontSize: "10px" }}>▼</span>
        </span>
      </a>

      {userDropdown && (
        <div className="user-dropdown">
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
            <button onClick={onLogout}>Logout</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
