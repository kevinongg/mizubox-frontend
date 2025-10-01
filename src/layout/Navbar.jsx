import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="nav-left">
          <img src="/Mizubox-Logo.png" alt="Mizubox" className="logo" />
        </div>

        <div className="nav-container">
          <div className="nav-middle">
            <NavLink to="/">HOME</NavLink>
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
