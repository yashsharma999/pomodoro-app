import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../contexts/AuthContext";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

export default function ({ taskId }) {
  const { isAuthenticated } = useAuth();

  const handleDelete = async () => {
    try {
      //update in firebase for the current task
      const docRef = doc(db, "tasks", isAuthenticated?.uid);
      const docSnap = await getDoc(docRef);
      await updateDoc(docRef, {
        tasks: docSnap.data().tasks.filter((item) => item.taskId !== taskId),
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <IconButton size="small" onClick={handleDelete}>
      <DeleteIcon fontSize="small" color="primary" />
    </IconButton>
  );
}
