import { Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Navigation from "./modules/Navigation";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return navigate("/login");
  }

  return (
    <>
      <Navigation />
      <Container maxWidth={"lg"} sx={{ paddingBottom: "1rem" }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
