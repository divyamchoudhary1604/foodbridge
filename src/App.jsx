import { BrowserRouter, Routes, Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import foodData from "./data/foodData";

// Layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Page components
import Home from "./pages/Home";
import FoodList from "./pages/FoodList";
import FoodDetails from "./pages/FoodDetails";
import DonateFood from "./pages/DonateFood";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Global styles
import "./styles/global.css";

/**
 * App Component – Root of the application
 *
 * This is the main component that:
 * 1. Manages the central state (foods and currentUser)
 * 2. Syncs state with localStorage using useLocalStorage hook
 * 3. Sets up all routes using React Router
 * 4. Passes data and handler functions as props to child components
 */
function App() {
  /**
   * Central State:
   * - foods: array of all food donations (synced with localStorage)
   * - currentUser: the logged-in user object or null (synced with localStorage)
   *
   * useLocalStorage works like useState but also saves/loads from browser storage.
   * "foodbridge-foods" and "foodbridge-user" are the localStorage keys.
   */
  const [foods, setFoods] = useLocalStorage("foodbridge-foods", foodData);
  const [currentUser, setCurrentUser] = useLocalStorage(
    "foodbridge-user",
    null
  );

  /**
   * Add a new donation to the foods array
   * Called when user submits the DonateFood form
   */
  function handleAddDonation(newDonation) {
    const updatedFoods = [...foods, newDonation];
    setFoods(updatedFoods);
  }

  /**
   * Delete a donation by its id
   * Filters out the donation with the matching id
   */
  function handleDeleteFood(id) {
    // Remove the selected donation using its id
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
  }

  /**
   * Update an existing donation
   * Replaces the old donation with the updated version
   */
  function handleUpdateFood(updatedDonation) {
    const updatedFoods = foods.map((food) => {
      // If this is the donation we want to update, replace it
      if (food.id === updatedDonation.id) {
        return updatedDonation;
      }
      // Otherwise, keep the original
      return food;
    });
    setFoods(updatedFoods);
  }

  /**
   * Log a user in – saves user object to state and localStorage
   */
  function handleLogin(user) {
    setCurrentUser(user);
  }

  /**
   * Log the user out – removes user from state and localStorage
   */
  function handleLogout() {
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>
      {/* Navbar is shown on every page */}
      <Navbar currentUser={currentUser} onLogout={handleLogout} />

      {/* Define all routes */}
      <Routes>
        {/* Home / Landing Page */}
        <Route path="/" element={<Home foods={foods} />} />

        {/* Available Food Listing */}
        <Route path="/food" element={<FoodList foods={foods} />} />

        {/* Food Details – Dynamic Route */}
        <Route
          path="/food/:id"
          element={
            <FoodDetails foods={foods} onUpdateFood={handleUpdateFood} />
          }
        />

        {/* Donate Food Form */}
        <Route
          path="/donate"
          element={<DonateFood onAddDonation={handleAddDonation} />}
        />

        {/* Login Page */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Register Page */}
        <Route
          path="/register"
          element={<Register onLogin={handleLogin} />}
        />

        {/* Dashboard – Protected Route (must be logged in) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Dashboard
                foods={foods}
                currentUser={currentUser}
                onDeleteFood={handleDeleteFood}
                onUpdateFood={handleUpdateFood}
              />
            </ProtectedRoute>
          }
        />

        {/* About Page */}
        <Route path="/about" element={<About />} />

        {/* 404 – Catch-all route for unknown URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer is shown on every page */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
