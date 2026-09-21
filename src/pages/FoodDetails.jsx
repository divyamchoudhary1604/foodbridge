import { useParams, useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import "../styles/food.css";

function FoodDetails({ foods, onUpdateFood }) {

  const { id } = useParams();
  const navigate = useNavigate();
  const food = foods.find((item) => item.id === Number(id));

  if (!food) {
    return (
      <main className="food-details-page">
        <div className="food-details-container">
          <h2>😕 Donation Not Found</h2>
          <p>Sorry, this donation does not exist.</p>
          <button
            className="food-details-back"
            onClick={() => navigate("/food")}
          >
            ← Back to Food
          </button>
        </div>
      </main>
    );
  }

  const expiry = new Date(food.expiry).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  function handleAccept() {
    const updatedFood = {
      ...food,
      status: "Accepted"
    };
    onUpdateFood(updatedFood);
  }

  return (
    <main className="food-details-page">

      <div className="food-details-container">

        <button
          className="food-details-back"
          onClick={() => navigate("/food")}
        >
          ← Back to Food
        </button>

        <div className="food-details-card">

          <div className="food-details-header">
            <span className="food-card-category">{food.category}</span>
            <h1>{food.foodName}</h1>
            <StatusBadge status={food.status} />
          </div>

          <div className="food-details-body">

            <div className="food-details-grid">

              <div className="food-detail-item">
                <span className="food-detail-label">Quantity</span>
                <span className="food-detail-value">
                  📦 {food.quantity} {food.unit}
                </span>
              </div>

              <div className="food-detail-item">
                <span className="food-detail-label">Location</span>
                <span className="food-detail-value">
                  📍 {food.location}
                </span>
              </div>

              <div className="food-detail-item">
                <span className="food-detail-label">Donor</span>
                <span className="food-detail-value">
                  👤 {food.donorName}
                </span>
              </div>

              <div className="food-detail-item">
                <span className="food-detail-label">Phone</span>
                <span className="food-detail-value">
                  📞 {food.phone}
                </span>
              </div>

              <div className="food-detail-item">
                <span className="food-detail-label">Expiry</span>
                <span className="food-detail-value">
                  ⏰ {expiry}
                </span>
              </div>

              <div className="food-detail-item">
                <span className="food-detail-label">Status</span>
                <span className="food-detail-value">
                  <StatusBadge status={food.status} />
                </span>
              </div>

            </div>

            {food.description && (
              <div className="food-details-description">
                <h3>Description</h3>
                <p>{food.description}</p>
              </div>
            )}

            <div className="food-details-actions">

              <button
                className="secondary-button"
                onClick={() => navigate("/food")}
              >
                ← Back to Food
              </button>

              {food.status === "Available" && (
                <button
                  className="primary-button"
                  onClick={handleAccept}
                >
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