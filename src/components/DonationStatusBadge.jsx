import { STATUS_COLORS } from "../utils/donationHelpers";

/**
 * DonationStatusBadge – colored pill badge for donation lifecycle status.
 * Reads color rules from the shared STATUS_COLORS map.
 */
export default function DonationStatusBadge({ status, size = "normal" }) {
  const colors = STATUS_COLORS[status] || {
    bg: "#f3f4f6",
    color: "#374151",
    border: "#e5e7eb",
  };

  const fontSize = size === "small" ? "11px" : "12px";
  const padding = size === "small" ? "2px 8px" : "4px 10px";

  return (
    <span
      style={{
        display: "inline-block",
        background: colors.bg,
        color: colors.color,
        border: `1px solid ${colors.border}`,
        borderRadius: "999px",
        fontSize,
        fontWeight: "700",
        padding,
        whiteSpace: "nowrap",
        letterSpacing: "0.01em",
      }}
    >
      {status}
    </span>
  );
}
