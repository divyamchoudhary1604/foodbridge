import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="footer">

      {/* Brand */}
      <div className="footer-brand">
        <h3>
          <Logo size={24} /> FoodBridge
        </h3>

        <p>Reducing Food Waste, Feeding Lives.</p>

        <p>
          A smart food rescue platform connecting donors,
          NGOs, and volunteers.
        </p>
      </div>

      {/* Quick Links */}
      <div className="footer-links">
        <h4>Quick Links</h4>

        <Link to="/">Home</Link>
        <Link to="/food">Available Food</Link>
        <Link to="/donate">Donate Food</Link>
        <Link to="/about">About</Link>
      </div>

      {/* Resources */}
      <div className="footer-links">
        <h4>Resources</h4>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          © 2026 FoodBridge. Built with ❤️ by FoodBridge Team
        </p>
      </div>

    </footer>
  );
}

export default Footer;