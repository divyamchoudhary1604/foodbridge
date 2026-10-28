import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "../../styles/dashboard.css";
import "../../styles/tracker.css";

export default function DashboardLayout() {
  useDocumentTitle("Dashboard");
  const { currentUser, updateProfile, logout, isDonor, isNGO, isVolunteer, isAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function handleRoleChange(e) {
    const newRole = e.target.value;
    updateProfile({ role: newRole });
    showToast(`Role switched to ${newRole}`, "info");
  }

  function handleLogout() {
    logout();
    showToast("Logged out successfully.", "info");
    navigate("/");
  }

  return (
    <main className="dashboard-page">
      <div className="container dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar" aria-label="Dashboard Navigation">
          <div className="user-profile-widget">
            <div className="user-avatar-circle">
              {currentUser?.name ? currentUser.name[0].toUpperCase() : "U"}
            </div>
            <div className="user-info">
              <h3 className="user-display-name">{currentUser?.name || "Guest User"}</h3>
              <p className="user-email">{currentUser?.email}</p>
            </div>
          </div>

          {/* Role Switcher (demo helper) */}
          <div style={{ marginBottom: "20px", padding: "12px", background: "var(--color-bg)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--color-text-secondary)", marginBottom: "6px" }}>
              Active Role:
            </label>
            <select
              value={currentUser?.role || "Volunteer"}
              onChange={handleRoleChange}
              style={{ width: "100%", padding: "6px 8px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
            >
              <option value="Donor">Donor (Posts Surplus)</option>
              <option value="NGO">NGO (Claims Surplus)</option>
              <option value="Volunteer">Volunteer (Deliveries)</option>
              <option value="Admin">Admin (Full Access)</option>
            </select>
          </div>

          <nav className="dashboard-nav">
            {/* Overview — everyone */}
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) => `dash-nav-link ${isActive ? "dash-nav-active" : ""}`}
            >
              📊 Overview &amp; Impact
            </NavLink>

            {/* Impact Dashboard — everyone */}
            <NavLink
              to="/dashboard/impact"
              className={({ isActive }) => `dash-nav-link ${isActive ? "dash-nav-active" : ""}`}
            >
              📈 Impact Dashboard
            </NavLink>

            {/* My Donations — Donor & Admin */}
            {(isDonor || isAdmin) && (
              <NavLink
                to="/dashboard/my-donations"
                className={({ isActive }) => `dash-nav-link ${isActive ? "dash-nav-active" : ""}`}
              >
                🍲 Donor Dashboard
              </NavLink>
            )}

            {/* Volunteer Dashboard — Volunteer & Admin */}
            {(isVolunteer || isAdmin) && (
              <NavLink
                to="/dashboard/volunteer"
                className={({ isActive }) => `dash-nav-link ${isActive ? "dash-nav-active" : ""}`}
              >
                🚗 Volunteer Dashboard
              </NavLink>
            )}

            {/* NGO Dashboard — NGO & Admin */}
            {(isNGO || isAdmin) && (
              <NavLink
                to="/dashboard/ngo"
                className={({ isActive }) => `dash-nav-link ${isActive ? "dash-nav-active" : ""}`}
              >
                🤝 NGO Dashboard
              </NavLink>
            )}

            {/* Claimed Rescue Items — NGO & Admin */}
            {(isNGO || isAdmin) && (
              <NavLink
                to="/dashboard/my-claims"
                className={({ isActive }) => `dash-nav-link ${isActive ? "dash-nav-active" : ""}`}
              >
                📋 My Claims
              </NavLink>
            )}

            {/* Rescue Checklist — Volunteer & Admin */}
            {(isVolunteer || isAdmin) && (
              <NavLink
                to="/dashboard/checklist"
                className={({ isActive }) => `dash-nav-link ${isActive ? "dash-nav-active" : ""}`}
              >
                ✅ Rescue Checklist
              </NavLink>
            )}
          </nav>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              background: "#fef2f2",
              color: "#991b1b",
              border: "1px solid #fecaca",
              borderRadius: "var(--radius-md)",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all var(--transition)",
            }}
          >
            🚪 Logout
          </button>
        </aside>

        {/* Main Content Area */}
        <section className="dashboard-main-content">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
