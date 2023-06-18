import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../configs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
