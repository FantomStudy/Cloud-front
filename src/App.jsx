import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import { Toaster } from "react-hot-toast";
import UserFilePage from "./pages/UserFilePage/UserFilePage";

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
            path="/myAccess"
            element={
              <ProtectedRoute>
                <UserFilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Toaster position="top-center" />
    </>
  );
}
