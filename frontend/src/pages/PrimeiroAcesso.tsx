import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/input-field";

export default function PrimeiroAcesso() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Limpa mensagens anteriores
    setError("");
    setSuccess("");

    if (!email) {
      setError("Por favor, informe seu e-mail institucional.");
      return;
    }

    setIsLoading(true);

    try {
      // Ajuste a URL e porta para a rota exata do seu backend
      const response = await fetch(
        "http://localhost:3333/api/auth/primeiro-acesso",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.erro || "Não foi possível solicitar o primeiro acesso.",
        );
      }

      // Comportamento temporário solicitado: logar no console e dar alert
      console.log(
        "Senha gerada (ambiente de desenvolvimento):",
        data.senha_gerada,
      );
      alert(`${data.mensagem}\n\nSenha Temporária: ${data.senha_gerada}`);

      setSuccess("Credenciais geradas com sucesso! Você já pode fazer login.");
      setEmail(""); // Limpa o input após o sucesso
    } catch (err: any) {
      setError(err.message || "Erro de conexão com o servidor.");
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
        <h2 className="text-lg mb-4 text-center">Sistema Acadêmico</h2>
        <p className="text-base text-[#322A6A] mb-6 max-w-sm text-center">
          Seu usuário e senha serão enviados para o seu endereço de e-mail.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col items-center"
        >
          {/* Feedback de Erro */}
          {error && (
            <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium border border-red-200">
              {error}
            </div>
          )}

          {/* Feedback de Sucesso */}
          {success && (
            <div className="w-full mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-center text-sm font-medium border border-green-200">
              {success}
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
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
        </form>

        <Link to="/" className="text-sm text-[#322A6A] underline mt-2">
          Voltar para o Login
        </Link>
      </div>

      {/* Hidden on screens smaller than 1024px */}
      <div className="hidden lg:flex lg:w-1/2 items-baseline justify-center">
        <img src="/vetor.png" alt="" className="w-164" />
      </div>
    </div>
  );
}
