import { useEffect, useState } from "react";
import PagesLayout from "../layouts/PagesLayout";
import { useAuth } from "../contexts/AuthContext";
import { PreMatriculaController } from "../controllers/PreMatriculaController";
import { PreMatriculaModel } from "../models/PreMatriculaModel";

export default function ComprovanteMatricula() {
  const { user } = useAuth();
  const [matriculas, setMatriculas] = useState<PreMatriculaModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function carregarMatriculas() {
      try {
        const dados = await PreMatriculaController.listarMinhas();
        setMatriculas(dados);
      } catch (err: any) {
        setError(err.message || "Nao foi possivel gerar o comprovante.");
      } finally {
        setIsLoading(false);
      }
    }

    carregarMatriculas();
  }, []);

  const totalCreditos = matriculas.reduce(
    (total, matricula) => total + Number(matricula.creditos || 0),
    0,
  );

  return (
    <PagesLayout
      pageTitle="Comprovante de Matricula"
      pageDescription="Confira e imprima seu comprovante de disciplinas matriculadas."
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
            Gerando comprovante...
          </div>
        ) : (
          <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-xl p-6 text-[#322A6A]">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-gray-200 pb-5 mb-5">
              <div>
                <h3 className="text-xl font-bold">Comprovante de Matricula</h3>
                <p className="text-sm text-[#332a6ad0] mt-1">
                  Sistema Academico de Pré-Matrícula
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="bg-[#322A6A] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer print:hidden"
              >
                Imprimir
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium mb-6">
              <p>
                <strong>Aluno:</strong> {user?.nome}
              </p>
              <p>
                <strong>E-mail:</strong> {user?.email}
              </p>
              <p>
                <strong>Matricula:</strong> {matriculas[0]?.matricula || "-"}
              </p>
              <p>
                <strong>Total de creditos:</strong> {totalCreditos}
              </p>
            </div>

            {matriculas.length === 0 ? (
              <p className="text-center text-gray-500 font-medium py-8">
                Nao ha disciplinas matriculadas para emitir comprovante.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#322A6A] text-white">
                      <th className="text-left p-3">Disciplina</th>
                      <th className="text-left p-3">Codigo</th>
                      <th className="text-left p-3">Turma</th>
                      <th className="text-left p-3">Periodo</th>
                      <th className="text-left p-3">Creditos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matriculas.map((matricula) => (
                      <tr
                        key={matricula.id_pre_matricula}
                        className="border-b border-gray-200"
                      >
                        <td className="p-3 font-semibold">
                          {matricula.nome_disciplina}
                        </td>
                        <td className="p-3">{matricula.codigo_disciplina}</td>
                        <td className="p-3">{matricula.codigo_turma}</td>
                        <td className="p-3">{matricula.periodo_letivo}</td>
                        <td className="p-3">{matricula.creditos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </PagesLayout>
  );
}
