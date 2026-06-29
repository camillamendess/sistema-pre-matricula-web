import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PagesLayout from "../layouts/PagesLayout";
import { AlunoController } from "../controllers/AlunoController";
import { PreMatriculaController } from "../controllers/PreMatriculaController";
import { AlunoTurma, TurmaController } from "../controllers/TurmaController";
import { AlunoModel } from "../models/AlunoModel";
import { TurmaModel } from "../models/TurmaModel";

export default function TurmaDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turma, setTurma] = useState<TurmaModel | null>(null);
  const [alunos, setAlunos] = useState<AlunoTurma[]>([]);
  const [todosAlunos, setTodosAlunos] = useState<AlunoModel[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [idAlunoSelecionado, setIdAlunoSelecionado] = useState("");
  const [termoBuscaAluno, setTermoBuscaAluno] = useState("");
  const [salvandoMatricula, setSalvandoMatricula] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  async function carregarAlunosTurma(idTurma: number) {
    const dados = await TurmaController.listarAlunos(idTurma);
    setAlunos(dados);
  }

  useEffect(() => {
    async function carregarDados() {
      if (!id) return;

      try {
        const [dadosTurma, alunosTurma, alunosCadastrados] = await Promise.all([
          TurmaController.buscar(Number(id)),
          TurmaController.listarAlunos(Number(id)),
          AlunoController.listar(),
        ]);
        setTurma(dadosTurma);
        setAlunos(alunosTurma);
        setTodosAlunos(alunosCadastrados);
      } catch (err: any) {
        setError(err.message || "Nao foi possivel carregar a turma.");
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [id]);

  const handleMatricularAluno = async () => {
    if (!id || !idAlunoSelecionado) {
      setFeedback("Selecione um aluno para realizar a matrícula.");
      return;
    }

    setSalvandoMatricula(true);
    setFeedback("");

    try {
      await PreMatriculaController.cadastrarParaAluno(
        Number(idAlunoSelecionado),
        Number(id),
      );
      setFeedback("Aluno matriculado com sucesso.");
      setMostrarFormulario(false);
      setIdAlunoSelecionado("");
      setTermoBuscaAluno("");
      await carregarAlunosTurma(Number(id));
    } catch (err: any) {
      setFeedback(err.message || "Nao foi possivel matricular o aluno.");
    } finally {
      setSalvandoMatricula(false);
    }
  };

  const alunosJaMatriculados = new Set(alunos.map((aluno) => aluno.id_aluno));
  const termoNormalizado = termoBuscaAluno.trim().toLowerCase();
  const alunosFiltrados = termoNormalizado
    ? todosAlunos
        .filter((aluno) => !alunosJaMatriculados.has(aluno.id_aluno))
        .filter((aluno) =>
          aluno.nome.toLowerCase().includes(termoNormalizado) ||
          aluno.matricula.toLowerCase().includes(termoNormalizado)
        )
        .slice(0, 8)
    : [];

  const alunoSelecionado = todosAlunos.find(
    (aluno) => String(aluno.id_aluno) === idAlunoSelecionado,
  );

  return (
    <PagesLayout
      pageTitle="Detalhes da Turma"
      pageDescription="Visualize a turma e os alunos matriculados nela."
      userType="admin"
    >
      <div className="flex flex-col flex-1 w-full pt-2 pr-6">
        {loading ? (
          <div className="text-[#322A6A] font-bold text-lg animate-pulse mt-10">
            Carregando turma...
          </div>
        ) : error || !turma ? (
          <div className="w-full max-w-3xl bg-red-100 text-red-700 rounded-lg border border-red-200 p-4 text-center font-medium">
            {error || "Turma nao encontrada."}
          </div>
        ) : (
          <div className="w-full max-w-5xl flex flex-col gap-6">
            <section className="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 text-[#322A6A]">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold break-words">
                    Turma {turma.codigo_turma}
                  </h3>
                  <p className="text-sm text-[#332a6ad0] mt-1">
                    {turma.nome_disciplina} | {turma.codigo_disciplina}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/admin/editar-turma/${turma.id_turma}`)}
                  className="bg-[#322A6A] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer shrink-0"
                >
                  Editar turma
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm font-medium">
                <div className="bg-[#F8F9FA] rounded-xl p-4 min-w-0">
                  <span className="block text-[#332a6ad0]">Periodo letivo</span>
                  <strong className="text-lg break-words">{turma.periodo_letivo}</strong>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl p-4 min-w-0">
                  <span className="block text-[#332a6ad0]">Disciplina</span>
                  <strong className="text-lg break-words">{turma.nome_disciplina}</strong>
                </div>
              </div>
            </section>

            <section className="bg-[#F8F9FA] border border-gray-100 rounded-2xl shadow-xl p-6 text-[#322A6A]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                <div className="min-w-0">
                  <h3 className="text-xl font-bold">Alunos matriculados</h3>
                  <p className="text-sm text-[#332a6ad0]">
                    {alunos.length} aluno(s) matriculado(s) nesta turma.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setMostrarFormulario((valor) => !valor);
                    setFeedback("");
                  }}
                  className="bg-[#322A6A] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer shrink-0"
                >
                  {mostrarFormulario ? "Fechar" : "Matricular aluno em turma"}
                </button>
              </div>

              {feedback && (
                <div className="mb-4 p-3 bg-white border border-gray-200 rounded-lg text-sm font-medium">
                  {feedback}
                </div>
              )}

              {mostrarFormulario && (
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
                  <div className="relative flex flex-col gap-1 text-sm font-medium">
                    <label htmlFor="buscar-aluno-turma">Aluno cadastrado</label>
                    <input
                      id="buscar-aluno-turma"
                      type="text"
                      value={termoBuscaAluno}
                      onChange={(e) => {
                        setTermoBuscaAluno(e.target.value);
                        setIdAlunoSelecionado("");
                      }}
                      placeholder="Digite nome ou matrícula"
                      className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#322A6A]"
                    />

                    {termoBuscaAluno.trim() && !idAlunoSelecionado && (
                      <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                        {alunosFiltrados.length === 0 ? (
                          <div className="px-3 py-2 text-sm text-gray-500">
                            Nenhum aluno encontrado.
                          </div>
                        ) : (
                          alunosFiltrados.map((aluno) => (
                            <button
                              key={aluno.id_aluno}
                              type="button"
                              onClick={() => {
                                setIdAlunoSelecionado(String(aluno.id_aluno));
                                setTermoBuscaAluno(`${aluno.nome} - ${aluno.matricula}`);
                              }}
                              className="w-full text-left px-3 py-2 hover:bg-[#F8F9FA] transition-colors"
                            >
                              <span className="block font-bold text-[#322A6A]">
                                {aluno.nome}
                              </span>
                              <span className="block text-xs text-[#332a6ad0]">
                                Matrícula: {aluno.matricula} | {aluno.email}
                              </span>
                            </button>
                          ))
                        )}
                      </div>
                    )}

                    {alunoSelecionado && (
                      <span className="text-xs text-green-700 font-bold">
                        Selecionado: {alunoSelecionado.nome}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleMatricularAluno}
                    disabled={salvandoMatricula || !idAlunoSelecionado}
                    className="bg-[#322A6A] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {salvandoMatricula ? "Salvando..." : "Matricular aluno"}
                  </button>
                </div>
              )}

              {alunos.length === 0 ? (
                <p className="text-center text-gray-500 font-medium py-8">
                  Nenhum aluno matriculado nesta turma.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse bg-white rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-[#322A6A] text-white">
                        <th className="text-left p-3">Aluno</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Numero de matrícula</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alunos.map((aluno) => (
                        <tr key={aluno.id_pre_matricula} className="border-b border-gray-200">
                          <td className="p-3 font-semibold">
                            <button
                              type="button"
                              onClick={() => navigate(`/alunos/${aluno.id_aluno}`)}
                              className="hover:underline cursor-pointer text-left"
                            >
                              {aluno.nome}
                            </button>
                          </td>
                          <td className="p-3">{aluno.email}</td>
                          <td className="p-3">{aluno.matricula}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </PagesLayout>
  );
}
