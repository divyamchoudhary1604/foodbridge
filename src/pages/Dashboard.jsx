import { useState, useEffect, useCallback } from "react";
import StatusBadge from "../components/StatusBadge";
import EditDonationModal from "../components/EditDonationModal";
import "../styles/dashboard.css";

/**
 * Dashboard Page
 *
 * Shows different content based on the logged-in user's role:
 * - Donor sees "My Donations"
 * - NGO sees "Available Donations"
 * - Volunteer sees "Assigned Pickups"
 * - Admin sees all donations
 *
 * Features:
 * - Summary cards (Total, Available, Accepted, Completed)
 * - Animated counter for "Meals Rescued Today"
 * - Food Rescue Journey progress indicator
 * - Donation management table with Edit and Delete
 *
 * Props:
 * - foods: array of all food donations
 * - currentUser: the logged-in user object
 * - onDeleteFood: function to delete a donation by id
 * - onUpdateFood: function to update a donation
 */
function Dashboard({ foods, currentUser, onDeleteFood, onUpdateFood }) {
  // State for the animated counter
  const [rescueCount, setRescueCount] = useState(0);

  // State to track which donation is being edited (null = no modal)
  const [editingDonation, setEditingDonation] = useState(null);

  // Target number for the animated counter
  const targetCount = 12;

  /**
   * Animated counter using useEffect and setInterval
   * Counts from 0 up to targetCount over ~1.5 seconds
   */
  useEffect(() => {
    // Don't start if already at target
    if (rescueCount >= targetCount) {
      return;
    }

    // Set an interval that increments the counter every 120ms
    const intervalId = setInterval(() => {
      setRescueCount((previousCount) => {
        // Stop counting when we reach the target
        if (previousCount >= targetCount) {
          clearInterval(intervalId);
          return targetCount;
        }
        return previousCount + 1;
      });
    }, 120);

    // Cleanup: clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array = runs once on mount

  // Calculate summary statistics
  const totalDonations = foods.length;
  const availableCount = foods.filter((food) => food.status === "Available").length;
  const acceptedCount = foods.filter((food) => food.status === "Accepted").length;
  const completedCount = foods.filter((food) => food.status === "Completed").length;

  /**
   * handleDelete – removes a donation by id
   * Uses useCallback so the function reference stays stable
   */
  const handleDelete = useCallback(
    (id) => {
      // Confirm before deleting
      const confirmed = window.confirm(
        "Are you sure you want to delete this donation?"
      );
      if (confirmed) {
        onDeleteFood(id);
      }
    },
    [onDeleteFood]
  );

  // Open the edit modal for a specific donation
  function handleEditClick(donation) {
    setEditingDonation(donation);
  }

  // Save the edited donation and close the modal
  function handleSaveEdit(updatedDonation) {
    onUpdateFood(updatedDonation);
    setEditingDonation(null);
  }

  // Close the edit modal without saving
  function handleCloseModal() {
    setEditingDonation(null);
  }

  // Determine which label to show based on role
  function getSectionTitle() {
    if (currentUser.role === "Donor") {
      return "My Donations";
    } else if (currentUser.role === "NGO") {
      return "Available Donations";
    } else if (currentUser.role === "Volunteer") {
      return "Assigned Pickups";
    } else {
      return "All Donations";
    }
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        {/* ========== Welcome Banner ========== */}
        <div className="dashboard-welcome">
          <h1>Welcome, {currentUser.name}! 👋</h1>
          <p>Here is your FoodBridge activity overview</p>
          <span className="dashboard-role-badge">{currentUser.role}</span>
        </div>

        {/* ========== Summary Cards ========== */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-card-icon">📊</div>
            <div className="summary-card-number">{totalDonations}</div>
            <div className="summary-card-label">Total Donations</div>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">✅</div>
            <div className="summary-card-number">{availableCount}</div>
            <div className="summary-card-label">Available</div>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">🤝</div>
            <div className="summary-card-number">{acceptedCount}</div>
            <div className="summary-card-label">Accepted</div>
          </div>
          <div className="summary-card">
            <div className="summary-card-icon">🎉</div>
            <div className="summary-card-number">{completedCount}</div>
            <div className="summary-card-label">Completed</div>
          </div>
        </div>

        {/* ========== Food Rescue Journey Animation ========== */}
        <div className="rescue-journey">
          <h3>🚀 Food Rescue Journey</h3>
          <div className="journey-steps">
            <div className="journey-step journey-completed">
              <span className="journey-step-icon">📝</span>
              <span className="journey-step-label">Posted</span>
            </div>
            <span className="journey-arrow">→</span>
            <div className="journey-step journey-completed">
              <span className="journey-step-icon">✅</span>
              <span className="journey-step-label">Accepted</span>
            </div>
            <span className="journey-arrow">→</span>
            <div className="journey-step journey-active">
              <span className="journey-step-icon">🚴</span>
              <span className="journey-step-label">Picked Up</span>
            </div>
            <span className="journey-arrow">→</span>
            <div className="journey-step">
              <span className="journey-step-icon">🏢</span>
              <span className="journey-step-label">Delivered</span>
            </div>
          </div>

          {/* Animated counter – counts up to show rescued meals */}
          <div className="rescue-counter">
            <div className="rescue-counter-number">{rescueCount}</div>
            <div className="rescue-counter-label">Meals Rescued Today 🎉</div>
          </div>
        </div>

        {/* ========== Donation Management Table ========== */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h2>{getSectionTitle()}</h2>
          </div>

          {foods.length > 0 ? (
            <div className="donation-table-wrapper">
              <table className="donation-table">
                <thead>
                  <tr>
                    <th>Food</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((food) => (
                    <tr key={food.id}>
                      <td>{food.foodName}</td>
                      <td>
                        {food.quantity} {food.unit}
                      </td>
                      <td>{food.location}</td>
                      <td>
                        <StatusBadge status={food.status} />
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="edit-button"
                            onClick={() => handleEditClick(food)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(food.id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="dashboard-empty">
              <div className="dashboard-empty-icon">📭</div>
              <h3>No donations yet</h3>
              <p>Start by posting your first food donation!</p>
            </div>
          )}
        </div>
      </div>

      {/* ========== Edit Modal ========== */}
      {/* Only shown when editingDonation is not null */}
      {editingDonation && (
        <EditDonationModal
          donation={editingDonation}
          onSave={handleSaveEdit}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}

export default Dashboard;
