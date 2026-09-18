import { useParams, useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import "../styles/food.css";

/**
 * FoodDetails Page – Dynamic Route /food/:id
 *
 * Uses useParams() to read the food id from the URL.
 * Finds the matching donation from the foods array.
 * Shows full details about a single food donation.
 *
 * Props:
 * - foods: array of all food donation objects
 * - onUpdateFood: function to update a donation's status
 */
function FoodDetails({ foods, onUpdateFood }) {
  // useParams reads the :id parameter from the URL /food/:id
  const { id } = useParams();

  // useNavigate lets us go back to the previous page
  const navigate = useNavigate();

  // Find the donation that matches the id from the URL
  // Note: URL params are strings, so we convert id to a number
  const food = foods.find((item) => item.id === Number(id));

  // If no food found with that id, show not found message
  if (!food) {
    return (
      <main className="food-details-page">
        <div className="food-details-container">
          <div className="no-results">
            <div className="no-results-icon">😕</div>
            <h3>Donation Not Found</h3>
            <p>The food donation you are looking for does not exist.</p>
            <button
              className="primary-button"
              onClick={() => navigate("/food")}
            >
              ← Back to Listings
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Format the expiry date for display
  const expiryDate = new Date(food.expiry);
  const formattedExpiry = expiryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Handle "Accept Donation" button click
  function handleAccept() {
    const updatedFood = { ...food, status: "Accepted" };
    onUpdateFood(updatedFood);
  }

  return (
    <main className="food-details-page">
      <div className="food-details-container">
        {/* Back button to go to food list */}
        <button
          className="food-details-back"
          onClick={() => navigate("/food")}
        >
          ← Back to Listings
        </button>

        {/* Details Card */}
        <div className="food-details-card">
          {/* Header with food name and category */}
          <div className="food-details-header">
            <span className="food-card-category">{food.category}</span>
            <h1>{food.foodName}</h1>
            <StatusBadge status={food.status} />
          </div>

          {/* Body with all details */}
          <div className="food-details-body">
            <div className="food-details-grid">
              <div className="food-detail-item">
                <span className="food-detail-label">📦 Quantity</span>
                <span className="food-detail-value">
                  {food.quantity} {food.unit}
                </span>
              </div>

              <div className="food-detail-item">
                <span className="food-detail-label">📍 Location</span>
                <span className="food-detail-value">{food.location}</span>
              </div>

              <div className="food-detail-item">
                <span className="food-detail-label">👤 Donor</span>
                <span className="food-detail-value">{food.donorName}</span>
              </div>

              <div className="food-detail-item">
                <span className="food-detail-label">📞 Contact</span>
                <span className="food-detail-value">{food.phone}</span>
              </div>

              <div className="food-detail-item">
                <span className="food-detail-label">⏰ Expiry</span>
                <span className="food-detail-value">{formattedExpiry}</span>
              </div>

              <div className="food-detail-item">
                <span className="food-detail-label">📋 Status</span>
                <span className="food-detail-value">
                  <StatusBadge status={food.status} />
                </span>
              </div>
            </div>

            {/* Description */}
            {food.description && (
              <div className="food-details-description">
                <h3>Description</h3>
                <p>{food.description}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="food-details-actions">
              <button
                className="secondary-button"
                onClick={() => navigate("/food")}
              >
                ← Back to Listings
              </button>

              {/* Only show Accept button if status is "Available" */}
              {food.status === "Available" && (
                <button className="primary-button" onClick={handleAccept}>
                  ✅ Accept Donation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default FoodDetails;
