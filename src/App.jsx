import { BrowserRouter, Routes, Route } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import foodData from "./data/foodData";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import FoodList from "./pages/FoodList";
import FoodDetails from "./pages/FoodDetails";
import DonateFood from "./pages/DonateFood";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VolunteerDelivery from "./pages/VolunteerDelivery";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import "./styles/global.css";

function App() {
  const [foods, setFoods] = useLocalStorage("foodbridge-foods", foodData);
  const [currentUser, setCurrentUser] = useLocalStorage(
    "foodbridge-user",
    null
  );

  function handleAddDonation(newDonation) {
    const updatedFoods = [...foods, newDonation];
    setFoods(updatedFoods);
  }

  function handleUpdateFood(updatedDonation) {
    const updatedFoods = foods.map((food) => {
      if (food.id === updatedDonation.id) {
        return updatedDonation;
      }
      return food;
    });
    setFoods(updatedFoods);
  }

  function handleLogin(user) {
    setCurrentUser(user);
  }

  function handleLogout() {
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food" element={<FoodList foods={foods} />} />
        <Route
          path="/food/:id"
          element={
            <FoodDetails foods={foods} onUpdateFood={handleUpdateFood} />
          }
        />
        <Route
          path="/donate"
          element={<DonateFood onAddDonation={handleAddDonation} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<Register onLogin={handleLogin} />}
        />
        <Route
          path="/deliveries"
          element={
            <VolunteerDelivery
              foods={foods}
              onUpdateFood={handleUpdateFood}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
