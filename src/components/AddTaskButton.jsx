import { Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddTaskButton({ handleClickOpen }) {
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery("(max-width: 576px)");

  return (
    <Button
      variant="outlined"
      sx={{
        width: "100%",
        my: 4,
      }}
      onClick={() => {
        isSmallDevice ? navigate("/add-task") : handleClickOpen();
      }}
    >
      Add New Task +
    </Button>
  );
}
