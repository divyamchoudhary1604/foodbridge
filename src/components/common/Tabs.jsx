/**
 * Accessible Tabs component for tabbed interfaces.
 * Fulfills syllabus: Lectures 61-66 (Tabs, search, filter, sort patterns)
 */
export default function Tabs({ tabs, activeTab, onTabChange, className = "" }) {
  return (
    <div className={`tabs-container ${className}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            className={`tab-button ${isActive ? "tab-active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-label">{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`tab-count-badge ${isActive ? "badge-active" : ""}`}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
