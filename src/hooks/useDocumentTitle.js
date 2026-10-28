import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title ? `${title} | FoodBridge` : "FoodBridge – Surplus Food Rescue";

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}
