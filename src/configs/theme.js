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
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
