import PagesLayout from "../layouts/PagesLayout";

export default function Disciplinas() {
  return (
      <PagesLayout
          pageTitle="Disciplinas"
          pageDescription="Visualize e gerencie as disciplinas cadastradas no sistema."
          userType="admin"
      >
          <div>Lista de Disciplinas</div>
      </PagesLayout>
  )
}
