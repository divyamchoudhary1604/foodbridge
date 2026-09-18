import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/form.css";

/**
 * Register Page
 *
 * Demo registration form for frontend project.
 * Fields: name, email, phone, password, role
 *
 * Props:
 * - onLogin: function to log the user in after registration
 */
function Register({ onLogin }) {
  const navigate = useNavigate();

  // Form state using a single object
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");

  // Update the form data when user types
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    // Simple validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password.trim() ||
      !formData.role
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.phone.trim().length < 10) {
      setError("Phone number must be at least 10 digits.");
      return;
    }

    // Create user object (demo – no real backend)
    const user = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
    };

    // Log the user in automatically after registration
    onLogin(user);

    // Navigate to dashboard
    navigate("/dashboard");
  }

  return (
    <main className="form-page">
      <div className="form-container">
        <div className="form-card">
          <h1>📝 Create Account</h1>
          <p className="form-subtitle">
            Join FoodBridge and start making a difference
          </p>

          {/* Demo notice */}
          <div className="demo-notice">
            ℹ️ Demo registration – no real account is created.
          </div>

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="reg-name">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                id="reg-name"
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g., Divya Sharma"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="reg-email">
                Email <span className="required-star">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                name="email"
                className="form-input"
                placeholder="e.g., divya@foodbridge.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="reg-phone">
                Phone Number <span className="required-star">*</span>
              </label>
              <input
                id="reg-phone"
                type="tel"
                name="phone"
                className="form-input"
                placeholder="e.g., 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="reg-password">
                Password <span className="required-star">*</span>
              </label>
              <input
                id="reg-password"
                type="password"
                name="password"
                className="form-input"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Role */}
            <div className="form-group">
              <label htmlFor="reg-role">
                Role <span className="required-star">*</span>
              </label>
              <select
                id="reg-role"
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
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
              ✅ Create Account
            </button>
          </form>

          {/* Link to Login */}
          <div className="form-footer">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
