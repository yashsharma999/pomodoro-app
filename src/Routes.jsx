import { Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./modules/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
