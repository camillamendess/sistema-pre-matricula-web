import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import PrimeiroAcesso from "./pages/PrimeiroAcesso";
import EsqueceuSenha from "./pages/EsqueceuSenha";
import Home from "./pages/Home";
import RealizarMatriculas from "./pages/RealizarMatriculas";
import Relatorios from "./pages/Relatorios";
import Alunos from "./pages/Alunos";
import Disciplinas from "./pages/Disciplinas";
import Turmas from "./pages/Turmas";
import Matriculas from "./pages/Matriculas";
import Perfil from "./pages/Perfil";
import CadastroAdmin from "./pages/CadastroAdmin";
import { JSX } from "react/jsx-runtime";

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
          {/* ================= ROTAS PÚBLICAS / AUTENTICAÇÃO ================= */}
          <Route path="/" element={<Login />} />
          <Route path="/primeiro-acesso" element={<PrimeiroAcesso />} />
          <Route path="/esqueci-senha" element={<EsqueceuSenha />} />

          {/* ================= ROTAS COMUNS (ALUNO E ADMIN ACESSAM) ================= */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
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
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />

          {/* ================= ROTAS EXCLUSIVAS DO ALUNO ================= */}
          <Route
            path="/matricular"
            element={
              <ProtectedRoute>
                <RealizarMatriculas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matriculas"
            element={
              <ProtectedRoute>
                <Matriculas />
              </ProtectedRoute>
            }
          />

          {/* ================= ROTAS EXCLUSIVAS DO ADMIN ================= */}
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
                <Relatorios />
              </ProtectedRoute>
            }
          />

          {/* Admin - Gerenciamento de cadastros */}
          <Route
            path="/admin/cadastrar-aluno"
            element={
              <ProtectedRoute>
                <CadastroAdmin tipo="aluno" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cadastrar-disciplina"
            element={
              <ProtectedRoute>
                <CadastroAdmin tipo="disciplina" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cadastrar-turma"
            element={
              <ProtectedRoute>
                <CadastroAdmin tipo="turma" />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;
