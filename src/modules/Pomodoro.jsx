import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PomodoroBox from "../components/pomodoroBox";
import { useData } from "../contexts/DataContext";
import { formatDistanceToNow } from "date-fns";
import InfoIcon from "@mui/icons-material/Info";
import AddTaskDialogue from "../components/AddTaskDialogue";
import { useState } from "react";
import AddTaskButton from "../components/AddTaskButton";

export default function Pomodoro() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const { currentTask } = useData();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <AddTaskDialogue open={open} handleClose={handleClose} />{" "}
      <Stack px={!isMobile && 2} justifyContent="center" alignItems={"center"}>
        <Container maxWidth={"sm"}>
          {currentTask ? (
            <Card
              sx={{
                p: 2,
                my: 4,
              }}
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems={"center"}
                rowGap={1}
              >
                <Grid item xs={12}>
                  <Typography variant="h3">{currentTask.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color={`secondary`} variant="body2">
                    {formatDistanceToNow(new Date(currentTask.dueDate))} left
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h5" color={"secondary"}>
                {currentTask.description}
              </Typography>
            </Card>
          ) : (
            <>
              <AddTaskButton handleClickOpen={handleClickOpen} />
              <Stack
                direction={"row"}
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <InfoIcon />
                <Typography
                  my={2}
                  textAlign={"left"}
                  variant="body2"
                  color={"secondary"}
                >
                  Please add a new task or select one from tasks table to start
                  pomodoro
                </Typography>
              </Stack>
            </>
          )}

          <PomodoroBox disabled={currentTask ? false : true} />
        </Container>
      </Stack>
    </>
  );
}
