import { Card, Typography, useTheme } from "@mui/material";
import {
  addDays,
  startOfWeek,
  endOfWeek,
  format,
  addWeeks,
  subWeeks,
} from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../configs/firebase";
import WeeklyToggle from "./WeeklyToggle";
import { doc } from "firebase/firestore";
import { isWithinInterval } from "date-fns";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const initialPomodoroData = {
  Sunday: {
    pomodoros: 0,
  },
  Monday: {
    pomodoros: 0,
  },
  Tuesday: {
    pomodoros: 0,
  },
  Wednesday: {
    pomodoros: 0,
  },
  Thursday: {
    pomodoros: 0,
  },

  Friday: {
    pomodoros: 0,
  },
  Saturday: {
    pomodoros: 0,
  },
};

const labels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function PomodoroAnalytics() {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const [value, loading, error] = useDocument(
    doc(db, "analytics", isAuthenticated.uid)
  );
  const [pomodoroData, setPomodoroData] = useState(initialPomodoroData);

  const [startDate, setStartDate] = useState(startOfWeek(new Date()));
  const [endDate, setEndDate] = useState(endOfWeek(new Date()));

  useEffect(() => {
    setPomodoroData(initialPomodoroData);
    value?.data()?.pomodoroCompletion.map((item) => {
      if (isWithinInterval(item.toDate(), { start: startDate, end: endDate })) {
        setPomodoroData((prevState) => ({
          ...prevState,
          [format(item.toDate(), "EEEE")]: {
            pomodoros: prevState[format(item.toDate(), "EEEE")].pomodoros + 1,
          },
        }));
      }
    });
  }, [startDate, endDate, value]);

  const handlePreviousWeek = () => {
    setStartDate(subWeeks(startDate, 1));
    setEndDate(subWeeks(endDate, 1));
  };

  const handleNextWeek = () => {
    setStartDate(addWeeks(startDate, 1));
    setEndDate(addWeeks(endDate, 1));
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Pomodoros",
        data: labels.map((label) => pomodoroData[label]?.pomodoros ?? 0),
        backgroundColor: theme.palette.primary.main,
      },
    ],
    backgroundColor: "rgba(75, 192, 192, 0.2)",
  };

  const options = {
    indexAxis: "x",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function (context) {
            const daysToAdd = context[0].dataIndex;
            const date = addDays(startDate, daysToAdd);
            return `${context[0].label} - ${format(date, "dd/MMMM/yyyy")}`;
          },
        },
      },
    },
  };

  return (
    <Card sx={{ px: 2 }}>
      <Typography variant="subtitle2" my={2}>
        Weekly Statistics
      </Typography>
      <WeeklyToggle
        startDate={startDate}
        endDate={endDate}
        handleNextWeek={handleNextWeek}
        handlePreviousWeek={handlePreviousWeek}
      />
      <Bar data={data} options={options} />
    </Card>
  );
}
