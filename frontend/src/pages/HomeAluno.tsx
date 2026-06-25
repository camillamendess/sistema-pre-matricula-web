import logOutIcon from "../assets/icons/logout.svg";
import LargeCard from "../components/large-card";
import Sidebar from "../components/sidebar";
import SmallCard from "../components/small-card";

export default function HomeAluno() {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <Sidebar role="aluno" />

      <main className="flex-1 flex flex-col p-12 overflow-y-auto relative">
        <button className="absolute top-12 right-12 flex items-center gap-2 text-[#322A6A] hover:text-[#272057] transition-colors cursor-pointer font-medium text-sm">
          <span>Encerrar Sessão</span>
          <img src={logOutIcon} alt="Logout" className="w-5 h-5" />
        </button>

        <header className="mb-10">
          <h2 className="text-[#322A6A] text-3xl font-bold mb-1">
            Olá, Fulano!
          </h2>
          <p className="text-[#332a6ad0] font-medium">
            Realize sua pré-matrícula nas disciplinas do semestre.
          </p>
        </header>

        <div className="flex gap-8 items-start">
          <LargeCard title="Minhas disciplinas">
            <p className="max-w-xs leading-relaxed text-base text-[#322A6A]">
              Você ainda não está pré-matriculado em nenhuma disciplina.
            </p>
          </LargeCard>

          <div className="flex flex-col gap-6">
            <SmallCard
              text="Realizar Pré Matrícula"
              icon="profile"
              variant="blue"
            />
            <SmallCard
              text="Editar Meus dados"
              icon="add-user"
              variant="blue"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
