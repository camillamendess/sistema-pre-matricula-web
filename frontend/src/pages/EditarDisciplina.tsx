import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../components/input-field";
import PagesLayout from "../layouts/PagesLayout";
import { DisciplinaController } from "../controllers/DisciplinaController";

export default function EditarDisciplina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function carregarDisciplina() {
      if (!id) return;

      try {
        const disciplina = await DisciplinaController.buscar(Number(id));
        setFormData({
          nome: disciplina.nome,
          codigo: disciplina.codigo,
          creditos: String(disciplina.creditos),
          departamento: disciplina.departamento,
        });
      } catch (err: any) {
        setError(err.message || "Nao foi possivel carregar a disciplina.");
      } finally {
        setLoading(false);
      }
    }

    carregarDisciplina();
  }, [id]);

  const handleChange = (chave: string, valor: string) => {
    setFormData((prev) => ({ ...prev, [chave]: valor }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSaving(true);
    setError("");

    try {
      await DisciplinaController.atualizar(Number(id), {
        codigo: formData.codigo,
        nome: formData.nome,
        creditos: Number(formData.creditos),
        departamento: formData.departamento,
      });
      alert("Disciplina atualizada com sucesso!");
      navigate(`/disciplinas/${id}`);
    } catch (err: any) {
      setError(err.message || "Nao foi possivel atualizar a disciplina.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PagesLayout
      pageTitle="Editar Disciplina"
      pageDescription="Atualize as informacoes da disciplina cadastrada."
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
              {error && (
                <div className="w-full p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium border border-red-200">
                  {error}
                </div>
              )}

              <InputField
                label="Nome da Disciplina*"
                placeholder="Informe o nome da disciplina"
                icon="file"
                value={formData.nome || ""}
                onChange={(e) => handleChange("nome", e.target.value)}
                required
              />
              <InputField
                label="Codigo da Disciplina*"
                placeholder="Ex: UESB0123"
                icon="file"
                value={formData.codigo || ""}
                onChange={(e) => handleChange("codigo", e.target.value)}
                required
              />
              <InputField
                label="Creditos*"
                type="number"
                placeholder="Quantidade de creditos"
                icon="file"
                value={formData.creditos || ""}
                onChange={(e) => handleChange("creditos", e.target.value)}
                required
              />
              <InputField
                label="Departamento*"
                placeholder="Informe o departamento"
                icon="file"
                value={formData.departamento || ""}
                onChange={(e) => handleChange("departamento", e.target.value)}
                required
              />

              <div className="w-full flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
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
