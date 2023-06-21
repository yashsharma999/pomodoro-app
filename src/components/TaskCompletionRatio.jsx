import { Box, Card, Typography } from "@mui/material";
import { db } from "../configs/firebase";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaskCompletionRatio() {
  const { isAuthenticated } = useAuth();
  const [taskRatio, setTaskRatio] = useState({
    completed: 0,
    pending: 0,
  });

  let data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        // data: [docSnap.data().tasks.filter((item) => item.isCompleted).length, docSnap.data().tasks.filter((item) => !item.isCompleted).length],
        data: [taskRatio.completed, taskRatio.pending],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const getData = async () => {
    try {
      const docRef = doc(db, "tasks", isAuthenticated?.uid);
      const docSnap = await getDoc(docRef);
      let completed = 0;
      let pending = 0;
      docSnap.data().tasks.forEach((item) => {
        if (item.completed) {
          completed++;
        } else {
          pending++;
        }
      });
      setTaskRatio({
        completed: completed,
        pending: pending,
      });
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  });

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle2" my={2}>
        Task Completion Ratio
      </Typography>
      <Box display="flex" justifyContent="center">
        <div
          style={{
            height: "300px",
            width: "300px",
          }}
        >
          <Pie data={data} />
        </div>
      </Box>
    </Card>
  );
}
