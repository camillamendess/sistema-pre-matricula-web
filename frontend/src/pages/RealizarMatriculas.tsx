import { useState, useEffect } from "react";
import PagesLayout from "../layouts/PagesLayout";
import SmallCard from "../components/small-card";
import { useAuth } from "../contexts/AuthContext";
import { TurmaController } from "../controllers/TurmaController";
import { PreMatriculaController } from "../controllers/PreMatriculaController";
import { TurmaModel } from "../models/TurmaModel";

export default function RealizarMatriculas() {
  const { user } = useAuth();
  
  const [turmas, setTurmas] = useState<TurmaModel[]>([]);
  // Estado local para controlar as matrículas e reagir na UI instantaneamente
  const [turmasMatriculadas, setTurmasMatriculadas] = useState<number[]>([]);
  
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

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

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleMatricular = async (idTurma: number) => {
    // Pega o id_aluno diretamente do usuário autenticado
    const idAluno = user?.id_aluno;
    console.log("user:", user);

    if (!idAluno) {
      setFeedback({ 
        message: "Erro de identificação: O seu perfil de aluno não foi encontrado na sessão.", 
        type: "error" 
      });
      return;
    }

    setEnrollingId(idTurma);
    setFeedback({ message: "", type: "" });

    try {
      await PreMatriculaController.cadastrar(idTurma);
      
      setFeedback({ 
        message: "Pré-matrícula realizada com sucesso!", 
        type: "success" 
      });
      
      // Adiciona a turma recém-matriculada ao estado para atualizar a UI imediatamente
      setTurmasMatriculadas((prev) => [...prev, idTurma]);
      setOpenAccordion(null);

    } catch (error: any) {
      setFeedback({ 
        message: error.message || "Erro ao realizar matrícula.", 
        type: "error" 
      });
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <PagesLayout pageTitle="Disciplinas Disponíveis">
      <div className="bg-[#f8f8f8] rounded-[10px] p-6 lg:p-10 w-full max-w-5xl relative">
        <h3 className="text-[#322A6A] text-xl font-bold mb-6">
          Selecione as disciplinas para matrícula
        </h3>

        {feedback.message && (
          <div className={`w-full mb-6 p-4 rounded-lg text-sm font-medium border ${
            feedback.type === 'error' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-800 border-green-200'
          }`}>
            {feedback.message}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="text-center py-10 text-[#322A6A] font-medium animate-pulse">
              Carregando disciplinas disponíveis...
            </div>
          ) : turmas.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-medium border-2 border-dashed border-gray-300 rounded-lg">
              Nenhuma disciplina encontrada para o período atual.
            </div>
          ) : (
            turmas.map((turma) => {
              const isMatriculado = turmasMatriculadas.includes(turma.id_turma);

              return (
                <div key={turma.id_turma} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  
                  <button
                    onClick={() => toggleAccordion(turma.id_turma)}
                    className="w-full flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#322A6A] font-bold text-lg text-left">
                        {turma.nome_disciplina}
                      </span>
                      
                      {isMatriculado && (
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-green-200">
                          Matriculado(a)
                        </span>
                      )}
                    </div>
                    
                    <svg
                      className={`w-6 h-6 text-[#322A6A] transition-transform duration-300 flex-shrink-0 ml-4 ${
                        openAccordion === turma.id_turma ? "rotate-180" : ""
                      }`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  {openAccordion === turma.id_turma && (
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <p className="text-gray-700 font-medium">
                          <strong>Turma:</strong> {turma.codigo_turma}
                        </p>
                        <p className="text-gray-700 font-medium">
                          <strong>Período Letivo:</strong> {turma.periodo_letivo}
                        </p>
                        <p className="text-gray-700 font-medium">
                          <strong>Código da Disciplina:</strong> {turma.codigo_disciplina}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <button 
                          onClick={() => handleMatricular(turma.id_turma)}
                          disabled={isMatriculado || enrollingId === turma.id_turma}
                          className={`px-8 py-2 rounded-lg font-bold transition-colors shadow-md 
                            ${isMatriculado 
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                              : "bg-[#322A6A] text-white hover:bg-[#251c61] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                            }`}
                        >
                          {enrollingId === turma.id_turma 
                            ? "Processando..." 
                            : isMatriculado 
                              ? "Matrícula Realizada" 
                              : "Matricular"
                          }
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        
        <br />
        <div className="w-fit">
          <SmallCard
              linkTo="/home" 
              text="Voltar"
              icon="profile" 
              variant="blue"
          />
        </div>
      </div>
    </PagesLayout>
  );
}