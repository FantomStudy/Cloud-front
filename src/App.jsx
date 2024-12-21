import "./App.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import UserFilePage from "./pages/UserFilePage/UserFilePage";
import RecievedFilePage from "./pages/RecievedFilePage/RecievedFilePage";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <UserFilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/access"
            element={
              <ProtectedRoute>
                <RecievedFilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Toaster position="top-center" />
    </>
  );
}
