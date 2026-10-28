import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "../styles/form.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Donor"
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Instant validation feedback on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  // Password strength helper (simple & easy to explain)
  function getPasswordStrength(pwd) {
    if (!pwd) return "";
    if (pwd.length < 6) return "Weak (at least 6 characters required)";
    if (pwd.length >= 8 && /[0-9]/.test(pwd)) return "Strong 💪";
    return "Medium 👍";
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneClean = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneClean.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.role) {
      newErrors.role = "Please select your role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the validation errors", "error");
      return;
    }

    const user = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      role: formData.role
    };

    register(user);
    showToast(`Account created successfully! Welcome, ${user.name}! 🎉`, "success");
    navigate("/dashboard");
  }

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <main className="form-page">
      <div className="form-container">
        <div className="form-card" style={{ maxWidth: "560px" }}>
          <h1>📝 Create Account</h1>
          <p className="form-subtitle">
            Join FoodBridge to rescue surplus food in your community
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <InputField
              label="Full Name"
              name="name"
              placeholder="e.g. Divya Sharma"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="e.g. divya@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Create a secure password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText={
                formData.password
                  ? `Strength: ${passwordStrength}`
                  : "Must be at least 6 characters"
              }
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
              ✅ Complete Registration
            </button>
          </form>

          <div className="form-footer" style={{ marginTop: "24px", textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--color-primary)", fontWeight: "600" }}>
              Login here
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
