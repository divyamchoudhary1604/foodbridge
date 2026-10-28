import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { FoodProvider } from "./context/FoodContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import FoodList from "./pages/FoodList";
import FoodDetails from "./pages/FoodDetails";
import DonateFood from "./pages/DonateFood";
import VolunteerDelivery from "./pages/VolunteerDelivery";
import RecipeIdeas from "./pages/RecipeIdeas";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ImpactDashboard from "./pages/ImpactDashboard";

// Dashboard nested pages
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import MyDonations from "./pages/dashboard/MyDonations";
import MyClaims from "./pages/dashboard/MyClaims";
import RescueChecklist from "./pages/dashboard/RescueChecklist";
import VolunteerDashboard from "./pages/dashboard/VolunteerDashboard";
import NGODashboard from "./pages/dashboard/NGODashboard";

import "./styles/global.css";

/**
 * Root Application with Role-Based Access Control (RBAC).
 *
 * Roles:
 * - Donor:     Post donations → /donate, /dashboard/my-donations
 * - NGO:       Claim food → /food/:id, /dashboard/ngo, /dashboard/my-claims
 * - Volunteer: Manage deliveries → /deliveries, /dashboard/volunteer, /dashboard/checklist
 * - Admin:     Full access to all features
 */
function App() {
  return (
    <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <FoodProvider>
              <Navbar />

              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/food" element={<FoodList />} />
                <Route path="/food/:id" element={<FoodDetails />} />
                <Route path="/recipes" element={<RecipeIdeas />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected: Donors + Admin */}
                <Route
                  path="/donate"
                  element={
                    <ProtectedRoute allowedRoles={["Donor", "Admin"]}>
                      <DonateFood />
                    </ProtectedRoute>
                  }
                />

                {/* Protected: Volunteers + Admin */}
                <Route
                  path="/deliveries"
                  element={
                    <ProtectedRoute allowedRoles={["Volunteer", "Admin"]}>
                      <VolunteerDelivery />
                    </ProtectedRoute>
                  }
                />

                {/* Dashboard with Nested Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardOverview />} />

                  {/* Impact Dashboard — all authenticated users */}
                  <Route path="impact" element={<ImpactDashboard />} />

                  {/* Donor Dashboard */}
                  <Route
                    path="my-donations"
                    element={
                      <ProtectedRoute allowedRoles={["Donor", "Admin"]}>
                        <MyDonations />
                      </ProtectedRoute>
                    }
                  />

                  {/* Volunteer Dashboard */}
                  <Route
                    path="volunteer"
                    element={
                      <ProtectedRoute allowedRoles={["Volunteer", "Admin"]}>
                        <VolunteerDashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* NGO Dashboard */}
                  <Route
                    path="ngo"
                    element={
                      <ProtectedRoute allowedRoles={["NGO", "Admin"]}>
                        <NGODashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* NGO Claims */}
                  <Route
                    path="my-claims"
                    element={
                      <ProtectedRoute allowedRoles={["NGO", "Admin"]}>
                        <MyClaims />
                      </ProtectedRoute>
                    }
                  />

                  {/* Volunteer Checklist */}
                  <Route
                    path="checklist"
                    element={
                      <ProtectedRoute allowedRoles={["Volunteer", "Admin"]}>
                        <RescueChecklist />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>

              <Footer />
            </FoodProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
  );
}

export default App;
