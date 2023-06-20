import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [currentTask, setCurrentTask] = useState();

  return (
    <DataContext.Provider
      value={{
        currentTask,
        setCurrentTask,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
