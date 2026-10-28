import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "../styles/navbar.css";

/**
 * Global Navigation Bar with Role-Based Navigation.
 * Fulfills syllabus:
 * - HTML5 semantic <nav> element (Lectures 1-6)
 * - Multi-page SPA navigation (Lectures 43-48)
 * - Role-Based Visibility (Lectures 37-42 & 49-54)
 */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout, isAuthenticated, isDonor, isNGO, isVolunteer, isAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.items.length);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    showToast("You have been logged out.", "info");
    closeMenu();
    navigate("/");
  }

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <Logo size={28} />
        FoodBridge
      </Link>

      <button
        className="navbar-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      <div className={`navbar-links ${menuOpen ? "navbar-open" : ""}`}>
        <NavLink to="/" onClick={closeMenu} end>
          Home
        </NavLink>

        <NavLink to="/food" onClick={closeMenu}>
          Available Food
        </NavLink>

        {/* Donate Food: Visible to Donors, Admins, or Guests */}
        {(!isAuthenticated || isDonor || isAdmin) && (
          <NavLink to="/donate" onClick={closeMenu}>
            Donate Food
          </NavLink>
        )}

        {/* Deliveries: Visible to Volunteers, Admins, or Guests */}
        {(!isAuthenticated || isVolunteer || isAdmin) && (
          <NavLink to="/deliveries" onClick={closeMenu}>
            Deliveries
          </NavLink>
        )}

        <NavLink to="/cart" onClick={closeMenu}>
          🛒 Cart {cartCount > 0 && <span className="tab-count-badge badge-active">{cartCount}</span>}
        </NavLink>

        {isAuthenticated && (
          <NavLink to="/dashboard" onClick={closeMenu}>
            📊 Dashboard
          </NavLink>
        )}

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
      </div>

      <div className="navbar-right">
        {isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link to="/dashboard" className="navbar-user-badge" onClick={closeMenu} title="Go to Dashboard">
              👤 {currentUser.name}{" "}
              <span className={`user-role-tag role-${currentUser.role?.toLowerCase()}`} style={{ fontSize: "11px", marginLeft: "4px" }}>
                {currentUser.role}
              </span>
            </Link>

            <button
              className="navbar-logout-button"
              onClick={handleLogout}
              aria-label="Sign out"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="primary-button small-button" onClick={closeMenu}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;