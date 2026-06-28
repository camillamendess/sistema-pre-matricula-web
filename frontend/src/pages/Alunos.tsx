import PagesLayout from "../layouts/PagesLayout";

export default function Alunos() {
  return (
    <PagesLayout
        pageTitle="Alunos"
        pageDescription="Visualize e gerencie os alunos cadastrados no sistema."
        userType="admin"
    >
        <div>Lista de Alunos</div>
    </PagesLayout>
  )
}
