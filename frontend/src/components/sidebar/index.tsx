import LogoUesb from "../../assets/uesb-logo-2.png";

interface SidebarProps {
  role: "aluno" | "admin";
}

export default function Sidebar({ role }: SidebarProps): React.JSX.Element {
  const alunoItems = [
    { label: "Realizar Pré Matrícula", active: true },
    { label: "Visualizar Pré Matrícula", active: false },
    { label: "Disciplinas matriculadas", active: false },
    { label: "Disciplinas disponíveis", active: false },
    { label: "Dados Cadastrais", active: false },
  ];

  const adminItems = [
    { label: "Alunos", active: true },
    { label: "Disciplinas", active: false },
    { label: "Turmas", active: false },
    { label: "Relatórios", active: false },
  ];

  const menuItems = role === "admin" ? adminItems : alunoItems;

  return (
    <div className="w-72.25 bg-[#322A6A] h-screen flex flex-col text-white select-none">
      <div className="flex flex-col items-center py-10 px-6 text-center">
        <img src={LogoUesb} alt="Logo UESB" className="w-24 mb-4" />
        <h1 className="text-xl font-bold">Pré Matrícula</h1>
        <span className="text-xs opacity-80">Sistema Acadêmico</span>
      </div>

      <nav className="flex-1 mt-6 flex flex-col">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full text-center px-6 py-3.5 text-sm font-medium border-b border-white transition-colors cursor-pointer
              ${index === 0 ? "border-t border-t-white" : ""}
              ${item.active ? "bg-white/10 font-bold" : "hover:bg-white/5"}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
