import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../components/input-field";
import PagesLayout from "../layouts/PagesLayout";
import { TurmaController } from "../controllers/TurmaController";
import { TurmaModel } from "../models/TurmaModel";

export default function EditarTurma() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [turma, setTurma] = useState<TurmaModel | null>(null);
  const [codigoTurma, setCodigoTurma] = useState("");
  const [periodoLetivo, setPeriodoLetivo] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function carregarTurma() {
      if (!id) return;

      try {
        const dados = await TurmaController.buscar(Number(id));
        setTurma(dados);
        setCodigoTurma(dados.codigo_turma);
        setPeriodoLetivo(dados.periodo_letivo);
      } catch (err: any) {
        setError(err.message || "Nao foi possivel carregar a turma.");
      } finally {
        setLoading(false);
      }
    }

    carregarTurma();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id || !turma) return;

    setSaving(true);
    setError("");

    try {
      await TurmaController.atualizar(Number(id), {
        id_disciplina: turma.id_disciplina,
        codigo_turma: codigoTurma,
        periodo_letivo: periodoLetivo,
      });
      alert("Turma atualizada com sucesso!");
      navigate(`/disciplinas/${turma.id_disciplina}`);
    } catch (err: any) {
      setError(err.message || "Nao foi possivel atualizar a turma.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PagesLayout
      pageTitle="Editar Turma"
      pageDescription="Atualize as informacoes da turma."
      userType="admin"
    >
      <div className="flex flex-1 items-center justify-center w-full pb-6">
        <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-100 shadow-xl p-10 flex flex-col items-center">
          {loading ? (
            <div className="text-[#322A6A] font-bold text-lg animate-pulse">
              Carregando turma...
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md flex flex-col gap-4 items-center"
            >
              <div className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl p-4 text-[#322A6A]">
                <span className="block text-sm text-[#332a6ad0]">Disciplina</span>
                <strong>{turma?.nome_disciplina}</strong>
                <span className="block text-xs mt-1">Codigo: {turma?.codigo_disciplina}</span>
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
                  onClick={() => navigate(turma ? `/disciplinas/${turma.id_disciplina}` : "/turmas")}
                  className="w-full bg-gray-100 text-[#322A6A] text-base py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#322A6A] text-white text-base py-3 rounded-xl font-bold hover:bg-[#251c61] transition-colors cursor-pointer shadow-md disabled:opacity-50"
                >
                  {saving ? "Salvando..." : "Salvar alteracoes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PagesLayout>
  );
}
