import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogTitle,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../configs/firebase";
import { useAuth } from "../contexts/AuthContext";
import { doc } from "firebase/firestore";
import { useState } from "react";
import AddTask from "./AddTask";
import StatusCheckbox from "../components/StatusCheckbox";
import { useData } from "../contexts/DataContext";
import AddTaskButton from "../components/AddTaskButton";
import AddTaskDialogue from "../components/AddTaskDialogue";

export default function Tasks() {
  const navigate = useNavigate();
  const { setCurrentTask } = useData();
  const { isAuthenticated } = useAuth();
  const isSmallDevice = useMediaQuery("(max-width: 576px)");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  const [value, loading, error] = useDocument(
    doc(db, "tasks", isAuthenticated?.uid)
  );
  const taskList = value?.data?.()?.tasks;

  const columns = [
    { field: "title", headerName: "Title", width: 100 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
    { field: "sessions", headerName: "Pomodoros", width: 100 },
    {
      field: "completed",
      headerName: "Completed",
      width: 200,
      renderCell: (params) => (
        <StatusCheckbox completed={params.row.completed} />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => {
            setCurrentTask(params.row);
            navigate("/");
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <>
      <AddTaskDialogue open={open} handleClose={handleClose} />{" "}
      <Container maxWidth={"lg"}>
        <AddTaskButton handleClickOpen={handleClickOpen} />
        <Typography variant="h5" my={2}>
          Tasks
        </Typography>
        <DataGrid
          getRowId={(row) => row?.taskId}
          rows={taskList ?? []}
          columns={columns}
          // disableColumnMenu
          hideFooter
          loading={loading}
          // rowSelectionModel={selectionModel}
          // onRowClick={handleRowClick}
        />
      </Container>
    </>
  );
}
