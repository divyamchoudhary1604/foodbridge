function FilterBar({
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange
}) {
  const categories = ["All", "Meals", "Bakery", "Fruits", "Packaged Food"];
  const statuses = ["All", "Available", "Accepted", "Completed"];

  return (
    <>
      {/* Category */}
      <select
        className="filter-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        className="filter-select"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </>
  );
}

export default FilterBar;