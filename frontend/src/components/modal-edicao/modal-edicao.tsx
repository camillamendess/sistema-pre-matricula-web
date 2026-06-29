import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import InputField from "../input-field";
import { AlunoController } from "../../controllers/AlunoController";
import { DisciplinaController } from "../../controllers/DisciplinaController";
import { TurmaController } from "../../controllers/TurmaController";

interface ModalEdicaoProps {
  isOpen: boolean;
  tipo: "alunos" | "disciplinas" | "turmas";
  item: any; // Dados atuais vindos da tabela
  onClose: () => void;
  onRefresh: () => void; // Função para recarregar a lista após salvar
}

export default function ModalEdicao({
  isOpen,
  tipo,
  item,
  onClose,
  onRefresh,
}: ModalEdicaoProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  // Carrega os dados do item para o formulário assim que o modal abre
  useEffect(() => {
    if (isOpen && item) {
      setFormData(item);
    }
  }, [isOpen, item]);

  if (!isOpen) return null;

  const handleChange = (chave: string, valor: string) => {
    setFormData((prev) => ({ ...prev, [chave]: valor }));
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (tipo === "alunos") {
        const idAluno = item.id_aluno || item.id;

        await AlunoController.atualizar(idAluno, {
          ...formData,
          nome: formData.nome,
          email: formData.email,
        });
      } else if (tipo === "disciplinas") {
        await DisciplinaController.atualizar(item.id_disciplina, {
          nome: formData.nome,
          codigo: formData.codigo,
          creditos: Number(formData.creditos),
          departamento: formData.departamento,
        });
      } else if (tipo === "turmas") {
        await TurmaController.atualizar(item.id_turma, {
          codigo_turma: formData.codigo_turma,
          periodo_letivo: formData.periodo_letivo,
        });
      }

      alert("Alterações salvas com sucesso!");
      onRefresh(); // Atualiza a tabela principal
      onClose(); // Fecha o modal
    } catch (error) {
      alert("Erro ao atualizar os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header do Modal */}
        <div className="bg-[#322A6A] px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold text-xl">
              Editar {tipo.slice(0, -1)}
            </h2>
            <p className="text-white/70 text-xs">
              Altere as informações abaixo
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSalvar} className="p-8 flex flex-col gap-4">
          {tipo === "alunos" && (
            <>
              <InputField
                label="Nome do Aluno"
                value={formData.nome || ""}
                onChange={(e) => handleChange("nome", e.target.value)}
                icon="user"
              />
              <InputField
                label="E-mail Institucional"
                value={formData.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                icon="file"
              />
            </>
          )}

          {tipo === "disciplinas" && (
            <>
              <InputField
                label="Nome da Disciplina"
                value={formData.nome || ""}
                onChange={(e) => handleChange("nome", e.target.value)}
                icon="file"
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Código"
                  value={formData.codigo || ""}
                  onChange={(e) => handleChange("codigo", e.target.value)}
                  icon="file"
                />
                <InputField
                  label="Créditos"
                  type="number"
                  value={formData.creditos || ""}
                  onChange={(e) => handleChange("creditos", e.target.value)}
                  icon="file"
                />
              </div>
              <InputField
                label="Departamento"
                value={formData.departamento || ""}
                onChange={(e) => handleChange("departamento", e.target.value)}
                icon="file"
              />
            </>
          )}

          {tipo === "turmas" && (
            <>
              <InputField
                label="Código da Turma"
                value={formData.codigo_turma || ""}
                onChange={(e) => handleChange("codigo_turma", e.target.value)}
                icon="file"
              />
              <InputField
                label="Período Letivo"
                value={formData.periodo_letivo || ""}
                onChange={(e) => handleChange("periodo_letivo", e.target.value)}
                icon="file"
              />
            </>
          )}

          {/* Botões de Ação */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#322A6A] text-white font-bold py-3 rounded-xl hover:bg-[#251c61] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
