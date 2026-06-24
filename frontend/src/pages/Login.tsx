import InputField from "../components/input-field/input-field";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <div className="w-1/2 flex flex-col items-center justify-center bg-[#F8F8F8] m-0 h-full">
        <img src="/logo.png" alt="Logo da Uesb" className="w-60 mb-6" />
        <h1 className="text-[#322A6A] text-3xl font-bold mb-1">
          Pré-Matrícula
        </h1>
        <h2 className="text-lg mb-4">Sistema Acadêmico</h2>
        <p className="text-base text-[#322A6A] mb-4">
          Faça login para entrar no sistema.
        </p>
        <InputField
          label="Usuário*"
          type="text"
          placeholder="Nome de usuário"
          icon="user"
        />

        <InputField
          label="Senha*"
          type="password"
          placeholder="Digite sua senha"
          icon="lock"
        />
        <div className="w-full max-w-md flex justify-between items-center m-0">
          <div className="flex gap-1.5 ml-2">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="accent-[#322A6A] scale-102"
            />
            <label htmlFor="remember" className="text-sm text-gray-800 ">
              Lembrar de mim
            </label>
          </div>
          <a href="" className="text-sm text-[#322A6A] underline">
            Esqueci minha senha
          </a>
        </div>
        <button className="max-w-md w-full my-4 bg-[#322A6A] text-white text-lg py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer">
          Entrar
        </button>
        <a href="" className="text-sm text-[#322A6A] underline">
          Clique aqui se for seu primeiro acesso{" "}
        </a>
      </div>
      <div className="w-1/2 flex items-baseline justify-center">
        <img src="/vetor.png" alt="" className="w-164" />
      </div>
    </div>
  );
}
