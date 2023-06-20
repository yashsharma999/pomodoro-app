import { Box, Checkbox } from "@mui/material";
import { useState } from "react";

export default function StatusCheckbox({ completed }) {
  const [status, setStatus] = useState(completed);

  const handleCheckboxChange = (event) => {
    setStatus(event.target.checked);
  };

  return (
    <Box>
      <Checkbox
        checked={status}
        onChange={handleCheckboxChange}
        color="primary"
      />
      <span>{status ? "Done" : "Todo"}</span>
    </Box>
  );
}
