import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function FoodCard({ food }) {
  const {
    id,
    foodName,
    category,
    quantity,
    unit,
    location,
    donorName,
    expiry,
    status
  } = food;

  const formattedExpiry = new Date(expiry).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <div className="food-card">

      {/* Top */}
      <div className="food-card-header">
        <span className="food-card-category">{category}</span>
        <StatusBadge status={status} />
      </div>

      {/* Food information */}
      <div className="food-card-body">

        <h3 className="food-card-name">{foodName}</h3>

        <div className="food-card-info">
          <div className="food-card-info-row">
            <span className="info-icon">📦</span>
            {quantity} {unit}
          </div>
          <div className="food-card-info-row">
            <span className="info-icon">📍</span>
            {location}
          </div>
          <div className="food-card-info-row">
            <span className="info-icon">👤</span>
            {donorName}
          </div>
          <div className="food-card-info-row">
            <span className="info-icon">⏰</span>
            {formattedExpiry}
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="food-card-footer">
        <StatusBadge status={status} />

        <Link to={`/food/${id}`} className="primary-button small-button">
          View Details →
        </Link>
      </div>

    </div>
  );
}

export default FoodCard;