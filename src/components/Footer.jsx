import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-brand-title">
            <Logo size={26} />
            <span>FoodBridge</span>
          </div>

          <p className="footer-tagline">
            Reducing Food Waste, Feeding Lives.
          </p>

          <p className="footer-desc">
            A smart food rescue platform connecting donors, NGOs, and volunteers to distribute surplus food quickly and safely.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/food">Available Food</Link>
          <Link to="/donate">Donate Food</Link>
          <Link to="/about">About Us</Link>
        </div>

        {/* Resources & Management Column */}
        <div className="footer-links">
          <h4>Resources</h4>
          <Link to="/cart">Rescue Cart</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/deliveries">Deliveries Hub</Link>
          <Link to="/login">Account Login</Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 FoodBridge. Built with ❤️ for community food rescue</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;