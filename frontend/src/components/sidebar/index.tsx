import { useNavigate } from "react-router-dom";
import LogoUesb from "../../assets/uesb-logo-2.png";

interface SidebarProps {
  role: "aluno" | "admin";
}

export default function Sidebar({ role }: SidebarProps) {
  const navigate = useNavigate();

  const alunoItems = [
    { label: "Realizar Pré Matrícula", active: true, linkTo: "/matricular" },
    { label: "Visualizar Pré Matrícula", active: false, linkTo: "/matriculas" },
    { label: "Disciplinas disponíveis", active: false, linkTo: "/disciplinas" },
    { label: "Dados Cadastrais", active: false, linkTo: "/perfil" },
  ];

  const adminItems = [
    { label: "Alunos", active: true, linkTo: "/alunos" },
    { label: "Disciplinas", active: false, linkTo: "/disciplinas" },
    { label: "Turmas", active: false, linkTo: "/turmas" },
    { label: "Relatórios", active: false, linkTo: "/relatorios" },
  ];

  const menuItems = role === "admin" ? adminItems : alunoItems;

  const handleClick = (linkTo: string) => {
    navigate(linkTo);
  };

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
            onClick={() => handleClick(item.linkTo)}
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
