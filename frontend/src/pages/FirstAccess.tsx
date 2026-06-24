import { Link } from "react-router-dom";
import InputField from "../components/input-field/input-field";

export default function FirstAccess() {
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <div className="w-1/2 flex flex-col items-center justify-center bg-[#F8F8F8] m-0 h-full">
        <img src="/logo.png" alt="Logo da Uesb" className="w-60 mb-6" />
        <h1 className="text-[#322A6A] text-3xl font-bold mb-1">
          Primeiro Acesso
        </h1>
        <h2 className="text-lg mb-4">Sistema Acadêmico</h2>
        <p className="text-base text-[#322A6A] mb-6 max-w-sm text-center">
          Seu usuário e senha serão enviados para o seu endereço de e-mail.
        </p>

        <InputField
          label="E-mail*"
          type="email"
          placeholder="Digite seu e-mail"
          icon="mail"
        />

        <button className="max-w-md w-full my-4 bg-[#322A6A] text-white text-lg py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer">
          Enviar
        </button>

        <Link to="/" className="text-sm text-[#322A6A] underline mt-2">
          Voltar para o Login
        </Link>
      </div>
      <div className="w-1/2 flex items-baseline justify-center">
        <img src="/vetor.png" alt="" className="w-164" />
      </div>
    </div>
  );
}
