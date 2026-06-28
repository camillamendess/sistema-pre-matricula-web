import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/input-field";
import { useAuth } from "../contexts/AuthContext";
import { UsuarioController } from "../controllers/UsuarioController";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Estados do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Estados de feedback visual
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      setIsLoading(false);
      return;
    }

    try {
      // Utiliza o controller que centraliza as regras e mapeamentos de atributos
      const data = await UsuarioController.login(email, password);

      // Repassa as credenciais validadas para o contexto gerenciar globalmente
      login(data.token, data.usuario);

      // Redirecionamento baseado no tipo do usuário vindo do backend
      if (data.usuario.tipo_usuario === 2) {
        navigate("/home");
      } else if (data.usuario.tipo_usuario === 1) {
        navigate("/admin"); // Ajuste para a sua rota de Admin/Colegiado
      } else {
        setError("Tipo de usuário inválido ou não identificado.");
      }
    } catch (err: any) {
      console.error("Erro ao fazer login", err);
      // Captura a mensagem tratada enviada pela nossa função base de requisições
      setError(
        "Um erro inesperado ocorreu. Se o problema persistir, entre em contato com suporte@uesb.edu.br.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center w-full">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-[#F8F8F8] m-0 h-full px-6">
        <img src="/logo.png" alt="Logo da Uesb" className="w-60 mb-6" />
        <h1 className="text-[#322A6A] text-3xl font-bold mb-1">
          Pré Matrícula
        </h1>
        <h2 className="text-lg mb-4">Sistema Acadêmico</h2>
        <p className="text-base text-[#322A6A] mb-4">
          Faça login para entrar no sistema.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col items-center"
        >
          {error && (
            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <InputField
            label="Usuário (E-mail)*"
            type="email"
            placeholder="Digite seu e-mail cadastrado"
            icon="user"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Senha*"
            type="password"
            placeholder="Digite sua senha"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="w-full max-w-md flex justify-between items-center m-0 mb-2">
            <div className="flex gap-1.5 ml-2">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#322A6A] scale-102 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-800 cursor-pointer"
              >
                Lembrar de mim
              </label>
            </div>
            <Link
              to="/esqueci-senha"
              className="text-sm text-[#322A6A] underline"
            >
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#322A6A] text-white text-lg py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <Link
          to="/primeiro-acesso"
          className="text-sm text-[#322A6A] underline text-center mt-4"
        >
          Clique aqui se for seu primeiro acesso
        </Link>
      </div>

      <div className="hidden lg:flex lg:w-1/2 items-baseline justify-center">
        <img src="/vetor.png" alt="" className="w-164" />
      </div>
    </div>
  );
}
