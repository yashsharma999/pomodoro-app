import {
  Avatar,
  useTheme,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";

export default function Navigation() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [signOut, loading, error] = useSignOut(auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl ? true : false;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ background: `${theme.palette.primary.main}`, px: 2, py: 1 }}
    >
      <Box>
        <Stack direction={"row"} gap={2}>
          <Link style={{ textDecoration: "none" }} to="/">
            <Typography color={`${theme.linkText.color}`}>Pomodoro</Typography>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/tasks">
            <Typography color={`${theme.linkText.color}`}>Tasks</Typography>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/analytics">
            <Typography color={`${theme.linkText.color}`}>Analytics</Typography>
          </Link>
        </Stack>
      </Box>
      <Box>
        <IconButton onClick={handleClick}>
          <Avatar></Avatar>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem
            onClick={async () => {
              localStorage.clear();
              await signOut();
              navigate("/login");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Stack>
  );
}
