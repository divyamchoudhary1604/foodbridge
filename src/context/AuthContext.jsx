import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage("foodbridge-user", {
    name: "Demo NGO Volunteer",
    email: "volunteer@foodbridge.org",
    role: "Volunteer"
  });

  function login(userData) {
    setCurrentUser(userData);
  }

  function register(userData) {
    setCurrentUser(userData);
  }

  function logout() {
    setCurrentUser(null);
  }

  function updateProfile(updatedData) {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updatedData });
    }
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    updateProfile,
    isDonor: currentUser?.role === "Donor",
    isNGO: currentUser?.role === "NGO",
    isVolunteer: currentUser?.role === "Volunteer",
    isAdmin: currentUser?.role === "Admin"
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
