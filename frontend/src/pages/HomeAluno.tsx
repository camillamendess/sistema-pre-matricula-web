import LargeCard from "../components/large-card";
import SmallCard from "../components/small-card";
import StudentLayout from "../layouts/StudentLayout"; // Adjust path as needed

export default function HomeAluno() {
  return (
    <StudentLayout 
      pageTitle="Olá, Fulano!" 
      pageDescription="Realize sua pré-matrícula nas disciplinas do semestre."
    >
      <div className="flex flex-col lg:flex-row gap-8 flex-1 h-full pb-4 lg:pb-0">
        <div className="flex-1 flex flex-col justify-center lg:justify-start">
          <LargeCard title="Minhas disciplinas">
            <p className="max-w-xs leading-relaxed text-base text-[#322A6A]">
              Você ainda não está pré-matriculado em nenhuma disciplina.
            </p>
          </LargeCard>
        </div>

          {/* Action Buttons Section: Side-by-side at the bottom on mobile, column on right for desktop */}
          <div className="flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-6 mt-auto lg:mt-0 lg:w-auto justify-center items-center w-full">
            <div className="flex-none w-fit">
            <SmallCard
              linkTo="/matricular"
              text="Realizar Pré Matrícula"
              icon="profile"
              variant="blue"
            />
          </div>
            <div className="flex-none w-fit">
            <SmallCard
              linkTo="/editar-aluno"
              text="Editar Meus dados"
              icon="add-user"
              variant="blue"
            />
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}