import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import PagesLayout from "../layouts/PagesLayout";
import { DisciplinaController } from "../controllers/DisciplinaController";
import { TurmaController } from "../controllers/TurmaController";
import { DisciplinaModel } from "../models/DisciplinaModel";
import { TurmaModel } from "../models/TurmaModel";

export default function DisciplinaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disciplina, setDisciplina] = useState<DisciplinaModel | null>(null);
  const [turmas, setTurmas] = useState<TurmaModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  async function carregarTurmasDisciplina(idDisciplina: number) {
    const turmasDisciplina = await TurmaController.listar({
      id_disciplina: idDisciplina,
    });
    setTurmas(turmasDisciplina);
  }

  useEffect(() => {
    async function carregarDados() {
      if (!id) return;

      try {
        const [dadosDisciplina, turmasDisciplina] = await Promise.all([
          DisciplinaController.buscar(Number(id)),
          TurmaController.listar({ id_disciplina: Number(id) }),
        ]);
        setDisciplina(dadosDisciplina);
        setTurmas(turmasDisciplina);
      } catch (err: any) {
        setError(err.message || "Nao foi possivel carregar a disciplina.");
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [id]);

  const handleExcluirTurma = async (turma: TurmaModel) => {
    if (!id) return;

    const confirmar = window.confirm(
      `Deseja excluir a turma ${turma.codigo_turma}?`,
    );

    if (!confirmar) return;

    try {
      await TurmaController.excluir(turma.id_turma);
      setFeedback("Turma excluida com sucesso.");
      await carregarTurmasDisciplina(Number(id));
    } catch (err: any) {
      setFeedback(err.message || "Nao foi possivel excluir a turma.");
    }
  };

  return (
    <PagesLayout
      pageTitle="Detalhes da Disciplina"
      pageDescription="Visualize as informacoes da disciplina e gerencie suas turmas."
      userType="admin"
    >
      <div className="flex flex-col flex-1 w-full pt-2 pr-6">
        {loading ? (
          <div className="text-[#322A6A] font-bold text-lg animate-pulse mt-10">
            Carregando disciplina...
          </div>
        ) : error || !disciplina ? (
          <div className="w-full max-w-3xl bg-red-100 text-red-700 rounded-lg border border-red-200 p-4 text-center font-medium">
            {error || "Disciplina nao encontrada."}
          </div>
        ) : (
          <div className="w-full max-w-5xl flex flex-col gap-6">
            <section className="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 text-[#322A6A]">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold break-words">
                    {disciplina.nome}
                  </h3>
                  <p className="text-sm text-[#332a6ad0] mt-1">
                    Codigo: {disciplina.codigo}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/admin/editar-disciplina/${disciplina.id_disciplina}`)}
                  className="bg-[#322A6A] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer shrink-0"
                >
                  Editar disciplina
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm font-medium">
                <div className="bg-[#F8F9FA] rounded-xl p-4 min-w-0">
                  <span className="block text-[#332a6ad0]">Creditos</span>
                  <strong className="text-lg break-words">{disciplina.creditos}</strong>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl p-4 md:col-span-2 min-w-0">
                  <span className="block text-[#332a6ad0]">Departamento</span>
                  <strong className="text-lg break-words">{disciplina.departamento}</strong>
                </div>
              </div>
            </section>

            <section className="bg-[#F8F9FA] border border-gray-100 rounded-2xl shadow-xl p-6 text-[#322A6A]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                <div className="min-w-0">
                  <h3 className="text-xl font-bold">Turmas da disciplina</h3>
                  <p className="text-sm text-[#332a6ad0]">
                    Clique no nome da turma para ver os alunos matriculados.
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/disciplinas/${disciplina.id_disciplina}/nova-turma`)}
                  className="bg-[#322A6A] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer shrink-0"
                >
                  Criar nova turma
                </button>
              </div>

              {feedback && (
                <div className="mb-4 p-3 bg-white border border-gray-200 rounded-lg text-sm font-medium">
                  {feedback}
                </div>
              )}

              {turmas.length === 0 ? (
                <p className="text-center text-gray-500 font-medium py-8">
                  Nenhuma turma cadastrada para esta disciplina.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {turmas.map((turma) => (
                    <div
                      key={turma.id_turma}
                      className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                    >
                      <button
                        type="button"
                        onClick={() => navigate(`/turmas/${turma.id_turma}`)}
                        className="text-left min-w-0 cursor-pointer"
                      >
                        <h4 className="font-bold text-lg hover:underline break-words">
                          Turma {turma.codigo_turma}
                        </h4>
                        <p className="text-sm text-[#332a6ad0]">
                          Periodo letivo: {turma.periodo_letivo}
                        </p>
                      </button>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/editar-turma/${turma.id_turma}`)}
                          className="p-2 rounded-lg text-[#322A6A] hover:bg-gray-100 transition-colors cursor-pointer"
                          title="Editar turma"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleExcluirTurma(turma)}
                          className="p-2 rounded-lg text-[#322A6A] hover:bg-gray-100 transition-colors cursor-pointer"
                          title="Excluir turma"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </PagesLayout>
  );
}
