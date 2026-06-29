import { useNavigate, useLocation } from "react-router-dom";
import LogoUesb from "../../assets/uesb-logo-2.png";

interface SidebarProps {
  role: "aluno" | "admin";
}

export default function Sidebar({ role }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const alunoItems = [
    { label: "Inicio", linkTo: "/home" },
    { label: "Realizar Pre Matricula", linkTo: "/matricular" },
    { label: "Minhas Turmas", linkTo: "/matriculas" },
    { label: "Comprovante de Matricula", linkTo: "/comprovante-matricula" },
    { label: "Disciplinas disponiveis", linkTo: "/disciplinas" },
    { label: "Dados Cadastrais", linkTo: "/perfil" },
  ];

  const adminItems = [
    { label: "Inicio", linkTo: "/admin" },
    { label: "Alunos", linkTo: "/alunos" },
    { label: "Disciplinas", linkTo: "/disciplinas" },
    { label: "Turmas", linkTo: "/turmas" },
    { label: "Relatorios", linkTo: "/relatorios" },
  ];

  const menuItems = role === "admin" ? adminItems : alunoItems;

  const handleClick = (linkTo: string) => {
    navigate(linkTo);
  };

  return (
    <div className="w-72.25 bg-[#322A6A] h-screen flex flex-col text-white select-none">
      <div className="flex flex-col items-center py-10 px-6 text-center">
        <img src={LogoUesb} alt="Logo UESB" className="w-24 mb-4" />
        <h1 className="text-xl font-bold">Pre Matricula</h1>
        <span className="text-xs opacity-80">Sistema Academico</span>
      </div>

      <nav className="flex-1 mt-6 flex flex-col">
        {menuItems.map((item, index) => {
          const isItemActive = location.pathname === item.linkTo;

          return (
            <button
              key={index}
              onClick={() => handleClick(item.linkTo)}
              className={`w-full text-center px-6 py-3.5 text-sm font-medium border-b border-white transition-colors cursor-pointer
                ${index === 0 ? "border-t border-t-white" : ""}
                ${isItemActive ? "bg-white/10 font-bold" : "hover:bg-white/5"}`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
