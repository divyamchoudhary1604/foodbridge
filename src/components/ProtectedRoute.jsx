import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Protected Route wrapper with Role-Based Access Control (RBAC).
 * Fulfills syllabus: Lectures 37-42 (Protected routes & authorization)
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, isAuthenticated, updateProfile } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login while saving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role restriction exists and user's role is not authorized
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return (
      <main className="container page-wrapper" style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
        <div style={{ background: "#ffffff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "40px 24px", boxShadow: "var(--shadow-md)" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
          <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>Role Access Restricted</h2>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "16px" }}>
            You are logged in as <strong>{currentUser.name}</strong> with the role: <span className="user-role-tag" style={{ marginLeft: "4px" }}>{currentUser.role}</span>.
          </p>
          <div style={{ background: "#fef2f2", color: "#991b1b", padding: "12px", borderRadius: "var(--radius-md)", fontSize: "14px", marginBottom: "24px" }}>
            This feature is restricted to: <strong>{allowedRoles.join(" or ")}</strong>.
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/dashboard" className="primary-button small-button">
              ← Go to Dashboard
            </Link>

            {/* Quick switcher helper for viva demo */}
            {allowedRoles[0] && (
              <button
                type="button"
                className="secondary-button small-button"
                onClick={() => updateProfile({ role: allowedRoles[0] })}
              >
                Switch Role to {allowedRoles[0]}
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  return children;
}
