import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import TaskDialogue from "./TaskDialogue";

export default function EditTask({ task }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    handleClickOpen();
  };
  return (
    <>
      <TaskDialogue
        open={open}
        handleClose={handleClose}
        edit={true}
        task={task}
      />
      <IconButton size="small" onClick={handleEdit}>
        <EditIcon fontSize="small" color="primary" />
      </IconButton>
    </>
  );
}
