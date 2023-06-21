import {
  Avatar,
  useTheme,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";
import { useAuth } from "../contexts/AuthContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeContext } from "../contexts/ThemeContext";

export default function Navigation() {
  const { handleThemeChange, themeMode } = useThemeContext();
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
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
      sx={{
        background: `${theme.navigation.main}`,
        px: 2,
        py: 1,
      }}
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
          <Avatar src={isAuthenticated?.photoURL ?? ""}></Avatar>
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
          <MenuItem>
            <Stack direction={"row"} alignItems={"center"}>
              <LightModeIcon />
              <Switch
                checked={themeMode === "dark"}
                onChange={handleThemeChange}
              />
              <DarkModeIcon />
            </Stack>
          </MenuItem>

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
