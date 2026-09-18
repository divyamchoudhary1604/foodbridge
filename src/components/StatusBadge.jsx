/**
 * StatusBadge Component (Reusable)
 *
 * Renders a colored badge based on the donation status.
 * - "Available" = green
 * - "Accepted" = blue
 * - "Completed" = gray
 *
 * Props:
 * - status: string ("Available", "Accepted", or "Completed")
 */
function StatusBadge({ status }) {
  // Determine the CSS class based on status
  let badgeClass = "status-badge";

  if (status === "Available") {
    badgeClass += " status-available";
  } else if (status === "Accepted") {
    badgeClass += " status-accepted";
  } else if (status === "Completed") {
    badgeClass += " status-completed";
  }

  return <span className={badgeClass}>{status}</span>;
}

export default StatusBadge;
