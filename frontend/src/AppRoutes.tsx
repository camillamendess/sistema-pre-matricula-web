import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import PrimeiroAcesso from "./pages/PrimeiroAcesso";
import DefinirSenha from "./pages/DefinirSenha";
import EsqueceuSenha from "./pages/EsqueceuSenha";
import Home from "./pages/Home";
import RealizarMatriculas from "./pages/RealizarMatriculas";
import Relatorios from "./pages/Relatorios";
import Alunos from "./pages/Alunos";
import AlunoDetalhe from "./pages/AlunoDetalhe";
import Disciplinas from "./pages/Disciplinas";
import DisciplinaDetalhe from "./pages/DisciplinaDetalhe";
import EditarDisciplina from "./pages/EditarDisciplina";
import NovaTurmaDisciplina from "./pages/NovaTurmaDisciplina";
import EditarTurma from "./pages/EditarTurma";
import Turmas from "./pages/Turmas";
import TurmaDetalhe from "./pages/TurmaDetalhe";
import Matriculas from "./pages/Matriculas";
import ComprovanteMatricula from "./pages/ComprovanteMatricula";
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

const RoleRoute = ({
  children,
  allowedTypes,
}: {
  children: JSX.Element;
  allowedTypes: number[];
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated && !DEV_BYPASS_AUTH) {
    return <Navigate to="/" replace />;
  }

  if (!DEV_BYPASS_AUTH && user && !allowedTypes.includes(user.tipo_usuario)) {
    return <Navigate to="/home" replace />;
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
          <Route path="/definir-senha" element={<DefinirSenha />} />
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
            path="/disciplinas/:id"
            element={
              <RoleRoute allowedTypes={[1]}>
                <DisciplinaDetalhe />
              </RoleRoute>
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
              <RoleRoute allowedTypes={[2]}>
                <RealizarMatriculas />
              </RoleRoute>
            }
          />
          <Route
            path="/matriculas"
            element={
              <RoleRoute allowedTypes={[2]}>
                <Matriculas />
              </RoleRoute>
            }
          />
          <Route
            path="/comprovante-matricula"
            element={
              <RoleRoute allowedTypes={[2]}>
                <ComprovanteMatricula />
              </RoleRoute>
            }
          />

          {/* ================= ROTAS EXCLUSIVAS DO ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <RoleRoute allowedTypes={[1]}>
                <Home />
              </RoleRoute>
            }
          />
          <Route
            path="/alunos"
            element={
              <RoleRoute allowedTypes={[1]}>
                <Alunos />
              </RoleRoute>
            }
          />
          <Route
            path="/alunos/:id"
            element={
              <RoleRoute allowedTypes={[1]}>
                <AlunoDetalhe />
              </RoleRoute>
            }
          />
          <Route
            path="/turmas"
            element={
              <RoleRoute allowedTypes={[1]}>
                <Turmas />
              </RoleRoute>
            }
          />
          <Route
            path="/turmas/:id"
            element={
              <RoleRoute allowedTypes={[1]}>
                <TurmaDetalhe />
              </RoleRoute>
            }
          />
          <Route
            path="/relatorios"
            element={
              <RoleRoute allowedTypes={[1]}>
                <Relatorios />
              </RoleRoute>
            }
          />

          {/* Admin - Gerenciamento de cadastros */}
          <Route
            path="/admin/cadastrar-aluno"
            element={
              <RoleRoute allowedTypes={[1]}>
                <CadastroAdmin tipo="aluno" />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/cadastrar-disciplina"
            element={
              <RoleRoute allowedTypes={[1]}>
                <CadastroAdmin tipo="disciplina" />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/editar-disciplina/:id"
            element={
              <RoleRoute allowedTypes={[1]}>
                <EditarDisciplina />
              </RoleRoute>
            }
          />
          <Route
            path="/disciplinas/:id/nova-turma"
            element={
              <RoleRoute allowedTypes={[1]}>
                <NovaTurmaDisciplina />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/cadastrar-turma"
            element={
              <RoleRoute allowedTypes={[1]}>
                <CadastroAdmin tipo="turma" />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/editar-turma/:id"
            element={
              <RoleRoute allowedTypes={[1]}>
                <EditarTurma />
              </RoleRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;
