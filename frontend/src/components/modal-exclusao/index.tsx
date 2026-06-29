import React from "react";

interface ModalExclusaoProps {
  isOpen: boolean;
  tipo: "alunos" | "disciplinas" | "turmas";
  item: any;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function ModalExclusao({
  isOpen,
  tipo,
  item,
  onClose,
  onConfirm,
}: ModalExclusaoProps) {
  if (!isOpen || !item) return null;

  const textoExcluir = {
    alunos: "este(a) aluno(a)?",
    disciplinas: "esta disciplina?",
    turmas: "esta turma?",
  }[tipo];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-999 p-4">
      <div className="bg-white rounded-4xl w-full max-w-lg p-8 shadow-2xl flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
        <h4 className="text-[#1A1A1A] font-bold text-center text-lg md:text-xl mb-6">
          Tem certeza que deseja EXCLUIR {textoExcluir}
        </h4>

        <div className="w-full bg-[#E9ECEF] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-1.5 mb-8 border border-gray-200">
          <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">
            Informações do{" "}
            {tipo === "alunos"
              ? "Aluno(a)"
              : tipo === "disciplinas"
                ? "Disciplina"
                : "Turma"}{" "}
            aqui
          </span>

          <h5 className="text-[#322A6A] font-bold text-xl mt-2">
            {tipo === "alunos" && item.nome}
            {tipo === "disciplinas" && item.nome}
            {tipo === "turmas" && `Turma ${item.codigo_turma}`}
          </h5>

          <p className="text-gray-600 font-medium text-sm">
            {tipo === "alunos" && `Email: ${item.email}`}
            {tipo === "disciplinas" && `Departamento: ${item.departamento}`}
            {tipo === "turmas" && `ID Disciplina: ${item.id_disciplina}`}
          </p>
          <p className="text-gray-500 font-semibold font-mono text-sm">
            {tipo === "alunos" && `Matrícula: ${item.matricula}`}
            {tipo === "disciplinas" && `Código: ${item.codigo}`}
            {tipo === "turmas" && `Período Letivo: ${item.periodo_letivo}`}
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-center gap-4 w-full max-w-sm">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-6 rounded-xl border border-red-500 text-red-500 font-bold hover:bg-red-50 transition-colors cursor-pointer text-center text-sm md:text-base"
          >
            Excluir{" "}
            {tipo === "alunos"
              ? "Aluno(a)"
              : tipo === "disciplinas"
                ? "Disciplina"
                : "Turma"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors cursor-pointer text-center text-sm md:text-base shadow-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
