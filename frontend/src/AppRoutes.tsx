import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Adjust the path if necessary
import Login from "./pages/Login";
import FirstAccess from "./pages/FirstAccess";
import ForgotPassword from "./pages/ForgotPassword";
import HomeAluno from "./pages/HomeAluno";
import { JSX } from "react/jsx-runtime";

// Flag so the developer can access protected routes without logging in
const DEV_BYPASS_AUTH = true;

// Wrapper component to protect routes
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated && !DEV_BYPASS_AUTH) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/primeiro-acesso" element={<FirstAccess />} />
          <Route path="/esqueci-senha" element={<ForgotPassword />} />
          <Route 
            path="/home-aluno" 
            element={
              <ProtectedRoute>
                <HomeAluno />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;