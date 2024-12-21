import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { isAuthenticated, logout } from "../requests/authRequests";

const AuthContext = createContext();

// провайдер предоставит доступ к контексту
export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  // использовать после успешного логина
  const handleLogin = () => setIsAuth(true);

  // выход из системы
  const handleLogout = async () => {
    const response = await logout();
    toast.success(response.message);
    setIsAuth(false);
    <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider value={{ isAuth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
