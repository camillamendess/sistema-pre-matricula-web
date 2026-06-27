import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import FirstAccess from "./pages/FirstAccess";
import ForgotPassword from "./pages/ForgotPassword";
import HomeAluno from "./pages/HomeAluno";
import EnrollCourses from "./pages/EnrollCourses"; // Import the new page
import { JSX } from "react/jsx-runtime";

const DEV_BYPASS_AUTH = true;

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
          
          {/* Protected Routes Block */}
          <Route 
            path="/home-aluno" 
            element={
              <ProtectedRoute>
                <HomeAluno />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/matricular" 
            element={
              <ProtectedRoute>
                <EnrollCourses />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;