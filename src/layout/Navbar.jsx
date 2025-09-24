import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  // remember to use icons for the navbar
  return (
    <header>
      <nav>
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/cart">Cart</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
