import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [currentTask, setCurrentTask] = useState();
  const [timeFormat, setTimeFormat] = useState("minutes"); // minutes | seconds

  return (
    <DataContext.Provider
      value={{
        currentTask,
        setCurrentTask,
        timeFormat,
        setTimeFormat,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
