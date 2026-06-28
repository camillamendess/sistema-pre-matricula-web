import { useState } from "react";
import { Search } from "lucide-react"; // Usando lucide para o ícone de lupa fixo à direita
import PagesLayout from "../layouts/PagesLayout";
import { useAuth } from "../contexts/AuthContext";

interface ConsultaAdminProps {
  tipo: "alunos" | "disciplinas" | "turmas";
}

export default function ConsultaAdmin({
  tipo,
}: ConsultaAdminProps): React.JSX.Element {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const configuracao = {
    alunos: {
      titulo: "Consultar Alunos",
      descricao: "Busque por um ou mais alunos.",
      placeholder: "Digite o nome do(a) aluno(a) ou o número de matrícula",
      emptyMessage:
        "Sem resultados, busque pelo aluno na barra de pesquisa acima.",
    },
    disciplinas: {
      titulo: "Consultar Disciplinas",
      descricao: "Busque por uma ou mais disciplinas cadastradas.",
      placeholder: "Digite o nome ou o código da disciplina",
      emptyMessage:
        "Sem resultados, busque pela disciplina na barra de pesquisa acima.",
    },
    turmas: {
      titulo: "Consultar Turmas",
      descricao: "Busque pelas turmas ofertadas no período letivo.",
      placeholder: "Digite o nome da disciplina, código ou nome do professor",
      emptyMessage:
        "Sem resultados, busque pela turma na barra de pesquisa acima.",
    },
  }[tipo];

  // Determina dinamicamente o tipo de usuário para o layout (disciplinas pode ser visto por aluno)
  const userType =
    tipo === "disciplinas"
      ? user?.tipo_usuario === 1
        ? "admin"
        : "aluno"
      : "admin";

  return (
    <PagesLayout
      pageTitle={configuracao.titulo}
      pageDescription={configuracao.descricao}
      userType={userType}
    >
      <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto pt-4 pb-6">
        <div className="relative w-full mb-16">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={configuracao.placeholder}
            className="w-full bg-[#D9D9D9]/50 text-[#322A6A] font-medium placeholder-gray-500 rounded-full py-3.5 pl-6 pr-14 outline-none border border-transparent focus:border-[#322A6A]/40 transition-all text-sm md:text-base"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <Search size={22} />
          </div>
        </div>

        {/* ================= ESTADO VAZIO / RESULTADOS ================= */}
        <div className="flex flex-1 flex-col items-center justify-center text-center px-4">
          {searchTerm.trim() === "" ? (
            /* Exibe o texto do Figma quando não há busca ativa */
            <p className="text-[#322A6A] font-medium max-w-md leading-relaxed opacity-80">
              {configuracao.emptyMessage}
            </p>
          ) : (
            /* Aqui entrará a tabela ou listagem dinâmica de dados no futuro */
            <div className="text-gray-400 font-medium">
              Listagem de {tipo} para o termo: "{searchTerm}" (Pronto para
              conectar à API)
            </div>
          )}
        </div>
      </div>
    </PagesLayout>
  );
}
