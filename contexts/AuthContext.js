import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  // Function to check if the user is logged in
  const checkUser = async () => {
    setLoading(true);
    const response = await authService.getUser();

    if (response?.error) {
      setUser(null);
    } else {
      setUser(response);
    }

    setLoading(false);
  };

  // Function login to authenticate the user
  const login = async (email, password) => {
    const response = await authService.login(email, password);

    if (response?.error) {
      return response;
    }

    await checkUser();
    return { success: true };
  };

  // Function register to create a new user and auto-login after registration
  const register = async (email, password) => {
    const response = await authService.register(email, password);

    if (response?.error) {
      return response;
    }

    return login(email, password); // Auto-login after register
  };

  // Function logout to log out the user
  // and clear the user state
  const logout = async () => {
    await authService.logout();
    setUser(null);
    await checkUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
