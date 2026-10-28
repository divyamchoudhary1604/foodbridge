import { createContext, useContext, useState, useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import initialFoodData from "../data/foodData";

const FoodContext = createContext(null);

export function FoodProvider({ children }) {
  const [foods, setFoods] = useLocalStorage("foodbridge-foods-v2", initialFoodData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // CRUD: Create
  const addFood = useCallback((newFood) => {
    const foodWithMeta = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "Available",
      assignedVolunteer: null,
      recipientNGO: null,
      ...newFood,
      quantity: Number(newFood.quantity),
    };
    setFoods((prev) => [foodWithMeta, ...prev]);
    return foodWithMeta;
  }, [setFoods]);

  // CRUD: Update
  const updateFood = useCallback((updatedFood) => {
    setFoods((prev) =>
      prev.map((item) => (item.id === updatedFood.id ? { ...item, ...updatedFood } : item))
    );
  }, [setFoods]);

  // CRUD: Delete
  const deleteFood = useCallback((id) => {
    setFoods((prev) => prev.filter((item) => item.id !== id));
  }, [setFoods]);

  // Claim workflow (NGO claims a donation)
  const claimFood = useCallback((id, claimerDetails) => {
    setFoods((prev) =>
      prev.map((item) => {
        if (item.id === id && item.status === "Available") {
          return {
            ...item,
            status: "Accepted",
            recipientNGO: claimerDetails.name || "Anonymous NGO",
            claimedAt: new Date().toISOString(),
          };
        }
        return item;
      })
    );
  }, [setFoods]);

  // Volunteer accepts a donation
  const acceptDonation = useCallback((id, volunteerName) => {
    setFoods((prev) =>
      prev.map((item) => {
        if (item.id === id && item.status === "Available" && !item.assignedVolunteer) {
          return {
            ...item,
            status: "Accepted",
            assignedVolunteer: volunteerName,
            acceptedAt: new Date().toISOString(),
          };
        }
        return item;
      })
    );
  }, [setFoods]);

  // Update status through the lifecycle (with transition validation)
  const updateDonationStatus = useCallback((id, newStatus, extraData = {}) => {
    setFoods((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus,
            [`${newStatus.replace(/\s+/g, "")}At`]: new Date().toISOString(),
            ...extraData,
          };
        }
        return item;
      })
    );
  }, [setFoods]);

  // Reset to default sample data
  const resetSampleData = useCallback(() => {
    setFoods(initialFoodData);
  }, [setFoods]);

  // Derived statistics using useMemo
  const stats = useMemo(() => {
    const totalCount = foods.length;
    const availableCount = foods.filter((f) => f.status === "Available").length;
    const acceptedCount = foods.filter((f) => f.status === "Accepted").length;
    const pickupInProgressCount = foods.filter((f) => f.status === "Pickup in Progress").length;
    const pickedUpCount = foods.filter((f) => f.status === "Picked Up").length;
    const deliveredCount = foods.filter((f) => f.status === "Delivered").length;
    const completedCount = foods.filter((f) => f.status === "Completed").length;
    const cancelledCount = foods.filter((f) => f.status === "Cancelled").length;
    const inTransitCount = pickedUpCount + pickupInProgressCount;

    // Only count portions from completed donations as rescued
    const mealPortionsRescued = foods
      .filter((f) => f.status === "Completed")
      .reduce((sum, f) => sum + (Number(f.quantity) || 0), 0);

    // Total portions across all donations
    const totalServings = foods.reduce((sum, f) => sum + (Number(f.quantity) || 0), 0);

    const completionRate = totalCount > 0
      ? Math.round((completedCount / totalCount) * 100)
      : 0;

    return {
      totalCount,
      availableCount,
      acceptedCount,
      pickupInProgressCount,
      pickedUpCount,
      deliveredCount,
      completedCount,
      cancelledCount,
      inTransitCount,
      mealPortionsRescued,
      totalServings,
      completionRate,
    };
  }, [foods]);

  const value = {
    foods,
    loading,
    error,
    stats,
    addFood,
    updateFood,
    deleteFood,
    claimFood,
    acceptDonation,
    updateDonationStatus,
    resetSampleData,
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
}

export function useFood() {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
}
