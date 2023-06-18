import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const isSmall = useMediaQuery("(max-width: 576px)");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, user2, loading2, error2] =
    useCreateUserWithEmailAndPassword(auth);

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
        await signInWithEmailAndPassword(form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(form.email, form.password);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems={"center"}
      sx={{
        height: "100vh",
      }}
    >
      <form
        style={{
          width: !isSmall ? "400px" : "100%",
          padding: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <Stack direction={"column"} gap={2}>
          <Typography variant="h3">
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
            <Typography variant="body2">OR</Typography>
          </Divider>
          <Button variant="contained">Sign in with Google</Button>
          {authType === "login" ? (
            <Typography>
              Don't have an account?
              <Button onClick={() => setAuthType("signup")}>Sign Up</Button>
            </Typography>
          ) : (
            <Typography>
              Already have an account?
              <Button onClick={() => setAuthType("login")}>Sign In</Button>
            </Typography>
          )}
        </Stack>
      </form>
    </Grid>
  );
}
