import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function RecipeIdeas() {
  useDocumentTitle("Surplus Food Recipe Ideas");

  const [searchTerm, setSearchTerm] = useState("rice");
  const debouncedSearch = useDebounce(searchTerm, 400);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchRecipes(query) {
    if (!query.trim()) {
      setRecipes([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Free public REST API for recipes & food preparation
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
      );

      if (!res.ok) {
        throw new Error(`Server returned status: ${res.status}`);
      }

      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      setError(err.message || "Failed to fetch recipes. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  }

  // Trigger fetch whenever debounced search query changes
  useEffect(() => {
    fetchRecipes(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <main className="container page-wrapper">
      <div className="page-header">
        <h1>🍲 Surplus Recipe Finder</h1>
        <p>
          Learn how to turn surplus food ingredients into delicious and nutritious meals.
        </p>
      </div>

      {/* Search Input */}
      <div style={{ maxWidth: "500px", margin: "0 auto 36px" }}>
        <input
          type="text"
          className="form-input"
          placeholder="Search by surplus ingredient (e.g., rice, chicken, potato, bread)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <div style={{ fontSize: "36px", animation: "spin 1s linear infinite" }}>⏳</div>
          <p style={{ marginTop: "12px", fontWeight: "600" }}>Fetching recipe suggestions...</p>
        </div>
      )}

      {/* Error & Retry State */}
      {error && !loading && (
        <div className="error-message" style={{ maxWidth: "600px", margin: "0 auto 32px" }}>
          <p>⚠️ {error}</p>
          <button
            type="button"
            className="secondary-button small-button"
            style={{ marginTop: "12px" }}
            onClick={() => fetchRecipes(debouncedSearch)}
          >
            🔄 Retry Request
          </button>
        </div>
      )}

      {/* Results Grid */}
      {!loading && !error && recipes.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
          {recipes.map((meal) => (
            <div
              key={meal.idMeal}
              style={{
                background: "white",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
                loading="lazy"
              />
              <div style={{ padding: "16px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    background: "var(--color-primary-soft)",
                    color: "var(--color-primary-dark)",
                    padding: "2px 8px",
                    borderRadius: "999px",
                    fontWeight: "600"
                  }}
                >
                  {meal.strCategory || "Recipe"}
                </span>
                <h3 style={{ fontSize: "16px", margin: "10px 0 6px" }}>{meal.strMeal}</h3>
                <p style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                  Origin: {meal.strArea || "Global"}
                </p>

                {meal.strSource && (
                  <a
                    href={meal.strSource}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "12px",
                      fontSize: "13px",
                      color: "var(--color-primary)",
                      fontWeight: "600"
                    }}
                  >
                    View Full Recipe ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && !error && recipes.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <h3>🔍 No recipes found for "{debouncedSearch}"</h3>
          <p className="text-muted">Try searching for simple items like "potato", "bread", or "rice".</p>
        </div>
      )}
    </main>
  );
}
