import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/form.css";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim() || !role) {
      setError("Please fill in all fields and select a role.");
      return;
    }

    const user = {
      name: email.split("@")[0],
      email: email.trim(),
      role: role
    };

    onLogin(user);
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


          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Email *</label>

              <input
                type="email"
                className="form-input"
                placeholder="demo@foodbridge.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password *</label>

              <input
                type="password"
                className="form-input"
                placeholder="Enter any password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Role *</label>

              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select your role</option>
                <option value="Donor">Donor</option>
                <option value="NGO">NGO</option>
                <option value="Volunteer">Volunteer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="primary-button form-submit-button"
            >
              🔐 Login
            </button>

          </form>

          <div className="form-footer">
            Don't have an account?{" "}
            <Link to="/register">
              Register here
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Login;