import {
  Box,
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import PauseIcon from "@mui/icons-material/Pause";
import { useData } from "../contexts/DataContext";
import { db } from "../configs/firebase";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDocument } from "react-firebase-hooks/firestore";
import { POMODORO, SHORT_BREAK, LONG_BREAK, quotes } from "../constants";
import { useNotification } from "../contexts/NotificationContext";

export default function PomodoroBox({ disabled }) {
  const theme = useTheme();
  const { handleNotificationMsg } = useNotification();
  const { isAuthenticated } = useAuth();
  const { currentTask, timeFormat } = useData();
  const [key, setKey] = useState(0);
  const [time, setTime] = useState(POMODORO);

  useEffect(() => {
    if (timeFormat === "seconds") {
      setTime(POMODORO);
    } else {
      setTime(POMODORO * 60);
    }
  }, [timeFormat]);

  const [start, setStart] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  //listen for changes in currentTask
  const [value, loading, error] = useDocument(
    doc(db, "tasks", isAuthenticated?.uid)
  );
  const taskListener = value
    ?.data()
    ?.tasks?.find((item) => item.taskId === currentTask?.taskId);

  useEffect(() => {
    let timer = null;
    if (start) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.seconds > 0) {
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          } else if (prevTime.minutes > 0) {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          } else {
            clearInterval(timer);
            return prevTime;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [start]);

  function getRandomQuote(quotes) {
    var randomIndex = Math.floor(Math.random() * quotes.length);
    var randomQuote = quotes[randomIndex];
    return randomQuote;
  }

  const handlePomodoroComplete = async () => {
    setStart(false);
    setIsRunning(false);

    //update pomodoro count in firebase
    const docRef = doc(db, "tasks", isAuthenticated.uid);
    const analyticsRef = doc(db, "analytics", isAuthenticated.uid);
    if (time !== LONG_BREAK && time !== SHORT_BREAK) {
      getDoc(docRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const newArray = [...data.tasks];
          const index = newArray.findIndex(
            (item) => item.taskId === taskListener.taskId
          );
          newArray[index] = {
            ...taskListener,
            sessions: taskListener?.sessions + 1,
          };
          setDoc(docRef, {
            tasks: newArray,
          });
          handleNotificationMsg({
            msg: (
              <Stack>
                <Typography variant="body2">Pomodoro Completed</Typography>
                <Typography variant="body2">
                  {getRandomQuote(quotes).quote}
                </Typography>
                <Typography variant="caption">
                  - {getRandomQuote(quotes).author}
                </Typography>
              </Stack>
            ),
            action: {
              closable: true,
            },
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        }
      });
      //update pomodoro completion in firebase
      await setDoc(
        analyticsRef,
        {
          pomodoroCompletion: arrayUnion(new Date()),
        },
        {
          merge: true,
        }
      );
    }

    setKey((prevKey) => prevKey + 1);

    if (time === POMODORO && taskListener?.sessions % 4 === 3) {
      setTime(LONG_BREAK);
    } else if (time === POMODORO) {
      setTime(SHORT_BREAK);
    } else {
      setTime(POMODORO);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          p: 2,
          position: "relative",
        }}
      >
        <Stack
          mb={1}
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Typography variant="body2">
            {`Total Pomodoros: ${taskListener?.sessions ?? 0}`}
          </Typography>
          <IconButton size="small">
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Stack alignItems={"center"}>
          <CountdownCircleTimer
            key={key}
            duration={time}
            isPlaying={isRunning}
            colors={theme.palette.primary.main}
            size={250}
            onComplete={() => {
              handlePomodoroComplete();
            }}
          >
            {({ remainingTime }) => {
              const minutes = Math.floor(remainingTime / 60);
              const seconds = remainingTime % 60;
              const formattedTime = `${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

              return <Typography variant="h2">{formattedTime}</Typography>;
            }}
          </CountdownCircleTimer>
          <SessionBox pomodoros={taskListener?.sessions ?? 0} time={time} />
          {isRunning ? (
            <IconButton
              disabled={disabled}
              onClick={(p) => setIsRunning(false)}
            >
              <PauseIcon />
            </IconButton>
          ) : (
            <IconButton disabled={disabled} onClick={(p) => setIsRunning(true)}>
              <PlayArrowIcon />
            </IconButton>
          )}
        </Stack>
      </Card>
    </>
  );
}

const SessionBox = ({ pomodoros = 0, time }) => {
  return (
    <Stack direction={"row"} my={1} gap={1}>
      {[1, 2, 3, 4].map((item) => {
        return (
          <Box
            key={item}
            sx={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: "1px solid black",
              backgroundColor:
                pomodoros % 4 >= item || time === LONG_BREAK
                  ? "black"
                  : "white",
            }}
          ></Box>
        );
      })}
    </Stack>
  );
};
