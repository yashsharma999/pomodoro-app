import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../configs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const isAuthenticated = user || JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
