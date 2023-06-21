import { Dialog } from "@mui/material";
import AddTask from "../modules/AddTask";

export default function TaskDialogue({ handleClose, open, edit, task }) {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiPaper-root": {
          width: "400px",
          padding: "2rem",
          borderRadius: "1rem",
        },
      }}
    >
      <AddTask closeDialog={handleClose} editTask={edit} task={task} />
    </Dialog>
  );
}
