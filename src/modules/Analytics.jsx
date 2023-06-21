import { Container, Typography } from "@mui/material";
import PomodoroAnalytics from "../components/PomodoroAnalytics";

export default function Analytics() {
  return (
    <>
      <Container maxWidth={"lg"}>
        <Typography variant="h5" my={2}>
          Analytics
        </Typography>
        <PomodoroAnalytics />
      </Container>
    </>
  );
}
