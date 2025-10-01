import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="nav-left">
          <NavLink to="/" className="logo-link">
            <img src="/Mizubox-Logo.png" alt="Mizubox" className="logo" />
            {/* <img src="/mizubox-logo.svg" alt="Mizubox" className="logo" /> */}
          </NavLink>
        </div>

        <div className="nav-container">
          <div className="nav-middle">
            <NavLink to="/omakasebox">Omakase Box</NavLink>
            <NavLink to="/buildyourown">Build Your Own</NavLink>
            <NavLink to="/sauce">Sauce</NavLink>
            <NavLink to="/extra">Extra</NavLink>
          </div>

          <div className="nav-right">
            <NavLink to="/searchbar" className="icon-link">
              <span className="icon-search">🔍</span>
            </NavLink>
            <NavLink to="/orders">Orders</NavLink>
            <NavLink to="/account" className="icon-link">
              <span className="icon-user">👤</span>
            </NavLink>
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
