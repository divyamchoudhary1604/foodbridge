import { useState, useEffect } from "react";

/**
 * useLocalStorage – Custom React Hook
 *
 * This hook works like useState, but also saves and loads the value
 * from the browser's localStorage. This means data persists even
 * after the user refreshes the page.
 *
 * @param {string} key - The key used to store data in localStorage
 * @param {*} initialValue - The default value if nothing is found in storage
 * @returns {[any, Function]} - Returns [storedValue, setStoredValue]
 */
function useLocalStorage(key, initialValue) {
  // Step 1: Initialize state
  // Try to get existing data from localStorage first
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      // If data exists in localStorage, parse and return it
      if (item !== null) {
        return JSON.parse(item);
      }

      // Otherwise, use the initial value
      return initialValue;
    } catch (error) {
      // If there is an error reading localStorage, use initial value
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  // Step 2: Save to localStorage whenever the value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error saving to localStorage key:", key, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
