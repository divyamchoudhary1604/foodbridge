import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

/**
 * FoodCard Component (Reusable)
 *
 * Displays a single food donation as a card.
 * Used in the food listing grid and featured donations section.
 *
 * Props:
 * - food: a single food donation object with properties like
 *   id, foodName, category, quantity, unit, location, donorName,
 *   expiry, status
 */
function FoodCard({ food }) {
  // Destructure the food object for easier access
  const {
    id,
    foodName,
    category,
    quantity,
    unit,
    location,
    donorName,
    expiry,
    status,
  } = food;

  // Format the expiry date to a readable string
  const expiryDate = new Date(expiry);
  const formattedExpiry = expiryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article className="food-card">
      {/* Card Header – category tag and status badge */}
      <div className="food-card-header">
        <span className="food-card-category">{category}</span>
        <StatusBadge status={status} />
      </div>

      {/* Card Body – food name and info rows */}
      <div className="food-card-body">
        <h3 className="food-card-name">{foodName}</h3>

        <div className="food-card-info">
          <div className="food-card-info-row">
            <span className="info-icon">📦</span>
            <span>
              {quantity} {unit}
            </span>
          </div>
          <div className="food-card-info-row">
            <span className="info-icon">📍</span>
            <span>{location}</span>
          </div>
          <div className="food-card-info-row">
            <span className="info-icon">👤</span>
            <span>{donorName}</span>
          </div>
          <div className="food-card-info-row">
            <span className="info-icon">⏰</span>
            <span>{formattedExpiry}</span>
          </div>
        </div>
      </div>

      {/* Card Footer – status and view details button */}
      <div className="food-card-footer">
        <StatusBadge status={status} />
        <Link to={`/food/${id}`} className="primary-button small-button">
          View Details
        </Link>
      </div>
    </article>
  );
}

export default FoodCard;
