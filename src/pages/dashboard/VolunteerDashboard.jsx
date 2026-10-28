import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFood } from "../../context/FoodContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import DashboardCard from "../../components/DashboardCard";
import DonationStatusBadge from "../../components/DonationStatusBadge";
import DonationProgress from "../../components/common/DonationProgress";
import { isUrgent, isExpired, formatDate, getAvailableActions, ACTION_LABELS } from "../../utils/donationHelpers";
import "../../styles/tracker.css";

export default function VolunteerDashboard() {
  const { foods, acceptDonation, updateDonationStatus } = useFood();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [selectedId, setSelectedId] = useState(null);

  // Donations assigned to this volunteer
  const myPickups = useMemo(
    () => foods.filter((f) => f.assignedVolunteer === currentUser?.name),
    [foods, currentUser]
  );

  // Donations available to accept (not yet claimed)
  const available = useMemo(
    () => foods.filter((f) => f.status === "Available" && !f.assignedVolunteer),
    [foods]
  );

  const urgent = useMemo(
    () => available.filter((f) => isUrgent(f)),
    [available]
  );

  const accepted = useMemo(
    () => myPickups.filter((f) => f.status === "Accepted"),
    [myPickups]
  );

  const inProgress = useMemo(
    () => myPickups.filter((f) => f.status === "Pickup in Progress"),
    [myPickups]
  );

  const completedDeliveries = useMemo(
    () => myPickups.filter((f) => ["Delivered", "Completed"].includes(f.status)),
    [myPickups]
  );

  function handleAccept(id) {
    acceptDonation(id, currentUser?.name);
    showToast("You accepted this donation! Head to pick it up.", "success");
  }

  function handleStatusUpdate(id, currentStatus) {
    const actions = getAvailableActions(currentStatus);
    // Advance to the next logical positive status (first action that isn't Cancel/Return)
    const nextAction = actions.find((a) => a !== "Cancelled" && a !== "Available");
    if (nextAction) {
      updateDonationStatus(id, nextAction);
      showToast(`Status updated to: ${nextAction}`, "success");
    }
  }

  const selectedDonation = foods.find((f) => f.id === selectedId);

  return (
    <div className="dash-subpage">
      <div className="dash-subpage-header">
        <div>
          <h2>🚗 Volunteer Dashboard</h2>
          <p className="text-muted">Accept available donations and manage your delivery pipeline.</p>
        </div>
        <Link to="/food" className="primary-button small-button">
          🔍 Browse Food
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="metrics-grid" style={{ marginBottom: "32px" }}>
        <DashboardCard icon="📦" label="Available Donations" value={available.length} />
        <DashboardCard icon="⚠️" label="Urgent (Under 2h)" value={urgent.length} highlight="highlight-amber" />
        <DashboardCard icon="✅" label="My Accepted Pickups" value={accepted.length} highlight="highlight-blue" />
        <DashboardCard icon="🚗" label="Pickup in Progress" value={inProgress.length} highlight="highlight-purple" />
        <DashboardCard icon="🏆" label="Completed Deliveries" value={completedDeliveries.length} highlight="highlight-green" />
      </div>

      {/* Available Donations to Accept */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h3>📋 Available Donations</h3>
        </div>

        {available.length === 0 ? (
          <div className="empty-state-box">
            <p>No available donations right now. Check back soon!</p>
          </div>
        ) : (
          <div className="available-donation-list">
            {available.map((food) => (
              <div key={food.id} className="avail-donation-row">
                <div className="avail-food-info">
                  <h4>{food.foodName}</h4>
                  <p>
                    {food.quantity} {food.unit} · {food.category} · 📍 {food.location}
                  </p>
                  <p style={{ marginTop: "4px" }}>
                    Pickup by: <strong>{formatDate(food.expiry)}</strong>
                    {isExpired(food) && <span className="expired-banner" style={{ marginLeft: "8px" }}>Expired</span>}
                    {isUrgent(food) && <span className="urgent-banner" style={{ marginLeft: "8px" }}>⚠️ Urgent</span>}
                  </p>
                </div>
                <div className="avail-actions">
                  <DonationStatusBadge status={food.status} />
                  <button
                    type="button"
                    className="primary-button small-button"
                    onClick={() => handleAccept(food.id)}
                    disabled={isExpired(food)}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="secondary-button small-button"
                    onClick={() => setSelectedId(food.id === selectedId ? null : food.id)}
                  >
                    {food.id === selectedId ? "Hide" : "Details"}
                  </button>
                </div>

                {selectedId === food.id && (
                  <div style={{ width: "100%", marginTop: "12px", borderTop: "1px solid var(--color-border)", paddingTop: "12px" }}>
                    <DonationProgress status={food.status} />
                    <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "8px" }}>
                      {food.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Active Pickups */}
      <div className="dash-section" style={{ marginTop: "32px" }}>
        <div className="dash-section-header">
          <h3>🚗 My Active Pickups</h3>
        </div>

        {myPickups.filter((f) => !["Delivered", "Completed", "Cancelled"].includes(f.status)).length === 0 ? (
          <div className="empty-state-box">
            <p>No active pickups. Accept a donation above to get started.</p>
          </div>
        ) : (
          <div className="donation-timeline">
            {myPickups
              .filter((f) => !["Delivered", "Completed", "Cancelled"].includes(f.status))
              .map((food) => (
                <div key={food.id} className="timeline-item">
                  <div className="timeline-item-header">
                    <h4>{food.foodName}</h4>
                    <DonationStatusBadge status={food.status} />
                  </div>
                  <div className="timeline-meta">
                    <span>📦 {food.quantity} {food.unit}</span>
                    <span>📍 {food.location}</span>
                    <span>🏢 NGO: {food.recipientNGO || "—"}</span>
                    <span>⏰ Deadline: {formatDate(food.expiry)}</span>
                  </div>
                  <DonationProgress status={food.status} />
                  <div className="lifecycle-actions" style={{ marginTop: "12px" }}>
                    <button
                      type="button"
                      className="lifecycle-btn lifecycle-btn-primary"
                      onClick={() => handleStatusUpdate(food.id, food.status)}
                    >
                      {getAvailableActions(food.status).find((a) => a !== "Cancelled" && a !== "Available")
                        ? `→ ${getAvailableActions(food.status).find((a) => a !== "Cancelled" && a !== "Available")}`
                        : "No action"}
                    </button>
                    <button
                      type="button"
                      className="lifecycle-btn lifecycle-btn-danger"
                      onClick={() => {
                        updateDonationStatus(food.id, "Cancelled");
                        showToast("Pickup cancelled.", "error");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Completed Deliveries */}
      {completedDeliveries.length > 0 && (
        <div className="dash-section" style={{ marginTop: "32px" }}>
          <div className="dash-section-header">
            <h3>🏆 Completed Deliveries</h3>
          </div>
          <div className="donation-timeline">
            {completedDeliveries.map((food) => (
              <div key={food.id} className="timeline-item">
                <div className="timeline-item-header">
                  <h4>{food.foodName}</h4>
                  <DonationStatusBadge status={food.status} />
                </div>
                <div className="timeline-meta">
                  <span>📦 {food.quantity} {food.unit}</span>
                  <span>📍 {food.location}</span>
                  <span>🏢 NGO: {food.recipientNGO || "—"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
