import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Se o usuário já estiver logado, redireciona ele para a home interna
export function PublicRoutes() {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

// Se o usuário NÃO estiver logado, leva ele de volta para o login
export function PrivateRoutes() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
