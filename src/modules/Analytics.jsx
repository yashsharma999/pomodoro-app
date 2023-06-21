import { Container, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GeneralStats from "../components/GeneralStats";
import PomodoroAnalytics from "../components/PomodoroAnalytics";
import TaskCompletionRatio from "../components/TaskCompletionRatio";
import { useAuth } from "../contexts/AuthContext";

export default function Analytics() {
  const navigate = useNavigate();
  const theme = useTheme();

  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return navigate("/login");
  }

  return (
    <>
      <Container
        maxWidth={"lg"}
        sx={{
          background: `${theme.palette.background.default}`,
        }}
      >
        <Typography
          color={"primary"}
          variant="h5"
          sx={{
            paddingTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          Analytics
        </Typography>
        <PomodoroAnalytics />
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6}>
            <TaskCompletionRatio />
          </Grid>
          <Grid item xs={12} md={6}>
            <GeneralStats />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
