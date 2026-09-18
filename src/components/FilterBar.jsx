/**
 * FilterBar Component
 *
 * Renders dropdown selects for filtering food donations by
 * category and status. The parent manages the selected values.
 *
 * Props:
 * - selectedCategory: current category filter value
 * - onCategoryChange: function called when category changes
 * - selectedStatus: current status filter value
 * - onStatusChange: function called when status changes
 */
function FilterBar({
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
}) {
  // List of available categories
  const categories = ["All", "Meals", "Bakery", "Fruits", "Packaged Food"];

  // List of available statuses
  const statuses = ["All", "Available", "Accepted", "Completed"];

  return (
    <>
      {/* Category filter dropdown */}
      <select
        className="filter-select"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        aria-label="Filter by category"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === "All" ? "All Categories" : category}
          </option>
        ))}
      </select>

      {/* Status filter dropdown */}
      <select
        className="filter-select"
        value={selectedStatus}
        onChange={(event) => onStatusChange(event.target.value)}
        aria-label="Filter by status"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status === "All" ? "All Statuses" : status}
          </option>
        ))}
      </select>
    </>
  );
}

export default FilterBar;
