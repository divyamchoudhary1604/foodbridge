import { useState } from "react";
import StatusBadge from "../components/StatusBadge";
import Tabs from "../components/common/Tabs";
import { useFood } from "../context/FoodContext";
import { useToast } from "../context/ToastContext";
import "../styles/delivery.css";

function VolunteerDelivery() {
  const { foods, updateFood } = useFood();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState("all");

  const waitingForPickup = foods.filter((food) => food.status === "Accepted");
  const inTransit = foods.filter((food) => food.status === "Picked Up");
  const delivered = foods.filter((food) => food.status === "Completed");

  const tabsConfig = [
    { id: "all", label: "All Active", count: waitingForPickup.length + inTransit.length },
    { id: "waiting", label: "Ready for Pickup", count: waitingForPickup.length },
    { id: "transit", label: "In Transit", count: inTransit.length },
    { id: "completed", label: "Delivered", count: delivered.length }
  ];

  function claimPickup(food) {
    updateFood({
      ...food,
      status: "Picked Up"
    });
    showToast(`Claimed "${food.foodName}" for delivery 🚴`, "info");
  }

  function markDelivered(food) {
    updateFood({
      ...food,
      status: "Completed"
    });
    showToast(`"${food.foodName}" delivered successfully! 🎉`, "success");
  }

  function renderCard(food) {
    return (
      <div className="delivery-card" key={food.id}>
        <div className="delivery-card-header">
          <h3>{food.foodName}</h3>
          <StatusBadge status={food.status} />
        </div>

        <div className="delivery-card-body">
          <div className="delivery-card-details">
            <div className="delivery-detail">
              <span className="delivery-detail-label">📦 Quantity</span>
              <span className="delivery-detail-value">
                {food.quantity} {food.unit}
              </span>
            </div>

            <div className="delivery-detail">
              <span className="delivery-detail-label">👤 Donor</span>
              <span className="delivery-detail-value">{food.donorName}</span>
            </div>

            <div className="delivery-detail">
              <span className="delivery-detail-label">📍 Pickup Location</span>
              <span className="delivery-detail-value">{food.location}</span>
            </div>

            <div className="delivery-detail">
              <span className="delivery-detail-label">📞 Contact</span>
              <span className="delivery-detail-value">{food.phone}</span>
            </div>
          </div>

          <div className="delivery-card-actions">
            {food.status === "Accepted" && (
              <button
                className="primary-button small-button"
                onClick={() => claimPickup(food)}
              >
                🚴 Pick Up Food
              </button>
            )}

            {food.status === "Picked Up" && (
              <button
                className="primary-button small-button"
                onClick={() => markDelivered(food)}
              >
                ✅ Mark as Delivered
              </button>
            )}

            {food.status === "Completed" && (
              <span className="delivery-completed-note">
                ✨ Successfully delivered
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Filter items based on active tab
  let displayFoods = [];
  if (activeTab === "all") displayFoods = [...waitingForPickup, ...inTransit];
  else if (activeTab === "waiting") displayFoods = waitingForPickup;
  else if (activeTab === "transit") displayFoods = inTransit;
  else if (activeTab === "completed") displayFoods = delivered;

  return (
    <main className="delivery-page">
      <div className="container">
        <div className="page-header">
          <h1>Volunteer Delivery Hub</h1>
          <p>Coordinate pickups and deliveries to connect food with people</p>
        </div>

        {/* Tabs Component */}
        <Tabs
          tabs={tabsConfig}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {displayFoods.length > 0 ? (
          <div className="delivery-grid">
            {displayFoods.map((food) => renderCard(food))}
          </div>
        ) : (
          <div className="delivery-empty">
            <h3>No deliveries in this section</h3>
            <p>Check back soon or browse available food to claim</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default VolunteerDelivery;