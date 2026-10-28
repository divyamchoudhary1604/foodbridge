import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useToast } from "../context/ToastContext";
import StatusBadge from "./StatusBadge";

function FoodCard({ food }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();

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

  function handleAddToCart(e) {
    e.preventDefault();
    dispatch(addToCart(food));
    showToast(`Added "${foodName}" to Rescue Cart 🛒`, "success");
  }

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

      {/* Bottom Footer Actions */}
      <div className="food-card-footer" style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
        {status === "Available" ? (
          <button
            type="button"
            className="secondary-button small-button"
            onClick={handleAddToCart}
            title="Add to Rescue Cart (Redux Toolkit)"
          >
            🛒 Add
          </button>
        ) : (
          <StatusBadge status={status} />
        )}

        <Link to={`/food/${id}`} className="primary-button small-button">
          Details →
        </Link>
      </div>
    </div>
  );
}

export default FoodCard;