import { Card, Typography } from "@mui/material";
import { db } from "../configs/firebase";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function GeneralStats() {
  const { isAuthenticated } = useAuth();
  const [totalPomodoros, setTotalPomodoros] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  const getData = async () => {
    try {
      const docRef = doc(db, "analytics", isAuthenticated?.uid);
      const taskRef = doc(db, "tasks", isAuthenticated?.uid);
      const docSnap = await getDoc(docRef);
      const taskSnap = await getDoc(taskRef);
      setTotalPomodoros(docSnap.data().pomodoroCompletion.length);
      setTotalTasks(taskSnap.data().tasks.length);
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle2" my={2}>
        General Stats
      </Typography>
      <Typography variant="h6" my={2}>
        Total Pomodoros: {totalPomodoros}
      </Typography>
      <Typography variant="h6" my={2}>
        Total Tasks: {totalTasks}
      </Typography>
    </Card>
  );
}
