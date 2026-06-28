import PagesLayout from "../layouts/PagesLayout";

export default function Turmas() {
  return (
      <PagesLayout
          pageTitle="Turmas"
          pageDescription="Visualize e gerencie as turmas cadastradas no sistema."
          userType="admin"
      >
          <div>Lista de Turmas</div>
      </PagesLayout>
  )
}
