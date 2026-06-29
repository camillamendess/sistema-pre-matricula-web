import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import InputField from "../components/input-field";
import PagesLayout from "../layouts/PagesLayout";
import { AlunoController } from "../controllers/AlunoController";
import { PreMatriculaController } from "../controllers/PreMatriculaController";
import { AlunoModel } from "../models/AlunoModel";
import { PreMatriculaModel } from "../models/PreMatriculaModel";

export default function AlunoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState<AlunoModel | null>(null);
  const [matriculas, setMatriculas] = useState<PreMatriculaModel[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  async function carregarMatriculas(idAluno: number) {
    const dados = await PreMatriculaController.listarPorAluno(idAluno);
    setMatriculas(dados);
  }

  useEffect(() => {
    async function carregarDados() {
      if (!id) return;

      try {
        const [dadosAluno, dadosMatriculas] = await Promise.all([
          AlunoController.buscar(Number(id)),
          PreMatriculaController.listarPorAluno(Number(id)),
        ]);
        setAluno(dadosAluno);
        setMatriculas(dadosMatriculas);
        setFormData({
          nome: dadosAluno.nome,
          email: dadosAluno.email,
          matricula: dadosAluno.matricula,
        });
      } catch (err: any) {
        setError(err.message || "Nao foi possivel carregar o aluno.");
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [id]);

  const handleChange = (chave: string, valor: string) => {
    setFormData((prev) => ({ ...prev, [chave]: valor }));
  };

  const handleSalvar = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSaving(true);
    setFeedback("");

    try {
      const resultado = await AlunoController.atualizar(Number(id), {
        nome: formData.nome,
        email: formData.email,
        matricula: formData.matricula,
      });
      setAluno(resultado.aluno);
      setFeedback("Dados do aluno atualizados com sucesso.");
    } catch (err: any) {
      setFeedback(err.message || "Nao foi possivel atualizar os dados do aluno.");
    } finally {
      setSaving(false);
    }
  };

  const handleExcluirMatricula = async (matricula: PreMatriculaModel) => {
    if (!id) return;

    const confirmar = window.confirm(
      `Deseja remover o aluno da turma ${matricula.codigo_turma}?`,
    );

    if (!confirmar) return;

    try {
      await PreMatriculaController.excluir(matricula.id_pre_matricula);
      setFeedback("Matricula removida com sucesso.");
      await carregarMatriculas(Number(id));
    } catch (err: any) {
      setFeedback(err.message || "Nao foi possivel remover a matricula.");
    }
  };

  return (
    <PagesLayout
      pageTitle="Detalhes do Aluno"
      pageDescription="Visualize e atualize os dados cadastrais e as turmas do aluno."
      userType="admin"
    >
      <div className="flex flex-col flex-1 w-full pt-2 pr-6">
        {loading ? (
          <div className="text-[#322A6A] font-bold text-lg animate-pulse mt-10">
            Carregando aluno...
          </div>
        ) : error || !aluno ? (
          <div className="w-full max-w-3xl bg-red-100 text-red-700 rounded-lg border border-red-200 p-4 text-center font-medium">
            {error || "Aluno nao encontrado."}
          </div>
        ) : (
          <div className="w-full max-w-5xl flex flex-col gap-6">
            <section className="bg-white border border-gray-100 rounded-2xl shadow-xl p-6 text-[#322A6A]">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-2xl font-bold">{aluno.nome}</h3>
                  <p className="text-sm text-[#332a6ad0]">
                    Numero de matricula: {aluno.matricula}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/alunos")}
                  className="bg-gray-100 text-[#322A6A] px-5 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Voltar
                </button>
              </div>

              {feedback && (
                <div className="mb-4 p-3 bg-[#F8F9FA] border border-gray-200 rounded-lg text-sm font-medium">
                  {feedback}
                </div>
              )}

              <form
                onSubmit={handleSalvar}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
              >
                <InputField
                  label="Nome*"
                  placeholder="Nome do aluno"
                  icon="user"
                  value={formData.nome || ""}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  required
                />
                <InputField
                  label="Email*"
                  type="email"
                  placeholder="Email do aluno"
                  icon="mail"
                  value={formData.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
                <InputField
                  label="Numero de matricula*"
                  placeholder="Matricula"
                  icon="file"
                  value={formData.matricula || ""}
                  onChange={(e) => handleChange("matricula", e.target.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={saving}
                  className="md:col-span-3 bg-[#322A6A] text-white px-5 py-3 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Salvando..." : "Salvar dados pessoais"}
                </button>
              </form>
            </section>

            <section className="bg-[#F8F9FA] border border-gray-100 rounded-2xl shadow-xl p-6 text-[#322A6A]">
              <div className="mb-5">
                <h3 className="text-xl font-bold">Turmas matriculadas</h3>
                <p className="text-sm text-[#332a6ad0]">
                  {matriculas.length} turma(s) vinculada(s) a este aluno.
                </p>
              </div>

              {matriculas.length === 0 ? (
                <p className="text-center text-gray-500 font-medium py-8">
                  Este aluno ainda nao esta matriculado em nenhuma turma.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {matriculas.map((matricula) => (
                    <div
                      key={matricula.id_pre_matricula}
                      className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                    >
                      <div>
                        <h4 className="font-bold text-lg">
                          Turma {matricula.codigo_turma}
                        </h4>
                        <p className="text-sm text-[#332a6ad0]">
                          {matricula.nome_disciplina} | {matricula.codigo_disciplina}
                        </p>
                        <p className="text-sm text-[#332a6ad0]">
                          Periodo: {matricula.periodo_letivo}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleExcluirMatricula(matricula)}
                        className="p-2 rounded-lg text-[#322A6A] hover:bg-gray-100 transition-colors cursor-pointer self-start md:self-center"
                        title="Remover turma"
                      >
                        <Trash2 size={18} />
                      </button>
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
