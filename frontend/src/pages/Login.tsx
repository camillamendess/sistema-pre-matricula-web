import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/input-field";
import { useAuth } from "../contexts/AuthContext";

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
    setError(""); // Limpa erros anteriores
    setIsLoading(true);

    try {
      // Ajuste a URL base conforme a porta que o seu Node.js (Express) estiver rodando
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Se a resposta não for 2xx (ex: 401 Unauthorized do seu AuthController)
        throw new Error();
      }

      // Lógica do "Lembrar de mim":
      // Se marcado, salva em localStorage (persiste após fechar o navegador).
      // Se não, salva em sessionStorage (limpa ao fechar a aba).
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("@App:token", data.token); // Ajuste a chave conforme seu AuthContext
      if (data.usuario) {
        storage.setItem("@App:user", JSON.stringify(data.usuario));
      }

      // Atualiza o contexto de autenticação com os dados recebidos
      login(data);

      // Redireciona o usuário para a página home
      navigate("/home");

    } catch (err) {
      // Mensagem amigável padronizada para falha de login
      setError("E-mail ou senha incorretos.");
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
        <p className="text-base text-[#322A6A] mb-4 text-center">
          Faça login para entrar no sistema.
        </p>
        
        {/* Formulário com onSubmit */}
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center">
          
          {/* Exibição condicional da mensagem de erro */}
          {error && (
            <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium border border-red-200">
              {error}
            </div>
          )}

          {/* Assumindo que seu InputField aceite as props value e onChange */}
          <InputField
            label="E-mail*"
            type="email"
            placeholder="Digite seu e-mail"
            icon="user"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <InputField
            label="Senha*"
            type="password"
            placeholder="Digite sua senha"
            icon="lock"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          
          <div className="w-full flex justify-between items-center m-0 mb-4">
            <div className="flex gap-1.5 ml-2 items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#322A6A] scale-102 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-gray-800 cursor-pointer">
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
          
          {/* Botão do tipo submit */}
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