import { useState, useEffect } from "react";
import { Pencil, Search, Trash2 } from "lucide-react";
import PagesLayout from "../layouts/PagesLayout";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { AlunoController } from "../controllers/AlunoController";
import { DisciplinaController } from "../controllers/DisciplinaController";
import { TurmaController } from "../controllers/TurmaController";
import { AlunoModel } from "../models/AlunoModel";
import { DisciplinaModel } from "../models/DisciplinaModel";
import { TurmaModel } from "../models/TurmaModel";
import ModalExclusao from "../components/modal-exclusao";
import ModalEdicao from "../components/modal-edicao";
import PopupNotificacao from "../components/popup-notificacao";

interface ConsultaAdminProps {
  tipo: "alunos" | "disciplinas" | "turmas";
}

export default function ConsultaAdmin({ tipo }: ConsultaAdminProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemParaExcluir, setItemParaExcluir] = useState<any | null>(null);

  const [isModalEdicaoOpen, setIsModalEdicaoOpen] = useState(false);
  const [itemParaEditar, setItemParaEditar] = useState<any | null>(null);

  const [alunos, setAlunos] = useState<AlunoModel[]>([]);
  const [disciplinas, setDisciplinas] = useState<DisciplinaModel[]>([]);
  const [turmas, setTurmas] = useState<TurmaModel[]>([]);

  const [popup, setPopup] = useState({
    isOpen: false,
    tipo: "sucesso" as "sucesso" | "erro",
    mensagem: "",
  });

  const carregarDados = async () => {
    setLoading(true);
    try {
      if (tipo === "alunos") {
        const dados = await AlunoController.listar();
        setAlunos(dados);
      } else if (tipo === "disciplinas") {
        const dados = await DisciplinaController.listar();
        setDisciplinas(dados);
      } else if (tipo === "turmas") {
        const dados = await TurmaController.listar();
        setTurmas(dados);
      }
    } catch (error) {
      console.error(`Erro ao buscar ${tipo}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchTerm(""); // Reseta a busca ao mudar de aba
    carregarDados();
  }, [tipo]);

  const dadosFiltrados = () => {
    const termo = searchTerm.toLowerCase().trim();

    if (!termo) {
      if (tipo === "alunos") return alunos;
      if (tipo === "disciplinas") return disciplinas;
      if (tipo === "turmas") return turmas;
    }

    if (tipo === "alunos") {
      return alunos.filter(
        (aluno) =>
          aluno.nome.toLowerCase().includes(termo) ||
          aluno.matricula.toLowerCase().includes(termo) ||
          aluno.email.toLowerCase().includes(termo),
      );
    }

    if (tipo === "disciplinas") {
      return disciplinas.filter(
        (disc) =>
          disc.nome.toLowerCase().includes(termo) ||
          disc.codigo.toLowerCase().includes(termo) ||
          disc.departamento.toLowerCase().includes(termo),
      );
    }

    if (tipo === "turmas") {
      return turmas.filter(
        (turma) =>
          turma.codigo_turma.toLowerCase().includes(termo) ||
          turma.periodo_letivo.toLowerCase().includes(termo) ||
          turma.nome_disciplina?.toLowerCase().includes(termo) ||
          turma.codigo_disciplina?.toLowerCase().includes(termo),
      );
    }

    return [];
  };

  const resultados = dadosFiltrados();

  const abrirDetalhe = (item: any) => {
    if (tipo === "alunos") {
      navigate(`/alunos/${item.id_aluno}`);
    } else if (tipo === "disciplinas") {
      navigate(`/disciplinas/${item.id_disciplina}`);
    } else if (tipo === "turmas") {
      navigate(`/turmas/${item.id_turma}`);
    }
  };

  const editarItem = (item: any) => {
    if (tipo === "alunos") {
      navigate(`/alunos/${item.id_aluno}`);
    } else if (tipo === "disciplinas") {
      navigate(`/admin/editar-disciplina/${item.id_disciplina}`);
    } else if (tipo === "turmas") {
      navigate(`/admin/editar-turma/${item.id_turma}`);
    }
  };

  const handleAbrirModalExclusao = (item: any) => {
    setItemParaExcluir(item);
    setIsModalOpen(true);
  };

  const handleAbrirModalEdicao = (item: any) => {
    setItemParaEditar(item);
    setIsModalEdicaoOpen(true);
  };

  const handleConfirmarExclusao = async () => {
    if (!itemParaExcluir) return;
    try {
      if (tipo === "alunos") {
        await AlunoController.excluir(itemParaExcluir.id_aluno);
      } else if (tipo === "disciplinas") {
        await DisciplinaController.excluir(itemParaExcluir.id_disciplina);
      } else if (tipo === "turmas") {
        await TurmaController.excluir(itemParaExcluir.id_turma);
      }
      setIsModalOpen(false);
      setItemParaExcluir(null);
      carregarDados();
    } catch (error) {
      setPopup({
        isOpen: true,
        tipo: "erro",
        mensagem: "Erro ao tentar excluir.",
      });
    }
  };

  const configuracao = {
    alunos: {
      titulo: "Consultar Alunos",
      descricao: "Busque por um ou mais alunos.",
      placeholder: "Digite o nome do(a) aluno(a), email ou número de matrícula",
    },
    disciplinas: {
      titulo: "Consultar Disciplinas",
      descricao: "Busque por uma ou mais disciplinas cadastradas.",
      placeholder: "Digite o nome, código ou departamento da disciplina",
    },
    turmas: {
      titulo: "Consultar Turmas",
      descricao: "Busque pelas turmas ofertadas no período letivo.",
      placeholder: "Digite o código da turma, período ou nome da disciplina",
    },
  }[tipo];

  const userType =
    tipo === "alunos" ? "admin" : user?.tipo_usuario === 1 ? "admin" : "aluno";
  const podeGerenciar = user?.tipo_usuario === 1;

  return (
    <PagesLayout
      pageTitle={configuracao.titulo}
      pageDescription={configuracao.descricao}
      userType={userType}
    >
      <div className="flex flex-col flex-1 w-full pt-2 pr-6">
        {/* ================= BARRA DE PESQUISA ================= */}
        <div className="relative w-full mb-6">
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

        {/* ================= CONTEÚDO PRINCIPAL ================= */}
        <div className="w-full flex flex-col items-center justify-center">
          {loading ? (
            <div className="text-[#322A6A] font-bold text-lg animate-pulse mt-10">
              Carregando dados...
            </div>
          ) : resultados.length === 0 ? (
            <p className="text-gray-400 font-medium text-center mt-12">
              Nenhum registro encontrado na base de dados.
            </p>
          ) : (
            <div className="w-full max-h-110 bg-[#F8F9FA] rounded-3xl border border-gray-100 shadow-xl p-6 flex flex-col">
              <div className="flex-none">
                <h3 className="text-[#322A6A] font-bold text-center text-base mb-5">
                  Listagem de {tipo} ({resultados.length})
                </h3>
              </div>

              <div className="flex-1 h-full overflow-y-auto pr-2 flex flex-col gap-1 dynamic-scrollbar">
                {resultados.map((item: any, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3.5 px-4 rounded-xl border-b border-gray-200/60 last:border-none transition-colors text-[#322A6A] hover:bg-gray-200"
                  >
                    <button
                      type="button"
                      onClick={() => abrirDetalhe(item)}
                      className={`font-semibold text-sm md:text-base text-left ${
                        tipo === "alunos" || tipo === "disciplinas" || tipo === "turmas"
                          ? "cursor-pointer hover:underline"
                          : "cursor-default"
                      }`}
                    >
                      {tipo === "alunos" && item.nome}
                      {tipo === "disciplinas" && item.nome}
                      {tipo === "turmas" &&
                        `Turma ${item.codigo_turma} - ${item.nome_disciplina || "Sem Nome"}`}
                    </button>

                    <div className="flex items-center gap-5">
                      {podeGerenciar && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAbrirModalExclusao(item)}
                            className="p-1 cursor-pointer transition-transform text-[#322A6A] hover:text-[#000000]"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                          <button
                            onClick={() => editarItem(item)}
                            className="p-1 cursor-pointer transition-transform text-[#322A6A] hover:text-[#000000]"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </button>
                        </div>
                      )}

                      <span className="font-mono text-sm min-w-24 text-right text-[#322A6A]">
                        {tipo === "alunos" && item.matricula}
                        {tipo === "disciplinas" && item.codigo}
                        {tipo === "turmas" && item.periodo_letivo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <ModalExclusao
          isOpen={isModalOpen}
          tipo={tipo}
          item={itemParaExcluir}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmarExclusao}
        />

        <ModalEdicao
          isOpen={isModalEdicaoOpen}
          tipo={tipo}
          item={itemParaEditar}
          onClose={() => setIsModalEdicaoOpen(false)}
          onRefresh={carregarDados} // Recarrega a tabela após editar
        />

        <PopupNotificacao
          isOpen={popup.isOpen}
          tipo={popup.tipo}
          mensagem={popup.mensagem}
          onClose={() => setPopup((prev) => ({ ...prev, isOpen: false }))}
        />
      </div>
    </PagesLayout>
  );
}
