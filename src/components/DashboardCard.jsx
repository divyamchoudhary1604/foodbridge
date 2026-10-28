/**
 * DashboardCard – reusable metric card for dashboards.
 * Shows an icon, label, and big numeric value.
 * Optional highlight color variant.
 */
export default function DashboardCard({ icon, label, value, highlight = "", sublabel = "" }) {
  return (
    <div className={`metric-card ${highlight}`}>
      <div className="metric-icon">{icon}</div>
      <div className="metric-info">
        <span className="metric-label">{label}</span>
        <span className="metric-value">{value}</span>
        {sublabel && <span className="metric-sublabel">{sublabel}</span>}
      </div>
    </div>
  );
}
