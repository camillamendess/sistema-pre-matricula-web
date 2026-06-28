import PagesLayout from "../layouts/PagesLayout";

export default function Matriculas() {
  return (
      <PagesLayout
          pageTitle="Matriculas"
          pageDescription="Visualize e gerencie as Matriculas cadastradas no sistema."
          userType="aluno"
      >
          <div>Lista de Matriculas</div>
      </PagesLayout>
  )
}
