import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ChaosErrorBoundary } from "./chaos/ChaosErrorBoundary.jsx";

/**
 * Entry point aplikasi React Sahabat-UMKM.
 * Dibungkus dengan ChaosErrorBoundary untuk resiliensi sistem terhadap runtime error dan kegagalan terinjeksi.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChaosErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChaosErrorBoundary>
  </React.StrictMode>
);
