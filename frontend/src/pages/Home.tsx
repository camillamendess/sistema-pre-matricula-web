import SmallCard from "../components/small-card";
import PagesLayout from "../layouts/PagesLayout";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <PagesLayout
        pageTitle="Carregando..."
        pageDescription="Buscando informacoes do usuario."
      >
        <div className="flex h-full items-center justify-center">
          <div className="text-[#322A6A] font-bold text-lg animate-pulse">
            Carregando seus dados...
          </div>
        </div>
      </PagesLayout>
    );
  }

  const isAdmin = user?.tipo_usuario === 1;

  const displayTitle = user
    ? `Olá, ${user.nome.split(" ")[0]}!`
    : "Painel";

  const displayDescription = isAdmin
    ? "Gerencie disciplinas, alunos e turmas."
    : "Consulte suas disciplinas, turmas e comprovante de matrícula.";

  return (
    <PagesLayout
      pageTitle={displayTitle}
      pageDescription={displayDescription}
      userType={isAdmin ? "admin" : "aluno"}
    >
      {isAdmin ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl items-center pb-6">
          <SmallCard
            linkTo="/admin/cadastrar-aluno"
            text="Cadastrar Aluno"
            icon="add-user"
            variant="white"
          />
          <SmallCard
            linkTo="/admin/cadastrar-disciplina"
            text="Cadastrar Disciplina"
            icon="document"
            variant="white"
          />
          <SmallCard
            linkTo="/admin/cadastrar-turma"
            text="Cadastrar Turma"
            icon="profile"
            variant="white"
          />
          <SmallCard
            linkTo="/alunos"
            text="Consultar Alunos"
            icon="people"
            variant="white"
          />
          <SmallCard
            linkTo="/disciplinas"
            text="Consultar Disciplinas"
            icon="analyze"
            variant="white"
          />
          <SmallCard
            linkTo="/relatorios"
            text="Relatórios"
            icon="graph-report"
            variant="white"
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl items-center pb-6">
          <SmallCard
            linkTo="/disciplinas"
            text="Consultar Disciplinas"
            icon="analyze"
            variant="white"
          />
          <SmallCard
            linkTo="/matriculas"
            text="Minhas Turmas"
            icon="document"
            variant="white"
          />
          <SmallCard
            linkTo="/comprovante-matricula"
            text="Comprovante de Matrícula"
            icon="graph-report"
            variant="white"
          />
        </div>
      )}
    </PagesLayout>
  );
}
