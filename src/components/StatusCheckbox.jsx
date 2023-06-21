import { Box, Checkbox } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../configs/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export default function StatusCheckbox({ completed, id }) {
  const { isAuthenticated } = useAuth();
  const [status, setStatus] = useState(completed);

  const handleCheckboxChange = async (event) => {
    try {
      setStatus(event.target.checked);
      //update in firebase for the current task
      const docRef = doc(db, "tasks", isAuthenticated?.uid);
      const docSnap = await getDoc(docRef);

      await updateDoc(docRef, {
        tasks: docSnap.data().tasks.map((item) => {
          if (item.taskId === id) {
            return {
              ...item,
              completed: event.target.checked,
            };
          }
          return item;
        }),
      });
    } catch (err) {
      console.log(err);
    }

    // docRef.updateDoc({
    //   tasks: [...docSnap.data().tasks, objToUpdate],
    // });
  };

  return (
    <Box>
      <Checkbox
        checked={status}
        onChange={handleCheckboxChange}
        color="primary"
      />
      {/* <span>{status ? "Done" : "Todo"}</span> */}
    </Box>
  );
}
