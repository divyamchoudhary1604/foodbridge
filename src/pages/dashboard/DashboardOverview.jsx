import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useFood } from "../../context/FoodContext";
import { useAuth } from "../../context/AuthContext";
import DashboardCard from "../../components/DashboardCard";
import DonationStatusBadge from "../../components/DonationStatusBadge";
import { formatShortDate } from "../../utils/donationHelpers";

export default function DashboardOverview() {
  const { stats, foods } = useFood();
  const { currentUser, isDonor, isNGO, isVolunteer, isAdmin } = useAuth();

  const recentItems = useMemo(() => [...foods].slice(0, 5), [foods]);

  // Role-based quick action links
  const quickActions = useMemo(() => {
    if (isDonor) return [
      { to: "/donate", label: "+ New Donation", className: "primary-button small-button" },
      { to: "/dashboard/my-donations", label: "My Donor Dashboard", className: "secondary-button small-button" },
    ];
    if (isVolunteer) return [
      { to: "/dashboard/volunteer", label: "Volunteer Dashboard", className: "primary-button small-button" },
      { to: "/food", label: "Browse Available Food", className: "secondary-button small-button" },
    ];
    if (isNGO) return [
      { to: "/dashboard/ngo", label: "NGO Dashboard", className: "primary-button small-button" },
      { to: "/food", label: "Browse Donations", className: "secondary-button small-button" },
    ];
    // Admin
    return [
      { to: "/donate", label: "+ New Donation", className: "primary-button small-button" },
      { to: "/food", label: "Browse Food", className: "secondary-button small-button" },
    ];
  }, [isDonor, isNGO, isVolunteer, isAdmin]);

  return (
    <div className="dashboard-overview">
      <div className="dash-header">
        <div>
          <h2>Welcome back, {currentUser?.name}! 👋</h2>
          <p className="text-muted">
            You are logged in as <strong>{currentUser?.role}</strong>. Here is a live summary of FoodBridge activity.
          </p>
        </div>

        <div className="dash-header-actions">
          {quickActions.map((action) => (
            <Link key={action.to} to={action.to} className={action.className}>
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Platform-wide Metric Cards */}
      <div className="metrics-grid">
        <DashboardCard icon="🍱" label="Total Listings" value={stats.totalCount} />
        <DashboardCard icon="🟢" label="Available for Rescue" value={stats.availableCount} highlight="highlight-green" />
        <DashboardCard icon="🤝" label="Accepted / Claimed" value={stats.acceptedCount} highlight="highlight-amber" />
        <DashboardCard icon="🚚" label="In Transit" value={stats.inTransitCount} highlight="highlight-blue" />
        <DashboardCard icon="✅" label="Completed" value={stats.completedCount} highlight="highlight-purple" />
        <DashboardCard icon="🍽️" label="Portions Rescued" value={`${stats.mealPortionsRescued}`} highlight="highlight-green"
          sublabel="(completed only)" />
      </div>

      {/* Role-based shortcut banner */}
      <div style={{
        margin: "24px 0",
        padding: "16px 20px",
        background: "var(--color-primary-soft)",
        border: "1px solid var(--color-primary-light)",
        borderRadius: "var(--radius-md)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <div>
          <strong style={{ fontSize: "15px" }}>
            {isDonor && "🍲 You are a Donor — post surplus food and track your donations."}
            {isVolunteer && "🚗 You are a Volunteer — accept donations and manage deliveries."}
            {isNGO && "🤝 You are an NGO — claim available food for your community."}
            {isAdmin && "👑 You are an Admin — full access to all platform features."}
          </strong>
        </div>
        <Link
          to={isDonor ? "/dashboard/my-donations" : isVolunteer ? "/dashboard/volunteer" : isNGO ? "/dashboard/ngo" : "/dashboard/impact"}
          className="primary-button small-button"
        >
          Go to My Dashboard →
        </Link>
      </div>

      {/* Recent Activity Table */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h3>🕒 Recent Food Listings</h3>
          <Link to="/food" className="view-all-link">
            View All ({foods.length}) →
          </Link>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Status</th>
                <th>Posted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentItems.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.foodName}</strong></td>
                  <td>{item.category}</td>
                  <td>{item.quantity} {item.unit}</td>
                  <td>📍 {item.location}</td>
                  <td><DonationStatusBadge status={item.status} size="small" /></td>
                  <td>{formatShortDate(item.createdAt)}</td>
                  <td>
                    <Link to={`/food/${item.id}`} className="table-action-link">
                      Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Navigation to Impact Dashboard */}
      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <Link to="/dashboard/impact" className="secondary-button small-button">
          📈 View Full Impact Dashboard →
        </Link>
      </div>
    </div>
  );
}
