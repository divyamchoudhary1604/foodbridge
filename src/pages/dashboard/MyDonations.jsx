import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFood } from "../../context/FoodContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import DashboardCard from "../../components/DashboardCard";
import DonationStatusBadge from "../../components/DonationStatusBadge";
import DonationProgress from "../../components/common/DonationProgress";
import Modal from "../../components/common/Modal";
import InputField from "../../components/common/InputField";
import SelectField from "../../components/common/SelectField";
import { formatDate, isExpired, isUrgent } from "../../utils/donationHelpers";

export default function MyDonations() {
  const { foods, updateFood, deleteFood, updateDonationStatus } = useFood();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  // All items shown to this donor (show all if no personal match)
  const myDonations = useMemo(() => {
    const personal = foods.filter(
      (item) =>
        item.donorEmail === currentUser?.email ||
        item.donorName?.toLowerCase().includes(currentUser?.name?.toLowerCase() || "")
    );
    return personal.length > 0 ? personal : foods;
  }, [foods, currentUser]);

  const totalDonations = myDonations.length;
  const activeDonations = useMemo(
    () => myDonations.filter((f) => ["Available", "Accepted"].includes(f.status)).length,
    [myDonations]
  );
  const pendingPickups = useMemo(
    () => myDonations.filter((f) => ["Accepted", "Pickup in Progress"].includes(f.status)).length,
    [myDonations]
  );
  const completedDonations = useMemo(
    () => myDonations.filter((f) => f.status === "Completed").length,
    [myDonations]
  );

  // Tab state
  const [activeTab, setActiveTab] = useState("active");

  const displayItems = useMemo(() => {
    if (activeTab === "active") {
      return myDonations.filter((f) => !["Completed", "Cancelled"].includes(f.status));
    }
    if (activeTab === "completed") {
      return myDonations.filter((f) => f.status === "Completed");
    }
    if (activeTab === "cancelled") {
      return myDonations.filter((f) => f.status === "Cancelled");
    }
    return myDonations;
  }, [myDonations, activeTab]);

  // Edit Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    foodName: "",
    category: "",
    quantity: "",
    unit: "",
    location: "",
  });

  // Delete Modal State
  const [deletingId, setDeletingId] = useState(null);

  // Expanded progress tracker
  const [expandedId, setExpandedId] = useState(null);

  function handleOpenEdit(item) {
    setEditingItem(item);
    setEditFormData({
      foodName: item.foodName,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      location: item.location,
    });
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    if (!editFormData.foodName || !editFormData.quantity) {
      showToast("Please fill in required fields", "error");
      return;
    }
    updateFood({ ...editingItem, ...editFormData, quantity: Number(editFormData.quantity) });
    showToast("Donation updated!", "success");
    setEditingItem(null);
  }

  function handleConfirmDelete() {
    if (deletingId) {
      deleteFood(deletingId);
      showToast("Donation deleted.", "info");
      setDeletingId(null);
    }
  }

  const CATEGORIES = ["Meals", "Bakery", "Fruits", "Packaged Food", "Dairy", "Vegetables", "Beverages", "Other"];

  return (
    <div className="dash-subpage">
      <div className="dash-subpage-header">
        <div>
          <h2>🍲 Donor Dashboard</h2>
          <p className="text-muted">Track your donations through the full rescue lifecycle.</p>
        </div>
        <Link to="/donate" className="primary-button small-button">
          + New Donation
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="metrics-grid" style={{ marginBottom: "28px" }}>
        <DashboardCard icon="🍱" label="Total Donations" value={totalDonations} />
        <DashboardCard icon="🟢" label="Active Donations" value={activeDonations} highlight="highlight-green" />
        <DashboardCard icon="🕐" label="Pending Pickups" value={pendingPickups} highlight="highlight-amber" />
        <DashboardCard icon="✨" label="Completed" value={completedDonations} highlight="highlight-purple" />
      </div>

      {/* Tabs */}
      <div className="tabs-container" style={{ marginBottom: "20px" }}>
        {[
          { key: "active", label: "Active", count: myDonations.filter((f) => !["Completed", "Cancelled"].includes(f.status)).length },
          { key: "completed", label: "Completed", count: completedDonations },
          { key: "cancelled", label: "Cancelled", count: myDonations.filter((f) => f.status === "Cancelled").length },
          { key: "all", label: "All", count: myDonations.length },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`tab-button ${activeTab === tab.key ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span className={`tab-count-badge ${activeTab === tab.key ? "badge-active" : ""}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {displayItems.length === 0 ? (
        <div className="empty-state-box">
          <p>No donations in this category yet.</p>
          <Link to="/donate" className="primary-button small-button" style={{ marginTop: "12px" }}>
            Create your first donation
          </Link>
        </div>
      ) : (
        <div className="donation-timeline">
          {displayItems.map((item) => (
            <div key={item.id} className="timeline-item">
              <div className="timeline-item-header">
                <div>
                  <h4>{item.foodName}</h4>
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                    {item.category} · Posted {formatDate(item.createdAt)}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                  {isExpired(item) && item.status === "Available" && (
                    <span className="expired-banner">Expired</span>
                  )}
                  {isUrgent(item) && <span className="urgent-banner">⚠️ Urgent</span>}
                  <DonationStatusBadge status={item.status} />
                </div>
              </div>

              <div className="timeline-meta">
                <span>📦 {item.quantity} {item.unit}</span>
                <span>📍 {item.location}</span>
                {item.assignedVolunteer && <span>🚗 Volunteer: {item.assignedVolunteer}</span>}
                {item.recipientNGO && <span>🏢 NGO: {item.recipientNGO}</span>}
                <span>⏰ Deadline: {formatDate(item.expiry)}</span>
              </div>

              {/* Expandable Progress Tracker */}
              <button
                type="button"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-primary)",
                  fontWeight: "600",
                  fontSize: "13px",
                  cursor: "pointer",
                  padding: "4px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {expandedId === item.id ? "▲ Hide Progress" : "▼ View Progress"}
              </button>

              {expandedId === item.id && (
                <div style={{ marginTop: "8px" }}>
                  <DonationProgress status={item.status} />
                </div>
              )}

              {/* Actions */}
              {!["Completed", "Cancelled"].includes(item.status) && (
                <div className="donation-card-actions" style={{ marginTop: "12px" }}>
                  <button
                    type="button"
                    className="action-pill-btn edit-btn"
                    onClick={() => handleOpenEdit(item)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    type="button"
                    className="action-pill-btn delete-btn"
                    onClick={() => setDeletingId(item.id)}
                  >
                    🗑️ Delete
                  </button>
                  {item.status === "Available" && (
                    <button
                      type="button"
                      className="action-pill-btn"
                      style={{ background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" }}
                      onClick={() => {
                        updateDonationStatus(item.id, "Cancelled");
                        showToast("Donation cancelled.", "info");
                      }}
                    >
                      ✕ Cancel
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        title="✏️ Edit Food Donation"
        footer={
          <div className="modal-actions-right">
            <button type="button" className="secondary-button small-button" onClick={() => setEditingItem(null)}>
              Cancel
            </button>
            <button type="button" className="primary-button small-button" onClick={handleSaveEdit}>
              Save Changes
            </button>
          </div>
        }
      >
        <form onSubmit={handleSaveEdit}>
          <InputField
            label="Food Name"
            name="foodName"
            value={editFormData.foodName}
            onChange={(e) => setEditFormData({ ...editFormData, foodName: e.target.value })}
            required
          />
          <SelectField
            label="Category"
            name="category"
            value={editFormData.category}
            onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
            options={CATEGORIES}
            required
          />
          <InputField
            label="Quantity"
            name="quantity"
            type="number"
            value={editFormData.quantity}
            onChange={(e) => setEditFormData({ ...editFormData, quantity: e.target.value })}
            required
          />
          <InputField
            label="Unit"
            name="unit"
            value={editFormData.unit}
            onChange={(e) => setEditFormData({ ...editFormData, unit: e.target.value })}
            required
          />
          <InputField
            label="Location"
            name="location"
            value={editFormData.location}
            onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
            required
          />
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deletingId)}
        onClose={() => setDeletingId(null)}
        title="⚠️ Confirm Deletion"
        footer={
          <div className="modal-actions-right">
            <button type="button" className="secondary-button small-button" onClick={() => setDeletingId(null)}>
              Cancel
            </button>
            <button type="button" className="danger-button small-button" onClick={handleConfirmDelete}>
              Yes, Delete
            </button>
          </div>
        }
      >
        <p>Are you sure you want to delete this food listing? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
