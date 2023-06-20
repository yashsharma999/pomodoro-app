import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navigation from "./modules/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Container maxWidth={"lg"}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
