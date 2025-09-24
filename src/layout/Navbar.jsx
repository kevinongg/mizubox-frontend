import { NavLink } from "react-router";

const Navbar = () => {
  // remember to use icons for the navbar
  return (
    <header>
      <nav>
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="nav-middle">
          <NavLink to="/omakasebox">Omakase Box</NavLink>
          <NavLink to="/buildyourown">Build Your Own</NavLink>
          <NavLink to="/sauce">Sauce</NavLink>
          <NavLink to="/extra">Extra</NavLink>
        </div>
        <div className="nav-right">
          <NavLink to="/searchbar">Make searchbar here</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/cart">Cart</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
