import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";
import "../styles/navbar.css";

function Navbar({ currentUser, onLogout }) {

  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <Logo size={28} />
        FoodBridge
      </Link>

      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "navbar-open" : ""}`}>

        <NavLink to="/" onClick={closeMenu} end>
          Home
        </NavLink>

        <NavLink to="/food" onClick={closeMenu}>
          Available Food
        </NavLink>

        <NavLink to="/donate" onClick={closeMenu}>
          Donate Food
        </NavLink>

        <NavLink to="/deliveries" onClick={closeMenu}>
          Deliveries
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>

      </div>

      <div className="navbar-right">

        {currentUser ? (
          <>
            <span className="navbar-user-badge">
              👤 {currentUser.name}
            </span>

            <button
              className="navbar-logout-button"
              onClick={onLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="primary-button small-button">
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;