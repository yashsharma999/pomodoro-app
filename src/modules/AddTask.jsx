import {
  Container,
  InputLabel,
  Stack,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { doc, setDoc, arrayUnion, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useAuth } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";

export default function AddTask({ closeDialog, editTask, task }) {
  const { user } = useAuth();
  const { setCurrentTask } = useData();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    taskId: task?.taskId ?? uuidv4(),
    title: task?.title ?? "",
    description: task?.description ?? "",
    dueDate: task?.dueDate ?? "",
    sessions: task?.sessions ?? 0,
    completed: task?.completed ?? false,
    priority: task?.priority ?? "P0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const collectionRef = doc(db, "tasks", user.uid);
    if (editTask) {
      const docSnap = await getDoc(collectionRef);
      await updateDoc(collectionRef, {
        tasks: docSnap.data().tasks.map((item) => {
          if (item.taskId === task.taskId) {
            return form;
          }
          return item;
        }),
      });
    } else {
      await setDoc(
        collectionRef,
        {
          tasks: arrayUnion(form),
        },
        {
          merge: true,
        }
      );
    }

    if (!editTask) {
      setCurrentTask(form);
    } else {
    }

    if (closeDialog) {
      return closeDialog();
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Typography variant="h5" mb={4}>
        {editTask ? "Edit Task" : "Add Task"}{" "}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <Stack spacing={1}>
            <InputLabel htmlFor="title">Name</InputLabel>
            <TextField
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Stack>
          <Stack spacing={1}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <TextField
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </Stack>
          <Stack spacing={1}>
            <InputLabel htmlFor="dueDate">Due Date</InputLabel>
            <TextField
              type={"date"}
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              required
            />
          </Stack>
          <Stack spacing={1}>
            <InputLabel htmlFor="priority">Priority</InputLabel>
            <Select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <MenuItem value={"P0"}>P0</MenuItem>
              <MenuItem value={"P1"}>P1</MenuItem>
              <MenuItem value={"P2"}>P2</MenuItem>
            </Select>
          </Stack>
          <Button
            sx={{
              mt: 4,
            }}
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
}
