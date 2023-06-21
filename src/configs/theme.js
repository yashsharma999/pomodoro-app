import { createTheme } from "@mui/material/styles";

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#8f8f8f",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    color: "#000",
  },
  navbar: {
    main: "#808080",
  },
  linkText: {
    color: "#fff",
  },
  navigation: {
    main: "#1976d2",
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  navbar: {
    main: "#808080",
  },
  primary: {
    main: "#fff",
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    color: "#fff",
  },
  navigation: {
    main: "rgba(10, 25, 41, 0.8)",
  },
  linkText: {
    color: "#fff",
  },
});
//rgba(10, 25, 41, 0.8)

export { lightTheme, darkTheme };
