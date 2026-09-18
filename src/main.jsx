import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/**
 * main.jsx – Entry Point
 *
 * This file creates the root React element and renders
 * the entire App component into the HTML page.
 *
 * React.StrictMode helps catch potential problems in
 * development by running extra checks.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
