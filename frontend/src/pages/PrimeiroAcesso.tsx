import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/input-field";
import { UsuarioController } from "../controllers/UsuarioController";

export default function PrimeiroAcesso() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Por favor, informe seu e-mail institucional.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await UsuarioController.primeiroAcesso(email);
      navigate("/definir-senha", {
        state: {
          acesso: data.acesso,
          email,
        },
      });
    } catch (err: any) {
      setError(err.message || "Erro de conexao com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center w-full">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-[#F8F8F8] m-0 h-full px-6">
        <img src="/logo.png" alt="Logo da Uesb" className="w-60 mb-6" />
        <h1 className="text-[#322A6A] text-3xl font-bold mb-1 text-center">
          Primeiro Acesso
        </h1>
        <h2 className="text-lg mb-4 text-center">Sistema Academico</h2>
        <p className="text-base text-[#322A6A] mb-6 max-w-sm text-center">
          Informe o e-mail cadastrado pela coordenacao para iniciar seu acesso.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col items-center"
        >
          {error && (
            <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium border border-red-200">
              {error}
            </div>
          )}

          <InputField
            label="E-mail*"
            type="email"
            placeholder="Digite seu e-mail"
            icon="mail"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full my-4 bg-[#322A6A] text-white text-lg py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verificando..." : "Continuar"}
          </button>
        </form>

        <Link to="/" className="text-sm text-[#322A6A] underline mt-2">
          Voltar para o Login
        </Link>
      </div>

      <div className="hidden lg:flex lg:w-1/2 items-baseline justify-center">
        <img src="/vetor.png" alt="" className="w-164" />
      </div>
    </div>
  );
}
