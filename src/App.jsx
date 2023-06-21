import { Container, useTheme } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Navigation from "./modules/Navigation";

function App() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return navigate("/login");
  }

  return (
    <div
      style={{
        background: `${theme.palette.background.default}`,
      }}
    >
      <Navigation />
      <Container
        maxWidth={"lg"}
        sx={{
          height: location.pathname === "/analytics" ? "100%" : "100vh",
          paddingBottom: "1rem",
          background: `${theme.palette.background.default}`,
        }}
      >
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
