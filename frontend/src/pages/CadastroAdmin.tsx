import { useState } from "react";
import PagesLayout from "../layouts/PagesLayout";
import { AlunoController } from "../controllers/AlunoController";
import { DisciplinaController } from "../controllers/DisciplinaController";
import { TurmaController } from "../controllers/TurmaController";
import InputField from "../components/input-field";

interface CadastroAdminProps {
  tipo: "aluno" | "disciplina" | "turma";
}

export default function CadastroAdmin({ tipo }: CadastroAdminProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (chave: string, valor: string) => {
    setFormData((prev) => ({ ...prev, [chave]: valor }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (tipo === "aluno") {
        await AlunoController.cadastrar({
          nome: formData.nome,
          email: formData.email,
          matricula: formData.matricula,
        });
      } else if (tipo === "disciplina") {
        await DisciplinaController.cadastrar({
          codigo: formData.codigo,
          nome: formData.nome,
          creditos: Number(formData.creditos),
          departamento: formData.departamento,
        });
      } else if (tipo === "turma") {
        await TurmaController.cadastrar({
          id_disciplina: Number(formData.id_disciplina),
          codigo_turma: formData.codigo_turma,
          periodo_letivo: formData.periodo_letivo,
        });
      }

      alert(`${tipo.toUpperCase()} cadastrado(a) com sucesso!`);
      setFormData({}); // Reseta o formulário limpando os inputs
    } catch (error) {
      alert(
        "Erro ao realizar o cadastro. Verifique os dados e tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  const configuracao = {
    aluno: {
      titulo: "Cadastrar Aluno",
      descricao: "Cadastre e gerencie um novo aluno no sistema.",
      subtitulo: "Preencha as informações para cadastrar o aluno.",
      textoBotao: "Cadastrar Aluno",
    },
    disciplina: {
      titulo: "Cadastrar Disciplina",
      descricao: "Cadastre e gerencie uma nova disciplina.",
      subtitulo: "Preencha as informações para cadastrar a disciplina.",
      textoBotao: "Cadastrar Disciplina",
    },
    turma: {
      titulo: "Cadastrar Turma",
      descricao: "Cadastre e gerencie uma nova turma para o semestre.",
      subtitulo: "Preencha as informações para cadastrar a turma.",
      textoBotao: "Cadastrar Turma",
    },
  }[tipo];

  return (
    <PagesLayout
      pageTitle={configuracao.titulo}
      pageDescription={configuracao.descricao}
      userType="admin"
    >
      <div className="flex flex-1 items-center justify-center w-full pb-6">
        <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-100 shadow-xl p-10 flex flex-col items-center">
          <h3 className="text-[#322A6A] font-bold text-base mb-8 text-center">
            {configuracao.subtitulo}
          </h3>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col gap-4 items-center"
          >
            {/* ================= FORMULÁRIO: ALUNO ================= */}
            {tipo === "aluno" && (
              <>
                <InputField
                  label="Nome*"
                  placeholder="Informe o nome do aluno"
                  icon="user"
                  value={formData.nome || ""}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  required
                />
                <InputField
                  label="Email*"
                  type="email"
                  placeholder="Informe o email institucional"
                  icon="file"
                  value={formData.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
                <InputField
                  label="Matrícula*"
                  placeholder="Informe o número de matrícula"
                  icon="user"
                  value={formData.matricula || ""}
                  onChange={(e) => handleChange("matricula", e.target.value)}
                  required
                />
              </>
            )}

            {/* ================= FORMULÁRIO: DISCIPLINA ================= */}
            {tipo === "disciplina" && (
              <>
                <InputField
                  label="Nome da Disciplina*"
                  placeholder="Informe o nome da disciplina"
                  icon="file"
                  value={formData.nome || ""}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  required
                />
                <InputField
                  label="Código da Disciplina*"
                  placeholder="Ex: UESB0123"
                  icon="file"
                  value={formData.codigo || ""}
                  onChange={(e) => handleChange("codigo", e.target.value)}
                  required
                />
                <InputField
                  label="Créditos*"
                  type="number"
                  placeholder="Quantidade de créditos (ex: 4)"
                  icon="file"
                  value={formData.creditos || ""}
                  onChange={(e) => handleChange("creditos", e.target.value)}
                  required
                />
                <InputField
                  label="Departamento*"
                  placeholder="Ex: DSCT - Departamento de Ciências..."
                  icon="file"
                  value={formData.departamento || ""}
                  onChange={(e) => handleChange("departamento", e.target.value)}
                  required
                />
              </>
            )}

            {/* ================= FORMULÁRIO: TURMA ================= */}
            {tipo === "turma" && (
              <>
                <InputField
                  label="ID da Disciplina*"
                  type="number"
                  placeholder="Informe o ID numérico da disciplina"
                  icon="file"
                  value={formData.id_disciplina || ""}
                  onChange={(e) =>
                    handleChange("id_disciplina", e.target.value)
                  }
                  required
                />
                <InputField
                  label="Código da Turma*"
                  placeholder="Ex: T01"
                  icon="file"
                  value={formData.codigo_turma || ""}
                  onChange={(e) => handleChange("codigo_turma", e.target.value)}
                  required
                />
                <InputField
                  label="Período Letivo*"
                  placeholder="Ex: 2026.1"
                  icon="file"
                  value={formData.periodo_letivo || ""}
                  onChange={(e) =>
                    handleChange("periodo_letivo", e.target.value)
                  }
                  required
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-[#322A6A] text-white text-base py-3 rounded-xl font-bold hover:bg-[#251c61] transition-colors cursor-pointer shadow-md disabled:opacity-50"
            >
              {loading ? "Cadastrando..." : configuracao.textoBotao}
            </button>
          </form>
        </div>
      </div>
    </PagesLayout>
  );
}
