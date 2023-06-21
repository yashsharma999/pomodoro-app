import { IconButton, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function WeeklyToggle({
  startDate,
  endDate,
  handlePreviousWeek,
  handleNextWeek,
}) {
  return (
    <Stack justifyContent={"center"} alignItems="center" direction="row">
      <IconButton onClick={handlePreviousWeek}>
        <ArrowBackIosNewIcon />
      </IconButton>

      <Typography variant="body2">
        {format(startDate, "dd/MM/yyyy")} - {format(endDate, "dd/MM/yyyy")}
      </Typography>
      <IconButton onClick={handleNextWeek}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Stack>
  );
}
