import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import "../styles/about.css";

function NotFound() {
  return (
    <main className="not-found-page">

      <div className="not-found-content">

        <Logo size={72} />

        <div className="not-found-code">
          404
        </div>

        <h2>Page Not Found</h2>

        <p>
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <Link to="/" className="primary-button">
          ← Back to Home
        </Link>

      </div>

    </main>
  );
}

export default NotFound;