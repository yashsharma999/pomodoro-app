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
});

export { lightTheme, darkTheme };
