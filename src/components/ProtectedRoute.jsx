import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute Component
 *
 * This component checks if a user is logged in before allowing
 * access to a page (like Dashboard). If the user is not logged in,
 * they are redirected to the Login page.
 *
 * Props:
 * - currentUser: the logged-in user object (or null if not logged in)
 * - children: the page/component to render if user is logged in
 */
function ProtectedRoute({ currentUser, children }) {
  // If there is no user, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, show the protected page
  return children;
}

export default ProtectedRoute;
