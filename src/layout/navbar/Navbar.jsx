import { NavLink } from "react-router";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="nav-left">
          <NavLink to="/">
            <img src="/Mizubox.png" alt="Mizubox" className="logo" />
          </NavLink>
        </div>

        <div className="nav-container">
          <div className="nav-middle">
            <NavLink to="/omakasebox">OMAKASE BOX</NavLink>
            <NavLink to="/buildyourown">BUILD YOUR OWN</NavLink>
            <NavLink to="/sauce">SAUCE</NavLink>
            <NavLink to="/extra">EXTRA</NavLink>
          </div>

          <div className="nav-right">
            <NavLink to="/searchbar" className="icon-link">
              <span className="icon-search">🔍</span>
            </NavLink>
            <NavLink to="/orders" className="icon-link">
              <span className="icon-user">👤</span>
            </NavLink>
            <UserDropdown />
            <NavLink to="/cart" className="icon-link cart-link">
              <span className="icon-cart">🛒</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
