import "@fontsource/poppins/400.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./modules/Login.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { NotificationContextProvider } from "./contexts/NotificationContext.jsx";
import Pomodoro from "./modules/Pomodoro.jsx";
import Tasks from "./modules/Tasks.jsx";
import AddTask from "./modules/AddTask.jsx";
import { DataContextProvider } from "./contexts/DataContext.jsx";
import Analytics from "./modules/Analytics.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <NotificationContextProvider>
        <DataContextProvider>
          <Router>
            <AuthContextProvider>
              <Routes>
                <Route exact path="/" element={<App />}>
                  <Route path="/" element={<Pomodoro />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/add-task" element={<AddTask />} />
                  <Route path="/analytics" element={<Analytics />} />
                </Route>
                <Route path="/login" element={<Login />} />
              </Routes>
            </AuthContextProvider>
          </Router>
        </DataContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
