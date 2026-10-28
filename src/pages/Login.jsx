import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "../styles/form.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "volunteer@foodbridge.org",
    password: "password123",
    role: "Volunteer"
  });

  const [errors, setErrors] = useState({});

  // Destination route after login (defaults to /dashboard)
  const from = location.state?.from?.pathname || "/dashboard";

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.role) newErrors.role = "Please select your role";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fill in all required fields", "error");
      return;
    }

    const user = {
      name: formData.email.split("@")[0],
      email: formData.email.trim(),
      role: formData.role
    };

    login(user);
    showToast(`Welcome back, ${user.name}! 👋 Logged in as ${user.role}.`, "success");
    navigate(from, { replace: true });
  }

  return (
    <main className="form-page">
      <div className="form-container">
        <div className="form-card">
          <h1>👋 Welcome Back</h1>
          <p className="form-subtitle">Log in to your FoodBridge account</p>

          <form onSubmit={handleSubmit} noValidate>
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="e.g. volunteer@foodbridge.org"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <SelectField
              label="Select Role"
              name="role"
              options={["Donor", "NGO", "Volunteer", "Admin"]}
              value={formData.role}
              onChange={handleChange}
              error={errors.role}
              required
            />

            <button
              type="submit"
              className="primary-button form-submit-button"
              style={{ width: "100%", marginTop: "16px" }}
            >
              🔐 Sign In
            </button>
          </form>

          <div className="form-footer" style={{ marginTop: "24px", textAlign: "center" }}>
            Don't have an account? <Link to="/register" style={{ color: "var(--color-primary)", fontWeight: "600" }}>Register here</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;