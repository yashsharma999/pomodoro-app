import { ThemeProvider } from "@mui/material/styles";
import { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme } from "../configs/theme";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const handleThemeChange = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
    localStorage.setItem("theme", newThemeMode);
  };

  const currentTheme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        currentTheme,
        handleThemeChange,
      }}
    >
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
