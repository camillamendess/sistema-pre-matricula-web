import PagesLayout from "../layouts/PagesLayout";

export default function Perfil() {
  return (
      <PagesLayout
          pageTitle="Perfil"
          pageDescription="Visualize e gerencie as Perfil cadastradas no sistema."
          userType="aluno"
      >
          <div>Lista de Perfil</div>
      </PagesLayout>
  )
}
