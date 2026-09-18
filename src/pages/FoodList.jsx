import { useState, useMemo } from "react";
import FoodCard from "../components/FoodCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import "../styles/food.css";

/**
 * FoodList Page – Available Food
 *
 * Shows all food donations in a responsive grid.
 * Includes search by name and filter by category/status.
 *
 * Props:
 * - foods: array of all food donation objects
 */
function FoodList({ foods }) {
  // State for the search text input
  const [searchTerm, setSearchTerm] = useState("");

  // State for the selected category filter
  const [selectedCategory, setSelectedCategory] = useState("All");

  // State for the selected status filter
  const [selectedStatus, setSelectedStatus] = useState("All");

  /**
   * Filter the foods array based on search term, category, and status.
   *
   * useMemo is used here so that the filtering only re-runs when
   * foods, searchTerm, selectedCategory, or selectedStatus change.
   * This avoids unnecessary recalculation on every render.
   */
  const filteredFoods = useMemo(() => {
    const result = foods.filter((food) => {
      // Check if food name matches the search term (case-insensitive)
      const matchesSearch = food.foodName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Check if food category matches the selected filter
      const matchesCategory =
        selectedCategory === "All" || food.category === selectedCategory;

      // Check if food status matches the selected filter
      const matchesStatus =
        selectedStatus === "All" || food.status === selectedStatus;

      // Only include foods that match ALL filters
      return matchesSearch && matchesCategory && matchesStatus;
    });

    return result;
  }, [foods, searchTerm, selectedCategory, selectedStatus]);

  return (
    <main className="food-list-page">
      {/* Page Header */}
      <div className="container">
        <div className="page-header">
          <h1>Available Food Donations</h1>
          <p>Browse surplus food available for rescue in your area</p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="controls-bar">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      </div>

      {/* Results Count */}
      <div className="results-count">
        Showing {filteredFoods.length} of {foods.length} donations
      </div>

      {/* Food Cards Grid */}
      {filteredFoods.length > 0 ? (
        <div className="food-grid">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No donations found</h3>
          <p>Try changing your search or filter criteria</p>
        </div>
      )}
    </main>
  );
}

export default FoodList;
