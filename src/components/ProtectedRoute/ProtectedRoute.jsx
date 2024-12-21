import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function ProtectedRoute({ children }) {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="/login" />;
}
