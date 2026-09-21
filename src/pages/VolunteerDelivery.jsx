import StatusBadge from "../components/StatusBadge";
import "../styles/delivery.css";

function VolunteerDelivery({ foods, onUpdateFood }) {

  const waitingForPickup = foods.filter(
    (food) => food.status === "Accepted"
  );

  const inTransit = foods.filter(
    (food) => food.status === "Picked Up"
  );

  const delivered = foods.filter(
    (food) => food.status === "Completed"
  );

  function claimPickup(food) {
    onUpdateFood({
      ...food,
      status: "Picked Up"
    });
  }

  function markDelivered(food) {
    onUpdateFood({
      ...food,
      status: "Completed"
    });
  }

  function showCard(food) {
    return (
      <div className="delivery-card" key={food.id}>

        <div className="delivery-card-header">
          <h3>{food.foodName}</h3>
          <StatusBadge status={food.status} />
        </div>

        <div className="delivery-card-body">

          <div className="delivery-card-details">

            <div className="delivery-detail">
              <span className="delivery-detail-label">
                📦 Quantity
              </span>
              <span className="delivery-detail-value">
                {food.quantity} {food.unit}
              </span>
            </div>

            <div className="delivery-detail">
              <span className="delivery-detail-label">
                👤 Donor
              </span>
              <span className="delivery-detail-value">
                {food.donorName}
              </span>
            </div>

            <div className="delivery-detail">
              <span className="delivery-detail-label">
                📍 Pickup Location
              </span>
              <span className="delivery-detail-value">
                {food.location}
              </span>
            </div>

            <div className="delivery-detail">
              <span className="delivery-detail-label">
                📞 Contact
              </span>
              <span className="delivery-detail-value">
                {food.phone}
              </span>
            </div>

          </div>

          <div className="delivery-card-actions">

            {food.status === "Accepted" && (
              <button
                className="claim-button"
                onClick={() => claimPickup(food)}
              >
                🚴 Claim Pickup
              </button>
            )}

            {food.status === "Picked Up" && (
              <button
                className="deliver-button"
                onClick={() => markDelivered(food)}
              >
                ✅ Mark Delivered
              </button>
            )}

            {food.status === "Completed" && (
              <span className="completed-badge">
                🎉 Delivered
              </span>
            )}

          </div>

        </div>
      </div>
    );
  }


  return (
    <main className="delivery-page">

      <div className="delivery-container">

        <div className="delivery-header">
          <h1>🚴 Volunteer Delivery Hub</h1>
          <p>
            Claim food pickups and deliver them to NGOs.
          </p>
        </div>

        <div className="delivery-flow">

          <h2>🚀 Food Rescue Delivery Flow</h2>

          <div className="delivery-flow-steps">

            <div className="delivery-flow-step step-done">
              <span>✅</span>
              <span>Accepted</span>
            </div>

            <span className="delivery-flow-arrow">→</span>

            <div className="delivery-flow-step step-active">
              <span>🚴</span>
              <span>Picked Up</span>
            </div>

            <span className="delivery-flow-arrow">→</span>

            <div className="delivery-flow-step">
              <span>🏢</span>
              <span>Delivered</span>
            </div>

          </div>
        </div>

        <div className="delivery-stats">

          <div className="delivery-stat-card">
            <div className="delivery-stat-number">
              {waitingForPickup.length}
            </div>
            <div className="delivery-stat-label">
              Waiting for Pickup
            </div>
          </div>

          <div className="delivery-stat-card">
            <div className="delivery-stat-number">
              {inTransit.length}
            </div>
            <div className="delivery-stat-label">
              In Transit
            </div>
          </div>

          <div className="delivery-stat-card">
            <div className="delivery-stat-number">
              {delivered.length}
            </div>
            <div className="delivery-stat-label">
              Delivered
            </div>
          </div>

        </div>

        {waitingForPickup.length > 0 && (
          <>
            <h2 className="delivery-section-title">
              📦 Waiting for Pickup ({waitingForPickup.length})
            </h2>

            <div className="delivery-cards">
              {waitingForPickup.map(showCard)}
            </div>
          </>
        )}

        {inTransit.length > 0 && (
          <>
            <h2 className="delivery-section-title">
              🚴 In Transit ({inTransit.length})
            </h2>

            <div className="delivery-cards">
              {inTransit.map(showCard)}
            </div>
          </>
        )}

        {delivered.length > 0 && (
          <>
            <h2 className="delivery-section-title">
              🎉 Completed Deliveries ({delivered.length})
            </h2>

            <div className="delivery-cards">
              {delivered.map(showCard)}
            </div>
          </>
        )}

        {waitingForPickup.length === 0 &&
          inTransit.length === 0 &&
          delivered.length === 0 && (
            <div className="delivery-empty">

              <div className="delivery-empty-icon">
                📭
              </div>

              <h3>No deliveries yet</h3>

              <p>
                When donors post food and NGOs accept it,
                deliveries will appear here.
              </p>

            </div>
          )}

      </div>
    </main>
  );
}

export default VolunteerDelivery;