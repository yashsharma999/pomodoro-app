import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./modules/Login.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </ThemeContextProvider>
  </React.StrictMode>
);
