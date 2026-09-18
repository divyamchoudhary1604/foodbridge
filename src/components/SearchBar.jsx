/**
 * SearchBar Component
 *
 * A simple controlled search input.
 * The parent component manages the search term state.
 *
 * Props:
 * - searchTerm: current search text (string)
 * - onSearchChange: function called when the user types
 */
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-input-wrapper">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search food by name..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        aria-label="Search food donations"
      />
    </div>
  );
}

export default SearchBar;
