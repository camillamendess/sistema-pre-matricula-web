import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../components/input-field";
import PagesLayout from "../layouts/PagesLayout";
import { DisciplinaController } from "../controllers/DisciplinaController";
import { TurmaController } from "../controllers/TurmaController";
import { DisciplinaModel } from "../models/DisciplinaModel";

export default function NovaTurmaDisciplina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disciplina, setDisciplina] = useState<DisciplinaModel | null>(null);
  const [codigoTurma, setCodigoTurma] = useState("");
  const [periodoLetivo, setPeriodoLetivo] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function carregarDisciplina() {
      if (!id) return;

      try {
        const dados = await DisciplinaController.buscar(Number(id));
        setDisciplina(dados);
      } catch (err: any) {
        setError(err.message || "Nao foi possivel carregar a disciplina.");
      } finally {
        setLoading(false);
      }
    }

    carregarDisciplina();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSaving(true);
    setError("");

    try {
      await TurmaController.cadastrar({
        id_disciplina: Number(id),
        codigo_turma: codigoTurma,
        periodo_letivo: periodoLetivo,
      });
      alert("Turma cadastrada com sucesso!");
      navigate(`/disciplinas/${id}`);
    } catch (err: any) {
      setError(err.message || "Nao foi possivel cadastrar a turma.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PagesLayout
      pageTitle="Cadastrar Turma"
      pageDescription="Crie uma nova turma vinculada a disciplina selecionada."
      userType="admin"
    >
      <div className="flex flex-1 items-center justify-center w-full pb-6">
        <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-100 shadow-xl p-10 flex flex-col items-center">
          {loading ? (
            <div className="text-[#322A6A] font-bold text-lg animate-pulse">
              Carregando disciplina...
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md flex flex-col gap-4 items-center"
            >
              <div className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl p-4 text-[#322A6A]">
                <span className="block text-sm text-[#332a6ad0]">Disciplina</span>
                <strong>{disciplina?.nome}</strong>
                <span className="block text-xs mt-1">Codigo: {disciplina?.codigo}</span>
              </div>

              {error && (
                <div className="w-full p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium border border-red-200">
                  {error}
                </div>
              )}

              <InputField
                label="Codigo da Turma*"
                placeholder="Ex: T01"
                icon="file"
                value={codigoTurma}
                onChange={(e) => setCodigoTurma(e.target.value)}
                required
              />
              <InputField
                label="Periodo Letivo*"
                placeholder="Ex: 2026.1"
                icon="file"
                value={periodoLetivo}
                onChange={(e) => setPeriodoLetivo(e.target.value)}
                required
              />

              <div className="w-full flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => navigate(`/disciplinas/${id}`)}
                  className="w-full bg-gray-100 text-[#322A6A] text-base py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#322A6A] text-white text-base py-3 rounded-xl font-bold hover:bg-[#251c61] transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  {saving ? "Salvando..." : "Cadastrar turma"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PagesLayout>
  );
}
