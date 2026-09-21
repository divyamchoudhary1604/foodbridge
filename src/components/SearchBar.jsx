function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-input-wrapper">

      <span className="search-icon">🔍</span>

      <input
        type="text"
        className="search-input"
        placeholder="Search food by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

    </div>
  );
}

export default SearchBar;