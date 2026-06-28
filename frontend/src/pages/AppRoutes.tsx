import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import FirstAccess from "./pages/FirstAccess";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import EnrollCourses from "./pages/EnrollCourses"; // Import the new page
import { JSX } from "react/jsx-runtime";
import Reports from "./pages/Reports";
import CadastroAluno from "./pages/CadastroAluno";
import Alunos from "./pages/Alunos";
import Disciplinas from "./pages/Disciplinas";
import Turmas from "./pages/Turmas";

const DEV_BYPASS_AUTH = false;

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
          <Route path="/cadastro" element={<CadastroAluno />} />
          
          {/* Protected Routes Block */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
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
          <Route 
            path="/pre-matriculas" 
            element={
              <ProtectedRoute>
                <EnrollCourses />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute>
                <EnrollCourses />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/alunos" 
            element={
              <ProtectedRoute>
                <Alunos />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/disciplinas" 
            element={
              <ProtectedRoute>
                <Disciplinas />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/turmas"
            element={
              <ProtectedRoute>
                <Turmas />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/relatorios" 
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;