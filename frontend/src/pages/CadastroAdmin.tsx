import InputField from "../components/input-field";
import PagesLayout from "../layouts/PagesLayout";

interface CadastroAdminProps {
  tipo: "aluno" | "disciplina" | "turma";
}

export default function CadastroAdmin({
  tipo,
}: CadastroAdminProps): React.JSX.Element {
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

  const renderCampos = () => {
    switch (tipo) {
      case "aluno":
        return (
          <>
            <InputField
              label="Nome*"
              type="text"
              placeholder="Informe o nome do aluno"
              icon="user"
            />
            <InputField
              label="CPF*"
              type="text"
              placeholder="Informe o CPF"
              icon="file"
            />
            <InputField
              label="Matrícula*"
              type="text"
              placeholder="Informe a matrícula"
              icon="user"
            />
          </>
        );
      case "disciplina":
        return (
          <>
            <InputField
              label="Nome da Disciplina*"
              type="text"
              placeholder="Informe o nome da disciplina"
              icon="file"
            />
            <InputField
              label="Código*"
              type="text"
              placeholder="Informe o código da disciplina"
              icon="file"
            />
            <InputField
              label="Período Letivo*"
              type="text"
              placeholder="Informe o período letivo (ex: 2026.1)"
              icon="file"
            />
          </>
        );
      case "turma":
        return (
          <>
            <InputField
              label="Disciplina*"
              type="text"
              placeholder="Informe o nome ou código da disciplina"
              icon="file"
            />
            <InputField
              label="Professor*"
              type="text"
              placeholder="Informe o nome do professor"
              icon="user"
            />
            <InputField
              label="Horário*"
              type="text"
              placeholder="Informe o horário (ex: Seg/Qua 14h)"
              icon="file"
            />
          </>
        );
    }
  };

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

          <form className="w-full max-w-md flex flex-col gap-4 items-center">
            {renderCampos()}

            <button
              type="submit"
              className="w-full mt-6 bg-[#322A6A] text-white text-base py-3 rounded-xl font-bold hover:bg-[#251c61] transition-colors cursor-pointer shadow-md"
            >
              {configuracao.textoBotao}
            </button>
          </form>
        </div>
      </div>
    </PagesLayout>
  );
}
