import { useState, useMemo } from "react";
import FoodCard from "../components/FoodCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/common/Pagination";
import useDebounce from "../hooks/useDebounce";
import { useFood } from "../context/FoodContext";
import "../styles/food.css";

function FoodList() {
  const { foods } = useFood();

  // Local state for search, filters, sorting, and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredAndSortedFoods = useMemo(() => {
    // 1. Filtering
    const result = foods.filter((food) => {
      const nameMatch = food.foodName
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const categoryMatch =
        category === "All" || food.category === category;

      const statusMatch =
        status === "All" || food.status === status;

      return nameMatch && categoryMatch && statusMatch;
    });

    // 2. Sorting
    return result.sort((a, b) => {
      if (sortBy === "newest") {
        return b.id - a.id;
      }
      if (sortBy === "quantity-desc") {
        return Number(b.quantity) - Number(a.quantity);
      }
      if (sortBy === "quantity-asc") {
        return Number(a.quantity) - Number(b.quantity);
      }
      if (sortBy === "name-asc") {
        return a.foodName.localeCompare(b.foodName);
      }
      return 0;
    });
  }, [foods, debouncedSearch, category, status, sortBy]);

  // Pagination calculation
  const totalItems = filteredAndSortedFoods.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFoods = filteredAndSortedFoods.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  function handleResetFilters() {
    setSearchTerm("");
    setCategory("All");
    setStatus("All");
    setSortBy("newest");
    setCurrentPage(1);
  }

  return (
    <main className="food-list-page">
      <div className="container">
        <div className="page-header">
          <h1>Available Food Donations</h1>
          <p>Browse surplus food available for rescue</p>
        </div>

        <div className="controls-bar">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(val) => {
              setSearchTerm(val);
              setCurrentPage(1); // reset to page 1 when typing
            }}
          />

          <FilterBar
            selectedCategory={category}
            onCategoryChange={(val) => {
              setCategory(val);
              setCurrentPage(1);
            }}
            selectedStatus={status}
            onStatusChange={(val) => {
              setStatus(val);
              setCurrentPage(1);
            }}
          />

          {/* Sort Dropdown */}
          <div className="sort-wrapper">
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort food donations"
            >
              <option value="newest">Sort by: Newest First</option>
              <option value="quantity-desc">Quantity: High to Low</option>
              <option value="quantity-asc">Quantity: Low to High</option>
              <option value="name-asc">Food Name: A to Z</option>
            </select>
          </div>
        </div>

        <div
          className="results-count"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <span>
            Showing {filteredAndSortedFoods.length} of {foods.length} donations
            {debouncedSearch && ` (Filtered by "${debouncedSearch}")`}
          </span>

          {(searchTerm || category !== "All" || status !== "All") && (
            <button
              type="button"
              onClick={handleResetFilters}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-primary)",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "13px"
              }}
            >
              ✕ Reset All Filters
            </button>
          )}
        </div>

        {currentFoods.length > 0 ? (
          <>
            <div className="food-grid">
              {currentFoods.map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : (
          <div className="no-results">
            <h3>🔍 No donations found</h3>
            <p>Try changing your search term or filter criteria</p>
            <button
              type="button"
              className="secondary-button small-button"
              onClick={handleResetFilters}
              style={{ marginTop: "16px" }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default FoodList;