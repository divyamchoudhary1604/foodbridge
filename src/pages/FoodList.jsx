import { useState } from "react";
import FoodCard from "../components/FoodCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import "../styles/food.css";

function FoodList({ foods }) {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredFoods = foods.filter((food) => {

    const nameMatch = food.foodName
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || food.category === category;

    const statusMatch =
      status === "All" || food.status === status;

    return nameMatch && categoryMatch && statusMatch;
  });


  return (
    <main className="food-list-page">

      <div className="container">

        <div className="page-header">
          <h1>Available Food Donations</h1>
          <p>Browse surplus food available for rescue</p>
        </div>

        <div className="controls-bar">

          <SearchBar
            searchTerm={search}
            onSearchChange={setSearch}
          />

          <FilterBar
            selectedCategory={category}
            onCategoryChange={setCategory}
            selectedStatus={status}
            onStatusChange={setStatus}
          />

        </div>

        <div className="results-count">
          Showing {filteredFoods.length} of {foods.length} donations
        </div>

        {filteredFoods.length > 0 ? (

          <div className="food-grid">

            {filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
              />
            ))}

          </div>

        ) : (

          <div className="no-results">
            <h3>🔍 No donations found</h3>
            <p>Try changing your search or filters</p>
          </div>

        )}

      </div>

    </main>
  );
}

export default FoodList;