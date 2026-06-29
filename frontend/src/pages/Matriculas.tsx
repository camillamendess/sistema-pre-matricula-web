import { useEffect, useState } from "react";
import PagesLayout from "../layouts/PagesLayout";
import { useAuth } from "../contexts/AuthContext"; // Ajuste o caminho se necessário
import { TurmaModel } from "../models/TurmaModel";
import { TurmaController } from "../controllers/TurmaController";

interface Matricula {
  id_pre_matricula: number;
  id_aluno: number;
  nome_aluno: string;
  nome_disciplina: string;
  codigo_turma: string;
}

export default function Matriculas() {
  const { user } = useAuth();
  const [turmas, setTurmas] = useState<TurmaModel[]>([]);
  // Estado local para controlar as matrículas e reagir na UI instantaneamente
  const [turmasMatriculadas, setTurmasMatriculadas] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const isAdmin = user?.tipo_usuario === 1;

  useEffect(() => {
      const fetchTurmasDisponiveis = async () => {
        try {
          // Busca apenas as turmas/disciplinas disponíveis no back-end
          const turmasData = await TurmaController.listar();
          setTurmas(turmasData);
  
          // Se o usuário for aluno e tiver matrículas no payload, extrai os IDs das turmas
          if (user?.tipo_usuario === 2 && user.matriculas) {
            const idsMatriculados = user.matriculas.map((m) => m.id_turma);
            setTurmasMatriculadas(idsMatriculados);
          }
        } catch (error) {
          setFeedback({ 
            message: "Erro ao carregar as disciplinas do servidor. Tente novamente mais tarde.", 
            type: "error" 
          });
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchTurmasDisponiveis();
    }, [user]);

  return (
    <PagesLayout
      pageTitle="Matrículas"
      pageDescription={user?.tipo_usuario === 1 ? "Gerenciamento de todas as matrículas" : "Minhas matrículas"}
      userType={user?.tipo_usuario === 1 ? "admin" : "aluno"}
    >
      {isLoading ? (
        <div className="text-center p-6">Carregando...</div>
      ) : feedback.message ? (
        <div className="bg-red-100 text-red-700 p-4 rounded">{feedback.message}</div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                {isAdmin && <th className="py-2">Aluno</th>}
                <th className="py-2">Disciplina</th>
                <th className="py-2">Turma</th>
              </tr>
            </thead>
            <tbody>
            {turmas.length === 0 ? (
                <div className="text-center py-10 text-gray-500 font-medium border-2 border-dashed border-gray-300 rounded-lg">
                Nenhuma matrícula encontrada.
                </div>
            ) : (
                turmas.map((turma) => {
                const isMatriculado = turmasMatriculadas.includes(turma.id_turma);
                  return isMatriculado ? (
                  <tr key={turma.id_turma} className="border-b hover:bg-gray-50">
                    {isAdmin && <td className="py-3">{turma.nome_disciplina}</td>}
                    <td className="py-3">{turma.nome_disciplina}</td>
                    <td className="py-3">{turma.periodo_letivo}</td>
                  </tr>
                  ) : null;
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </PagesLayout>
  );
}