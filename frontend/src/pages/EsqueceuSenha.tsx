import { Link } from "react-router-dom";
import InputField from "../components/input-field";

export default function EsqueceuSenha() {
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-[#F8F8F8] m-0 h-full px-6">
        <img src="/logo.png" alt="Logo da Uesb" className="w-60 mb-6" />
        <h1 className="text-[#322A6A] text-3xl font-bold mb-1 text-center">
          Recuperar Senha
        </h1>
        <h2 className="text-lg mb-4 text-center">Sistema Acadêmico</h2>
        <p className="text-base text-[#322A6A] mb-6 max-w-md text-center">
          A sua senha será enviada para o endereço de e-mail cadastrado em nosso
          sistema.
        </p>

        <InputField
          label="Matrícula*"
          type="text"
          placeholder="Digite sua matrícula"
          icon="file"
        />

        <button className="max-w-md w-full my-4 bg-[#322A6A] text-white text-lg py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer">
          Recuperar
        </button>

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
