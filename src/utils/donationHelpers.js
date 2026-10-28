/**
 * donationHelpers.js
 * Utility functions for Donation Lifecycle logic.
 * Uses JavaScript ES6+ array methods: filter, map, reduce.
 */

// ─── Lifecycle Definition ─────────────────────────────────────────────────────
export const LIFECYCLE_STAGES = [
  "Available",
  "Accepted",
  "Pickup in Progress",
  "Picked Up",
  "Delivered",
  "Completed",
];

export const CANCELLED_STATUS = "Cancelled";

// ─── Status Color Map (for badges) ───────────────────────────────────────────
export const STATUS_COLORS = {
  Available:            { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
  Accepted:             { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  "Pickup in Progress": { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  "Picked Up":          { bg: "#faf5ff", color: "#7e22ce", border: "#e9d5ff" },
  Delivered:            { bg: "#f0fdfa", color: "#0f766e", border: "#99f6e4" },
  Completed:            { bg: "#f0fdf4", color: "#166534", border: "#86efac" },
  Cancelled:            { bg: "#fef2f2", color: "#991b1b", border: "#fecaca" },
};

// ─── Transition Rules ─────────────────────────────────────────────────────────
export const ALLOWED_TRANSITIONS = {
  Available:            ["Accepted", "Cancelled"],
  Accepted:             ["Pickup in Progress", "Available", "Cancelled"],
  "Pickup in Progress": ["Picked Up", "Cancelled"],
  "Picked Up":          ["Delivered", "Cancelled"],
  Delivered:            ["Completed"],
  Completed:            [],
  Cancelled:            [],
};

// ─── Action Labels ────────────────────────────────────────────────────────────
export const ACTION_LABELS = {
  Accepted:             "Accept Donation",
  "Pickup in Progress": "Start Pickup",
  "Picked Up":          "Mark Picked Up",
  Delivered:            "Mark Delivered",
  Completed:            "Mark Completed",
  Available:            "Return to Available",
  Cancelled:            "Cancel Donation",
};

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getStageIndex(status) {
  return LIFECYCLE_STAGES.indexOf(status);
}

export function canTransitionTo(currentStatus, nextStatus) {
  const allowed = ALLOWED_TRANSITIONS[currentStatus] || [];
  return allowed.includes(nextStatus);
}

export function getNextStatus(currentStatus) {
  const idx = LIFECYCLE_STAGES.indexOf(currentStatus);
  if (idx === -1 || idx >= LIFECYCLE_STAGES.length - 1) return null;
  return LIFECYCLE_STAGES[idx + 1];
}

export function getAvailableActions(currentStatus) {
  return ALLOWED_TRANSITIONS[currentStatus] || [];
}

export function isExpired(donation) {
  if (!donation.expiry) return false;
  return new Date(donation.expiry) < new Date();
}

export function isUrgent(donation) {
  if (!donation.expiry) return false;
  const diff = new Date(donation.expiry) - new Date();
  return diff > 0 && diff < 2 * 60 * 60 * 1000;
}

export function formatDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatShortDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Impact Calculations ───────────────────────────────────────────────────────
export function calculateImpact(foods) {
  const total = foods.length;
  const completed = foods.filter((f) => f.status === "Completed").length;
  const cancelled = foods.filter((f) => f.status === "Cancelled").length;
  const active = foods.filter((f) =>
    ["Available", "Accepted", "Pickup in Progress", "Picked Up"].includes(f.status)
  ).length;
  const delivered = foods.filter((f) => f.status === "Delivered").length;
  const available = foods.filter((f) => f.status === "Available").length;
  const accepted = foods.filter((f) => f.status === "Accepted").length;

  // Only count portions from completed donations
  const mealPortionsRescued = foods
    .filter((f) => f.status === "Completed")
    .reduce((sum, f) => sum + (Number(f.quantity) || 0), 0);

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const categoryMap = foods.reduce((acc, f) => {
    const cat = f.category || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const categoryDistribution = Object.entries(categoryMap).map(([name, count]) => ({
    name,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }));

  const statusMap = foods.reduce((acc, f) => {
    acc[f.status] = (acc[f.status] || 0) + 1;
    return acc;
  }, {});
  const statusDistribution = Object.entries(statusMap).map(([status, count]) => ({
    status,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }));

  const recentActivity = [...foods]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 6);

  return {
    total,
    completed,
    cancelled,
    active,
    delivered,
    available,
    accepted,
    mealPortionsRescued,
    completionRate,
    categoryDistribution,
    statusDistribution,
    recentActivity,
  };
}
