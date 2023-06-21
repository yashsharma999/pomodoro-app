import { Container, Grid, Typography } from "@mui/material";
import GeneralStats from "../components/GeneralStats";
import PomodoroAnalytics from "../components/PomodoroAnalytics";
import TaskCompletionRatio from "../components/TaskCompletionRatio";

export default function Analytics() {
  return (
    <>
      <Container maxWidth={"lg"}>
        <Typography variant="h5" my={2}>
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
