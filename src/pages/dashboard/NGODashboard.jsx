import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFood } from "../../context/FoodContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import DashboardCard from "../../components/DashboardCard";
import DonationStatusBadge from "../../components/DonationStatusBadge";
import DonationProgress from "../../components/common/DonationProgress";
import { formatDate } from "../../utils/donationHelpers";
import "../../styles/tracker.css";

export default function NGODashboard() {
  const { foods, claimFood, updateDonationStatus } = useFood();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [selectedId, setSelectedId] = useState(null);

  // All available donations (NGO can claim)
  const available = useMemo(
    () => foods.filter((f) => f.status === "Available"),
    [foods]
  );

  // Donations claimed by this NGO
  const myClaimed = useMemo(
    () => foods.filter((f) => f.recipientNGO === currentUser?.name),
    [foods, currentUser]
  );

  const incoming = useMemo(
    () => myClaimed.filter((f) => ["Accepted", "Pickup in Progress"].includes(f.status)),
    [myClaimed]
  );

  const accepted = useMemo(
    () => myClaimed.filter((f) => f.status === "Accepted"),
    [myClaimed]
  );

  const inDelivery = useMemo(
    () => myClaimed.filter((f) => ["Pickup in Progress", "Picked Up", "Delivered"].includes(f.status)),
    [myClaimed]
  );

  const completed = useMemo(
    () => myClaimed.filter((f) => f.status === "Completed"),
    [myClaimed]
  );

  function handleClaim(id) {
    claimFood(id, { name: currentUser?.name, role: "NGO" });
    showToast("Donation claimed! A volunteer will deliver it to you.", "success");
  }

  function handleMarkReceived(id) {
    updateDonationStatus(id, "Completed");
    showToast("Marked as received. Thank you!", "success");
  }

  return (
    <div className="dash-subpage">
      <div className="dash-subpage-header">
        <div>
          <h2>🤝 NGO Dashboard</h2>
          <p className="text-muted">Browse available donations and track incoming food deliveries.</p>
        </div>
        <Link to="/food" className="primary-button small-button">
          🔍 Browse Available Food
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="metrics-grid" style={{ marginBottom: "32px" }}>
        <DashboardCard icon="🍱" label="Available Donations" value={available.length} />
        <DashboardCard icon="📬" label="Incoming to My NGO" value={incoming.length} highlight="highlight-blue" />
        <DashboardCard icon="✅" label="My Accepted Claims" value={accepted.length} highlight="highlight-amber" />
        <DashboardCard icon="🚚" label="In Delivery" value={inDelivery.length} highlight="highlight-purple" />
        <DashboardCard icon="🏆" label="Completed Deliveries" value={completed.length} highlight="highlight-green" />
      </div>

      {/* Available Food to Claim */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h3>📋 Available Donations to Claim</h3>
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
                  <p style={{ marginTop: "4px", fontSize: "13px" }}>
                    Pickup by: <strong>{formatDate(food.expiry)}</strong>
                  </p>
                </div>
                <div className="avail-actions">
                  <DonationStatusBadge status={food.status} />
                  <button
                    type="button"
                    className="primary-button small-button"
                    onClick={() => handleClaim(food.id)}
                  >
                    Claim
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
                    <p style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
                      {food.description}
                    </p>
                    <p style={{ fontSize: "13px", marginTop: "8px" }}>
                      <strong>Donor:</strong> {food.donorName} · <strong>Phone:</strong> {food.phone}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Incoming / In-Transit Donations */}
      {myClaimed.filter((f) => !["Completed", "Cancelled"].includes(f.status)).length > 0 && (
        <div className="dash-section" style={{ marginTop: "32px" }}>
          <div className="dash-section-header">
            <h3>🚚 My Incoming Donations</h3>
          </div>
          <div className="donation-timeline">
            {myClaimed
              .filter((f) => !["Completed", "Cancelled"].includes(f.status))
              .map((food) => (
                <div key={food.id} className="timeline-item">
                  <div className="timeline-item-header">
                    <h4>{food.foodName}</h4>
                    <DonationStatusBadge status={food.status} />
                  </div>
                  <div className="timeline-meta">
                    <span>📦 {food.quantity} {food.unit}</span>
                    <span>📍 From: {food.location}</span>
                    <span>🚗 Volunteer: {food.assignedVolunteer || "—"}</span>
                  </div>
                  <DonationProgress status={food.status} />
                  {food.status === "Delivered" && (
                    <div className="lifecycle-actions" style={{ marginTop: "12px" }}>
                      <button
                        type="button"
                        className="lifecycle-btn lifecycle-btn-primary"
                        onClick={() => handleMarkReceived(food.id)}
                      >
                        ✔ Mark as Received
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Donation History */}
      {completed.length > 0 && (
        <div className="dash-section" style={{ marginTop: "32px" }}>
          <div className="dash-section-header">
            <h3>🏆 Donation History (Completed)</h3>
          </div>
          <div className="donation-timeline">
            {completed.map((food) => (
              <div key={food.id} className="timeline-item">
                <div className="timeline-item-header">
                  <h4>{food.foodName}</h4>
                  <DonationStatusBadge status={food.status} />
                </div>
                <div className="timeline-meta">
                  <span>📦 {food.quantity} {food.unit}</span>
                  <span>📍 {food.location}</span>
                  <span>🚗 {food.assignedVolunteer || "—"}</span>
                  <span>📅 {formatDate(food.claimedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
