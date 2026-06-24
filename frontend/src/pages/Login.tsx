import InputField from "../components/input-field/input-field";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <div className="w-1/2 flex flex-col items-center justify-center">
        <img src="/logo.png" alt="Logo da Uesb" className="w-[309px] mb-8" />
        <h1 className="text-[#322A6A] text-4xl font-bold">Pré-Matrícula</h1>
        <h2 className="text-xl mb-4">Sistema Acadêmico</h2>
        <p className="text-lg text-[#322A6A]">
          Faça login para entrar no sistema.
        </p>
        <InputField
          label="Usuário"
          type="text"
          placeholder="Nome de usuário"
          icon="user"
        />

        <InputField
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          icon="lock"
        />

        <button className="max-w-md w-full mt-4 bg-[#322A6A] text-white py-3 rounded-lg font-medium hover:bg-[#251c61] transition-colors cursor-pointer">
          Entrar
        </button>
      </div>
      <div className="w-1/2 flex items-baseline justify-center">
        <img src="/vetor.png" alt="" />
      </div>
    </div>
  );
}
