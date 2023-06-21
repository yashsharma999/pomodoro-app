import {
  Button,
  Container,
  Stack,
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
import StatusCheckbox from "../components/StatusCheckbox";
import { useData } from "../contexts/DataContext";
import AddTaskButton from "../components/AddTaskButton";
import EditTask from "../components/EditTask";
import DeleteTask from "../components/DeleteTask";
import TaskDialogue from "../components/TaskDialogue";

export default function Tasks() {
  const navigate = useNavigate();
  const { setCurrentTask } = useData();
  const { isAuthenticated } = useAuth();
  const isSmallDevice = useMediaQuery("(max-width: 576px)");

  if (!isAuthenticated) {
    return navigate("/login");
  }

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
      width: 150,
      renderCell: (params) => (
        <StatusCheckbox
          completed={params.row.completed}
          id={params.row.taskId}
        />
      ),
    },
    {
      field: "pomodoro",
      headerName: "Pomodoro",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => {
            setCurrentTask(params.row);
            navigate("/");
          }}
        >
          Start
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Stack direction={"row"} alignItems="center">
          <EditTask task={params.row} />
          <DeleteTask taskId={params.row.taskId} />
        </Stack>
      ),
    },
  ];

  return (
    <>
      <TaskDialogue open={open} handleClose={handleClose} />{" "}
      <Container maxWidth={"lg"}>
        <AddTaskButton handleClickOpen={handleClickOpen} />
        <Typography color={"primary"} variant="h5" my={2}>
          Tasks
        </Typography>
        <DataGrid
          sx={{
            minHeight: "100px",
          }}
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
