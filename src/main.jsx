import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";

import App from "./App.jsx";
import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import SnackBarProvider from "./context/SnackBarContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SnackBarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackBarProvider>
    </AuthProvider>
  </StrictMode>,
);
