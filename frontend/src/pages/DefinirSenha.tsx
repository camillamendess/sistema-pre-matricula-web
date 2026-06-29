import { useState, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/input-field";
import { UsuarioController } from "../controllers/UsuarioController";

interface LocalizacaoDefinirSenha {
  acesso?: string;
  email?: string;
}

export default function DefinirSenha() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocalizacaoDefinirSenha;

  const [senha, setSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!state.acesso) {
      setError("Solicite o primeiro acesso novamente.");
      return;
    }

    if (senha.length < 8) {
      setError("A senha deve ter no minimo 8 caracteres.");
      return;
    }

    if (senha !== confirmacao) {
      setError("As senhas informadas nao conferem.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await UsuarioController.definirSenha(state.acesso, senha);
      setSuccess(data.mensagem);
      setTimeout(() => navigate("/", { replace: true }), 1200);
    } catch (err: any) {
      setError(err.message || "Nao foi possivel definir a senha.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center w-full">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-[#F8F8F8] m-0 h-full px-6">
        <img src="/logo.png" alt="Logo da Uesb" className="w-60 mb-6" />
        <h1 className="text-[#322A6A] text-3xl font-bold mb-1 text-center">
          Definir Senha
        </h1>
        <h2 className="text-lg mb-4 text-center">Sistema Academico</h2>
        <p className="text-base text-[#322A6A] mb-6 max-w-sm text-center">
          Escolha a senha que sera usada nos proximos acessos.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col items-center"
        >
          {state.email && (
            <div className="w-full mb-4 p-3 bg-white text-[#322A6A] rounded-lg text-center text-sm font-medium border border-gray-200">
              {state.email}
            </div>
          )}

          {error && (
            <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="w-full mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-center text-sm font-medium border border-green-200">
              {success}
            </div>
          )}

          <InputField
            label="Nova senha*"
            type="password"
            placeholder="Minimo de 8 caracteres"
            icon="lock"
            value={senha}
            minLength={8}
            onChange={(e: any) => setSenha(e.target.value)}
          />

          <InputField
            label="Confirmar senha*"
            type="password"
            placeholder="Digite a senha novamente"
            icon="lock"
            value={confirmacao}
            minLength={8}
            onChange={(e: any) => setConfirmacao(e.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full my-4 bg-[#322A6A] text-white text-lg py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? "Salvando..." : "Salvar senha"}
          </button>
        </form>

        <Link to="/primeiro-acesso" className="text-sm text-[#322A6A] underline mt-2">
          Solicitar primeiro acesso novamente
        </Link>
      </div>

      <div className="hidden lg:flex lg:w-1/2 items-baseline justify-center">
        <img src="/vetor.png" alt="" className="w-164" />
      </div>
    </div>
  );
}
