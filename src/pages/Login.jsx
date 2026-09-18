import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/form.css";

/**
 * Login Page
 *
 * Demo login for frontend project – no real authentication backend.
 *
 * Fields: email, password, role
 * On submit, creates a user object and saves to localStorage.
 *
 * Props:
 * - onLogin: function called with the user object to set current user
 */
function Login({ onLogin }) {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  /**
   * handleSubmit – validates and creates demo user
   */
  function handleSubmit(event) {
    event.preventDefault();

    // Simple validation
    if (!email.trim() || !password.trim() || !role) {
      setError("Please fill in all fields and select a role.");
      return;
    }

    // Demo login – create user object (no real authentication)
    const user = {
      name: email.split("@")[0], // Use part before @ as display name
      email: email.trim(),
      role: role,
    };

    // Call the parent function to set the current user
    onLogin(user);

    // Navigate to dashboard after login
    navigate("/dashboard");
  }

  return (
    <main className="form-page">
      <div className="form-container">
        <div className="form-card">
          <h1>👋 Welcome Back</h1>
          <p className="form-subtitle">
            Log in to your FoodBridge account
          </p>

          {/* Demo notice */}
          <div className="demo-notice">
            ℹ️ Demo login for frontend project – no real authentication backend.
          </div>

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="login-email">
                Email <span className="required-star">*</span>
              </label>
              <input
                id="login-email"
                type="email"
                className="form-input"
                placeholder="e.g., demo@foodbridge.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="login-password">
                Password <span className="required-star">*</span>
              </label>
              <input
                id="login-password"
                type="password"
                className="form-input"
                placeholder="Enter any password (demo)"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {/* Role Selection */}
            <div className="form-group">
              <label htmlFor="login-role">
                Role <span className="required-star">*</span>
              </label>
              <select
                id="login-role"
                className="form-select"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="">Select your role</option>
                <option value="Donor">Donor</option>
                <option value="NGO">NGO</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="primary-button form-submit-button">
              🔐 Login
            </button>
          </form>

          {/* Link to Register */}
          <div className="form-footer">
            Don't have an account?{" "}
            <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
