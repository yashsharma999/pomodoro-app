import { ThemeProvider } from "@mui/material/styles";
import { createContext, useState } from "react";
import { darkTheme, lightTheme } from "../configs/theme";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");

  const handleThemeChange = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
  };

  const currentTheme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        handleThemeChange,
      }}
    >
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAuth = () => React.useContext(ThemeContext);
