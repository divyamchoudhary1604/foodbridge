import { LIFECYCLE_STAGES, getStageIndex, STATUS_COLORS } from "../../utils/donationHelpers";

/**
 * DonationProgress – visual step-by-step progress tracker for the donation lifecycle.
 * Shows each stage as a dot + label; completed stages are filled green,
 * current stage is highlighted, future stages are gray.
 */
export default function DonationProgress({ status }) {
  const currentIdx = getStageIndex(status);
  const isCancelled = status === "Cancelled";

  if (isCancelled) {
    return (
      <div className="donation-progress-cancelled">
        <span>✕</span> This donation has been cancelled.
      </div>
    );
  }

  return (
    <div className="donation-progress-track">
      {LIFECYCLE_STAGES.map((stage, idx) => {
        const isDone = idx < currentIdx;
        const isCurrent = idx === currentIdx;
        const isFuture = idx > currentIdx;

        return (
          <div key={stage} className="progress-step-wrapper">
            {/* Connector line between steps */}
            {idx > 0 && (
              <div
                className="progress-connector"
                style={{ background: isDone || isCurrent ? "var(--color-primary)" : "#e5e7eb" }}
              />
            )}

            <div className="progress-step">
              {/* Circle dot */}
              <div
                className={`progress-dot ${isDone ? "dot-done" : ""} ${isCurrent ? "dot-current" : ""} ${isFuture ? "dot-future" : ""}`}
              >
                {isDone ? "✓" : idx + 1}
              </div>

              {/* Label */}
              <span
                className="progress-label"
                style={{
                  color: isFuture ? "#9ca3af" : isCurrent ? "var(--color-primary)" : "var(--color-text)",
                  fontWeight: isCurrent ? "700" : "500",
                }}
              >
                {stage}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
