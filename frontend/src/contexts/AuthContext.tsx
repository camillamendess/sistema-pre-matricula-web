import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { UsuarioModel } from "../models/UsuarioModel";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UsuarioModel | null;
  login: (token: string, usuario: UsuarioModel) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsuarioModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Verifica se já existe uma sessão ativa ao carregar a aplicação
  useEffect(() => {
    const storedToken = localStorage.getItem("@SistemaAcademico:token");
    const storedUser = localStorage.getItem("@SistemaAcademico:user");

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // Se houver dados corrompidos no localStorage, limpa a sessão
        localStorage.removeItem("@SistemaAcademico:token");
        localStorage.removeItem("@SistemaAcademico:user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, usuario: UsuarioModel) => {
    localStorage.setItem("@SistemaAcademico:token", token);
    localStorage.setItem("@SistemaAcademico:user", JSON.stringify(usuario));
    setUser(usuario);
  };

  const logout = () => {
    localStorage.removeItem("@SistemaAcademico:token");
    localStorage.removeItem("@SistemaAcademico:user");
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        login, 
        logout, 
        isLoading 
      }}
    >
      {/* Evita renderizar as rotas protegidas antes de checar o localStorage */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}