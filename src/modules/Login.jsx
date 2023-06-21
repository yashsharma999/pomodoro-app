import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect } from "react";
import { useNotification } from "../contexts/NotificationContext";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeContext } from "../contexts/ThemeContext";

export default function Login() {
  const theme = useTheme();
  const { handleThemeChange, themeMode } = useThemeContext();
  const navigate = useNavigate();
  const { handleNotificationMsg } = useNotification();
  const isSmall = useMediaQuery("(max-width: 576px)");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, user2, loading2, error2] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, user3, loading3, error3] = useSignInWithGoogle(auth);

  const [authType, setAuthType] = useState("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (authType === "login") {
        const resp = await signInWithEmailAndPassword(
          form.email,
          form.password
        );
        localStorage.setItem("user", JSON.stringify(resp.user));
        navigate("/");
      } else {
        await createUserWithEmailAndPassword(form.email, form.password);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (error || error2) {
      handleNotificationMsg({
        msg: error?.message || error2?.message,
        action: {
          closable: true,
        },
        autoHideDuration: 4000,
      });
    }
  }, [error, error2]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems={"center"}
      sx={{
        position: "relative",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{
          position: "absolute",
          top: "0px",
          right: "1rem",
        }}
      >
        <LightModeIcon color="primary" />
        <Switch checked={themeMode === "dark"} onChange={handleThemeChange} />
        <DarkModeIcon color="primary" />
      </Stack>
      <form
        style={{
          width: !isSmall ? "400px" : "100%",
          padding: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <Stack direction={"column"} gap={2}>
          <Typography variant="h3" color={theme.palette.primary.main}>
            {authType === "login" ? "👋 Welcome" : "Create an account"}
          </Typography>
          <Typography variant="subtitle1" color={"secondary"}>
            {authType === "login"
              ? "Please enter your credentials"
              : "Please enter your details to create an account"}
          </Typography>
          <Box>
            <TextField
              name="email"
              label="Email"
              sx={{ width: "100%" }}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              sx={{ width: "100%" }}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button sx={{ mt: 4 }} variant="outlined" type="submit">
            {authType === "login" ? "Sign In" : "Sign Up"}
          </Button>
          <Divider sx={{ my: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              OR
            </Typography>
          </Divider>
          <Button variant="contained" onClick={handleGoogleAuth}>
            Sign in with Google
          </Button>
          {authType === "login" ? (
            <Typography
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              Don't have an account?
              <Button onClick={() => setAuthType("signup")}>Sign Up</Button>
            </Typography>
          ) : (
            <Typography
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              Already have an account?
              <Button onClick={() => setAuthType("login")}>Sign In</Button>
            </Typography>
          )}
        </Stack>
      </form>
    </Grid>
  );
}
