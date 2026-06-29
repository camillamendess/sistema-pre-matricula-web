import { useEffect, useState } from "react";
import PagesLayout from "../layouts/PagesLayout";
import { PreMatriculaController } from "../controllers/PreMatriculaController";
import { PreMatriculaModel } from "../models/PreMatriculaModel";

export default function Matriculas() {
  const [matriculas, setMatriculas] = useState<PreMatriculaModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function carregarMatriculas() {
      try {
        const dados = await PreMatriculaController.listarMinhas();
        setMatriculas(dados);
      } catch (err: any) {
        setError(err.message || "Nao foi possivel carregar suas turmas.");
      } finally {
        setIsLoading(false);
      }
    }

    carregarMatriculas();
  }, []);

  return (
    <PagesLayout
      pageTitle="Minhas Turmas"
      pageDescription="Acompanhe as disciplinas em que voce esta matriculado."
      userType="aluno"
    >
      <div className="flex flex-col flex-1 w-full pt-2 pr-6">
        {error && (
          <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm font-medium border border-red-200">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-[#322A6A] font-bold text-lg animate-pulse mt-10">
            Carregando suas turmas...
          </div>
        ) : matriculas.length === 0 ? (
          <div className="w-full max-w-3xl bg-[#F8F9FA] rounded-2xl border border-gray-100 shadow-md p-8 text-center text-[#322A6A] font-medium">
            Voce ainda nao esta matriculado em nenhuma turma.
          </div>
        ) : (
          <div className="w-full max-w-5xl bg-[#F8F9FA] rounded-2xl border border-gray-100 shadow-xl p-6 flex flex-col gap-3">
            {matriculas.map((matricula) => (
              <div
                key={matricula.id_pre_matricula}
                className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[#322A6A]"
              >
                <div>
                  <h3 className="font-bold text-lg">
                    Turma {matricula.codigo_turma}
                  </h3>
                  <p className="text-sm text-[#332a6ad0]">
                    {matricula.nome_disciplina} | {matricula.codigo_disciplina}
                  </p>
                </div>
                <div className="text-sm font-medium md:text-right">
                  <p className="text-green-700 font-bold">Matriculado</p>
                  <p>Periodo: {matricula.periodo_letivo}</p>
                  <p>Creditos: {matricula.creditos}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PagesLayout>
  );
}
