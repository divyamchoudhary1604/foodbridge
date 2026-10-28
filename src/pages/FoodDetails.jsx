import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/common/Modal";
import Counter from "../components/common/Counter";
import { useFood } from "../context/FoodContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "../styles/food.css";

function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { foods, updateFood } = useFood();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const food = foods.find((item) => item.id === Number(id));

  // Local state for claim modal & portion count
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portionCount, setPortionCount] = useState(1);

  if (!food) {
    return (
      <main className="food-details-page">
        <div className="food-details-container">
          <h2>😕 Donation Not Found</h2>
          <p>Sorry, this donation does not exist or has been removed.</p>
          <button
            className="food-details-back"
            onClick={() => navigate("/food")}
          >
            ← Back to Food List
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

  function handleConfirmAccept() {
    const updatedFood = {
      ...food,
      status: "Accepted",
      claimedBy: currentUser?.name || "Verified NGO Volunteer",
      claimedPortions: portionCount
    };

    updateFood(updatedFood);
    setIsModalOpen(false);
    showToast(`Successfully claimed ${portionCount} ${food.unit} of "${food.foodName}"! 🎉`, "success");
  }

  return (
    <main className="food-details-page">
      <div className="food-details-container">
        <button
          className="food-details-back"
          onClick={() => navigate("/food")}
        >
          ← Back to Food List
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
                <span className="food-detail-label">Available Quantity</span>
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
                <span className="food-detail-label">Contact Phone</span>
                <span className="food-detail-value">
                  📞 {food.phone}
                </span>
              </div>

              <div className="food-detail-item">
                <span className="food-detail-label">Expiry Date</span>
                <span className="food-detail-value">
                  ⏰ {expiry}
                </span>
              </div>

              <div className="food-detail-item">
                <span className="food-detail-label">Current Status</span>
                <span className="food-detail-value">
                  <StatusBadge status={food.status} />
                </span>
              </div>
            </div>

            {food.description && (
              <div className="food-details-description">
                <h3>Description & Pickup Notes</h3>
                <p>{food.description}</p>
              </div>
            )}

            {food.status === "Available" && (
              <>
                {(!currentUser || currentUser.role === "NGO" || currentUser.role === "Admin") ? (
                  <div style={{ marginTop: "24px", padding: "16px", background: "var(--color-bg)", borderRadius: "var(--radius-md)" }}>
                    <p style={{ fontWeight: "600", marginBottom: "8px" }}>
                      Select portions to rescue:
                    </p>
                    <Counter
                      value={portionCount}
                      onChange={setPortionCount}
                      min={1}
                      max={Number(food.quantity) || 100}
                      unit={food.unit}
                    />
                  </div>
                ) : (
                  <div style={{ marginTop: "24px", padding: "14px 18px", background: "#f8fafc", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", fontSize: "14px" }}>
                    {currentUser.role === "Donor" && (
                      <p>
                        ℹ️ <strong>Signed in as Donor:</strong> Donors post surplus food. Only verified <strong>NGOs</strong> or <strong>Admins</strong> can claim food for distribution.
                      </p>
                    )}
                    {currentUser.role === "Volunteer" && (
                      <p>
                        🚴 <strong>Signed in as Volunteer:</strong> Volunteers coordinate pickups once an NGO has claimed the food. Check the <strong>Deliveries Hub</strong> for items in transit!
                      </p>
                    )}
                  </div>
                )}
              </>
            )}

            <div className="food-details-actions">
              <button
                className="secondary-button"
                onClick={() => navigate("/food")}
              >
                ← Back
              </button>

              {food.status === "Available" ? (
                (!currentUser || currentUser.role === "NGO" || currentUser.role === "Admin") ? (
                  <>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => {
                        dispatch(addToCart({ ...food, portions: portionCount }));
                        showToast(`Added ${portionCount} ${food.unit} to Rescue Cart 🛒`, "success");
                      }}
                    >
                      🛒 Add to Cart
                    </button>

                    <button
                      className="primary-button"
                      onClick={() => {
                        if (!currentUser) {
                          navigate("/login", { state: { from: { pathname: `/food/${food.id}` } } });
                        } else {
                          setIsModalOpen(true);
                        }
                      }}
                    >
                      ✅ Claim Directly
                    </button>
                  </>
                ) : (
                  <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
                    (Claiming restricted to NGO role)
                  </span>
                )
              ) : (
                <div style={{ color: "var(--color-text-muted)", fontSize: "14px", fontStyle: "italic" }}>
                  ℹ️ This item has already been {food.status.toLowerCase()}.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="🤝 Confirm Food Rescue"
        footer={
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              className="secondary-button small-button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="primary-button small-button"
              onClick={handleConfirmAccept}
            >
              Confirm & Claim
            </button>
          </div>
        }
      >
        <p style={{ marginBottom: "12px" }}>
          You are claiming <strong>{portionCount} {food.unit}</strong> of <strong>{food.foodName}</strong> from <strong>{food.donorName}</strong>.
        </p>
        <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
          📍 Pickup Location: {food.location}<br />
          📞 Donor Contact: {food.phone}
        </p>
      </Modal>
    </main>
  );
}

export default FoodDetails;