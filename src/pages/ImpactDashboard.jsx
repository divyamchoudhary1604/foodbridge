import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useFood } from "../context/FoodContext";
import DashboardCard from "../components/DashboardCard";
import DonationStatusBadge from "../components/DonationStatusBadge";
import { calculateImpact, STATUS_COLORS, formatShortDate } from "../utils/donationHelpers";
import "../styles/tracker.css";

/**
 * ImpactDashboard – calculates FoodBridge platform impact from real donation records.
 * All metrics are derived live from the foods array using filter/reduce/map.
 * No fabricated statistics — only completed donations count as rescued food.
 */
export default function ImpactDashboard() {
  const { foods } = useFood();

  // useMemo prevents recalculating on every render
  const impact = useMemo(() => calculateImpact(foods), [foods]);

  if (foods.length === 0) {
    return (
      <div className="dash-subpage">
        <div className="dash-subpage-header">
          <h2>📈 Impact Dashboard</h2>
        </div>
        <div className="empty-impact-state">
          <div className="empty-icon">📊</div>
          <h3>No donation data yet</h3>
          <p>Create your first donation to start tracking FoodBridge's impact.</p>
          <Link to="/donate" className="primary-button small-button" style={{ marginTop: "16px" }}>
            Create a Donation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-subpage">
      <div className="dash-subpage-header">
        <div>
          <h2>📈 Impact Dashboard</h2>
          <p className="text-muted">Live metrics calculated from all donation records in this session.</p>
        </div>
        <Link to="/donate" className="primary-button small-button">
          + Add Donation
        </Link>
      </div>

      {/* Data source notice */}
      <div className="impact-disclaimer">
        ℹ️ All numbers below are calculated live from <strong>{foods.length} real donation records</strong> stored in
        this app. Only <strong>completed</strong> donations count toward rescued meal portions.
      </div>

      {/* Top Metric Cards */}
      <div className="metrics-grid" style={{ marginBottom: "36px" }}>
        <DashboardCard icon="🍱" label="Total Donations Created" value={impact.total} />
        <DashboardCard icon="✅" label="Completed Donations" value={impact.completed} highlight="highlight-green" />
        <DashboardCard icon="🍽️" label="Meal Portions Rescued" value={impact.mealPortionsRescued} highlight="highlight-purple"
          sublabel="(from completed only)" />
        <DashboardCard icon="🕐" label="Pending Pickups" value={impact.accepted} highlight="highlight-amber" />
        <DashboardCard icon="🚀" label="Active Donations" value={impact.active} highlight="highlight-blue" />
        <DashboardCard
          icon="📊"
          label="Completion Rate"
          value={`${impact.completionRate}%`}
          highlight={impact.completionRate >= 50 ? "highlight-green" : "highlight-amber"}
          sublabel={`${impact.completed} of ${impact.total} completed`}
        />
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Donation Status Distribution */}
        <div className="chart-card">
          <h3>📊 Donation Status Distribution</h3>
          {impact.statusDistribution.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)", fontSize: "14px" }}>No data</p>
          ) : (
            <div className="bar-chart">
              {impact.statusDistribution.map(({ status, count, percentage }) => (
                <div key={status} className="bar-row">
                  <span className="bar-label" title={status}>{status}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${Math.max(percentage, 3)}%`,
                        background: STATUS_COLORS[status]?.color || "var(--color-primary)",
                        opacity: 0.85,
                      }}
                    />
                  </div>
                  <span className="bar-count">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Food Category Distribution */}
        <div className="chart-card">
          <h3>🍱 Food Category Breakdown</h3>
          {impact.categoryDistribution.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)", fontSize: "14px" }}>No data</p>
          ) : (
            <div className="bar-chart">
              {impact.categoryDistribution.map(({ name, count, percentage }) => (
                <div key={name} className="bar-row">
                  <span className="bar-label" title={name}>{name}</span>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${Math.max(percentage, 3)}%` }} />
                  </div>
                  <span className="bar-count">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Completion Rate Visual */}
      <div className="chart-card" style={{ marginTop: "24px" }}>
        <h3>🎯 Rescue Completion Rate</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          {/* Big ring representation using CSS */}
          <div style={{ position: "relative", width: "100px", height: "100px", flexShrink: 0 }}>
            <svg viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)", width: "100px", height: "100px" }}>
              <circle cx="50" cy="50" r="38" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="12"
                strokeDasharray={`${impact.completionRate * 2.39} 239`}
                strokeLinecap="round"
              />
            </svg>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: "800", fontSize: "18px", color: "var(--color-text)",
            }}>
              {impact.completionRate}%
            </div>
          </div>

          <div>
            <p style={{ fontSize: "15px", fontWeight: "600", marginBottom: "6px", color: "var(--color-text)" }}>
              {impact.completed} of {impact.total} donations fully completed
            </p>
            <p style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
              {impact.active} still active · {impact.cancelled} cancelled
            </p>
            <p style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "4px" }}>
              {impact.mealPortionsRescued} meal portions successfully rescued
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="impact-section" style={{ marginTop: "28px" }}>
        <div className="dash-section-header">
          <h3 style={{ fontSize: "16px" }}>🕒 Recent Donation Activity</h3>
          <Link to="/food" className="view-all-link">View All →</Link>
        </div>
        {impact.recentActivity.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)", fontSize: "14px" }}>No recent activity.</p>
        ) : (
          <div className="activity-list">
            {impact.recentActivity.map((food) => (
              <div key={food.id} className="activity-item">
                <div className="activity-dot" style={{ background: STATUS_COLORS[food.status]?.color || "var(--color-primary)" }} />
                <div className="activity-info">
                  <div className="activity-title">{food.foodName}</div>
                  <div className="activity-sub">
                    {food.quantity} {food.unit} · {food.category} · {food.location}
                  </div>
                </div>
                <DonationStatusBadge status={food.status} size="small" />
                <span style={{ fontSize: "12px", color: "var(--color-text-muted)", flexShrink: 0 }}>
                  {formatShortDate(food.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
