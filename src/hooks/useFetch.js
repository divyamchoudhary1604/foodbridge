import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook for consuming REST APIs.
 * Features:
 * - Promises & async/await with fetch
 * - Loading, success, and error states
 * - Auto-abort on component unmount
 * - Manual retry capability (refetch)
 * 
 * Fulfills syllabus topics: Lectures 13-18 & Lectures 67-72
 */
export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  // Store options in a ref to avoid infinite re-render loops
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const fetchData = useCallback(async (abortSignal) => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...optionsRef.current,
        signal: abortSignal
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Failed to fetch data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
  }, [fetchData]);

  return { data, loading, error, refetch };
}
