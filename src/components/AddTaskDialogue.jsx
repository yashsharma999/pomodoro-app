import { Dialog } from "@mui/material";
import AddTask from "../modules/AddTask";

export default function AddTaskDialogue({ handleClose, open }) {
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
      <AddTask closeDialog={handleClose} />
    </Dialog>
  );
}
