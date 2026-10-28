import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  checkoutCart,
  resetOrderStatus
} from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Cart() {
  useDocumentTitle("Rescue Cart");

  const dispatch = useDispatch();
  const { items, status, error, lastOrder } = useSelector((state) => state.cart);
  const { currentUser, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const totalPortions = items.reduce((sum, item) => sum + (item.portions || 1), 0);

  function handleQuantityChange(id, currentPortions, delta) {
    const newPortions = currentPortions + delta;
    if (newPortions > 0) {
      dispatch(updateQuantity({ id, portions: newPortions }));
    }
  }

  function handleRemove(id, name) {
    dispatch(removeFromCart(id));
    showToast(`Removed "${name}" from cart`, "info");
  }

  function handleCheckout() {
    if (!isAuthenticated) {
      showToast("Please login first to confirm rescue claims", "error");
      return;
    }

    dispatch(
      checkoutCart({
        items,
        user: currentUser
      })
    );
  }

  // Success Confirmation State
  if (status === "succeeded" && lastOrder) {
    return (
      <main className="container page-wrapper" style={{ maxWidth: "680px" }}>
        <div style={{ background: "#ffffff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "40px", textAlign: "center", boxShadow: "var(--shadow-md)" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎉</div>
          <h2 style={{ fontSize: "28px", color: "var(--color-primary-dark)", marginBottom: "8px" }}>
            Rescue Claim Confirmed!
          </h2>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: "24px" }}>
            Thank you, <strong>{lastOrder.user?.name || "Rescue Partner"}</strong>. Your claim receipt has been generated.
          </p>

          <div style={{ background: "var(--color-bg)", padding: "20px", borderRadius: "var(--radius-md)", textAlign: "left", marginBottom: "28px", border: "1px solid var(--color-border)" }}>
            <p style={{ fontSize: "14px", marginBottom: "8px" }}>
              <strong>Receipt ID:</strong> <code>{lastOrder.orderId}</code>
            </p>
            <p style={{ fontSize: "14px", marginBottom: "8px" }}>
              <strong>Timestamp:</strong> {lastOrder.claimedAt}
            </p>
            <p style={{ fontSize: "14px", marginBottom: "8px" }}>
              <strong>Total Rescued Items:</strong> {lastOrder.totalItems} food donations
            </p>
            <p style={{ fontSize: "14px" }}>
              <strong>Assigned Rescuer:</strong> {lastOrder.user?.name} ({lastOrder.user?.role})
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              type="button"
              className="primary-button"
              onClick={() => dispatch(resetOrderStatus())}
            >
              Continue Browsing Food
            </button>
            <Link to="/deliveries" className="secondary-button" onClick={() => dispatch(resetOrderStatus())}>
              View in Deliveries →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container page-wrapper">
      <div className="page-header">
        <h1>🛒 Rescue Cart</h1>
        <p>
          Review surplus food items selected for rescue pickup and confirm distribution.
        </p>
      </div>

      {status === "failed" && error && (
        <div className="error-message" style={{ maxWidth: "780px", margin: "0 auto 24px" }}>
          ⚠️ Checkout Error: {error}
        </div>
      )}

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#ffffff", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛒</div>
          <h2>Your Rescue Cart is Empty</h2>
          <p style={{ color: "var(--color-text-secondary)", marginTop: "8px", marginBottom: "24px" }}>
            Explore available surplus food donations and add items to your rescue cart.
          </p>
          <Link to="/food" className="primary-button">
            🔍 Browse Available Food
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px", alignItems: "start" }}>
          {/* Cart Items List */}
          <div style={{ background: "#ffffff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid var(--color-border-light)" }}>
              <h3 style={{ fontSize: "18px" }}>Selected Donations ({items.length})</h3>
              <button
                type="button"
                onClick={() => {
                  dispatch(clearCart());
                  showToast("Cart cleared", "info");
                }}
                style={{ background: "none", border: "none", color: "var(--color-danger)", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
              >
                Clear Cart
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px",
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    gap: "16px",
                    flexWrap: "wrap"
                  }}
                >
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "700", background: "white", padding: "2px 8px", borderRadius: "999px", border: "1px solid var(--color-border)" }}>
                      {item.category}
                    </span>
                    <h4 style={{ fontSize: "16px", marginTop: "6px", marginBottom: "4px" }}>{item.foodName}</h4>
                    <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
                      📍 {item.location} • 👤 Donor: {item.donorName}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", background: "white" }}>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, item.portions, -1)}
                        disabled={item.portions <= 1}
                        style={{ padding: "4px 10px", background: "none", border: "none", cursor: "pointer", fontWeight: "700" }}
                        aria-label="Decrease portions"
                      >
                        −
                      </button>
                      <span style={{ padding: "4px 10px", fontWeight: "700", fontSize: "14px" }}>
                        {item.portions}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(item.id, item.portions, 1)}
                        style={{ padding: "4px 10px", background: "none", border: "none", cursor: "pointer", fontWeight: "700" }}
                        aria-label="Increase portions"
                      >
                        +
                      </button>
                    </div>

                    <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                      {item.unit}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id, item.foodName)}
                      style={{ background: "none", border: "none", color: "var(--color-danger)", cursor: "pointer", fontSize: "18px", marginLeft: "8px" }}
                      aria-label="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div style={{ background: "#ffffff", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "24px", position: "sticky", top: "100px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid var(--color-border-light)" }}>
              Rescue Summary
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>Total Food Items:</span>
                <strong>{items.length} listings</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>Total Portions / Units:</span>
                <strong>{totalPortions} portions</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>Distribution Cost:</span>
                <strong style={{ color: "var(--color-primary)" }}>₹0 (Free Rescue)</strong>
              </div>
            </div>

            <button
              type="button"
              className="primary-button"
              style={{ width: "100%", padding: "14px", fontSize: "16px" }}
              onClick={handleCheckout}
              disabled={status === "loading"}
            >
              {status === "loading" ? "⏳ Processing Claim..." : "🤝 Confirm Rescue Claim"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
