import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";
import "../styles/navbar.css";

/**
 * Navbar Component
 *
 * Renders the top navigation bar with:
 * - FoodBridge logo
 * - Navigation links using NavLink (highlights active page)
 * - User badge and logout button (if logged in)
 * - Hamburger menu for mobile screens
 *
 * Props:
 * - currentUser: the logged-in user object (or null)
 * - onLogout: function to log the user out
 */
function Navbar({ currentUser, onLogout }) {
  // State to track if mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle mobile menu open/close
  function handleToggleMenu() {
    setMenuOpen(!menuOpen);
  }

  // Close the menu when a link is clicked (for mobile)
  function handleLinkClick() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
          <Logo size={28} />
          FoodBridge
        </Link>

        {/* Hamburger button for mobile */}
        <button
          className="navbar-toggle"
          onClick={handleToggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${menuOpen ? "navbar-open" : ""}`}>
          <NavLink to="/" onClick={handleLinkClick} end>
            Home
          </NavLink>
          <NavLink to="/food" onClick={handleLinkClick}>
            Available Food
          </NavLink>
          <NavLink to="/donate" onClick={handleLinkClick}>
            Donate Food
          </NavLink>
          <NavLink to="/dashboard" onClick={handleLinkClick}>
            Dashboard
          </NavLink>
          <NavLink to="/about" onClick={handleLinkClick}>
            About
          </NavLink>
        </div>

        {/* Right section: Login or User badge */}
        <div className="navbar-right">
          {currentUser ? (
            <>
              <div className="navbar-user-badge">
                <span className="navbar-user-icon">👤</span>
                {currentUser.name}
              </div>
              <button className="navbar-logout-button" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="primary-button small-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
