import React, { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated, logout } from "./authRequests";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

// создается контекст чтобы прокидывать пропсы быстрее
const AuthContext = createContext();

// провайдер предоставит доступ к контексту
export const AuthProvider = ({ children }) => {
  // общий стейт
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

// хук содержит все что внутри провайдера
export const useAuth = () => useContext(AuthContext);
