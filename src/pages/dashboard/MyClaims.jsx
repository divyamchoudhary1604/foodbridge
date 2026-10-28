import { Link } from "react-router-dom";
import { useFood } from "../../context/FoodContext";
import { useToast } from "../../context/ToastContext";
import StatusBadge from "../../components/StatusBadge";

export default function MyClaims() {
  const { foods, updateFood } = useFood();
  const { showToast } = useToast();

  // Claimed items (status is Accepted or Picked Up)
  const claimedItems = foods.filter(
    (item) => item.status === "Accepted" || item.status === "Picked Up"
  );

  function handleMarkPickedUp(item) {
    updateFood({ ...item, status: "Picked Up" });
    showToast(`Marked "${item.foodName}" as In Transit 🚚`, "info");
  }

  function handleMarkDelivered(item) {
    updateFood({ ...item, status: "Completed" });
    showToast(`"${item.foodName}" delivered successfully! 🎉`, "success");
  }

  return (
    <div className="dash-subpage">
      <div className="dash-subpage-header">
        <div>
          <h2>🤝 Claimed Rescue Items</h2>
          <p className="text-muted">
            Track and update donations you have accepted for distribution.
          </p>
        </div>
      </div>

      {claimedItems.length === 0 ? (
        <div className="empty-state-box">
          <h3>No active rescue claims</h3>
          <p>You haven't claimed any surplus food yet.</p>
          <Link to="/food" className="primary-button small-button" style={{ marginTop: "12px" }}>
            Find Available Food
          </Link>
        </div>
      ) : (
        <div className="donations-grid-list">
          {claimedItems.map((item) => (
            <div key={item.id} className="donation-manage-card">
              <div className="donation-manage-header">
                <span className="card-badge-cat">{item.category}</span>
                <StatusBadge status={item.status} />
              </div>

              <h3 className="donation-card-title">{item.foodName}</h3>

              <div className="donation-meta-info">
                <p><strong>Quantity:</strong> {item.quantity} {item.unit}</p>
                <p><strong>Donor:</strong> {item.donorName} (📞 {item.phone})</p>
                <p><strong>Pickup Location:</strong> 📍 {item.location}</p>
              </div>

              <div className="donation-card-actions">
                <Link to={`/food/${item.id}`} className="action-pill-btn view-btn">
                  Details
                </Link>

                {item.status === "Accepted" && (
                  <button
                    type="button"
                    className="action-pill-btn"
                    style={{ background: "#fef3c7", color: "#92400e" }}
                    onClick={() => handleMarkPickedUp(item)}
                  >
                    🚚 Pick Up
                  </button>
                )}

                {item.status === "Picked Up" && (
                  <button
                    type="button"
                    className="action-pill-btn"
                    style={{ background: "#dcfce7", color: "#166534" }}
                    onClick={() => handleMarkDelivered(item)}
                  >
                    ✅ Complete Delivery
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
