import { useState, useEffect } from "react";
import PagesLayout from "../layouts/PagesLayout"; // Ajuste o caminho se necessário
import SmallCard from "../components/small-card";
import { useAuth } from "../contexts/AuthContext";
import { TurmaController } from "../controllers/TurmaController";
import { AlunoController } from "../controllers/AlunoController";
import { PreMatriculaController } from "../controllers/PreMatriculaController";
import { TurmaModel } from "../models/TurmaModel";

export default function RealizarMatriculas() {
  const { user } = useAuth();
  const [turmas, setTurmas] = useState<TurmaModel[]>([]);
  const [idAluno, setIdAluno] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  
  // Estados de carregamento e feedback
  const [isLoading, setIsLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchDadosMatricula = async () => {
      try {
        // Busca as turmas/disciplinas disponíveis no back-end
        const turmasDisponiveis = await TurmaController.listar();
        setTurmas(turmasDisponiveis);

        // Identifica o id_aluno correspondente ao usuário logado
        if (user?.id_usuario) {
          const alunos = await AlunoController.listar();
          const alunoAtual = alunos.find(a => a.id_usuario === user.id_usuario);
          if (alunoAtual) {
            setIdAluno(alunoAtual.id_aluno);
          }
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

    fetchDadosMatricula();
  }, [user]);

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleMatricular = async (idTurma: number) => {
    if (!idAluno) {
      setFeedback({ 
        message: "Erro de identificação: O seu perfil de aluno não foi encontrado.", 
        type: "error" 
      });
      return;
    }

    setEnrollingId(idTurma);
    setFeedback({ message: "", type: "" });

    try {
      await PreMatriculaController.cadastrar(idAluno, idTurma);
      
      setFeedback({ 
        message: "Pré-matrícula realizada com sucesso!", 
        type: "success" 
      });
      setOpenAccordion(null); // Fecha o accordion após o sucesso

    } catch (error: any) {
      setFeedback({ 
        message: error.message || "Erro ao realizar matrícula. Você já pode estar matriculado nesta turma.", 
        type: "error" 
      });
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <PagesLayout pageTitle="Disciplinas Disponíveis">
      <div className="bg-[#f8f8f8] rounded-[10px] p-10 w-full max-w-5xl relative">
        <h3 className="text-[#322A6A] text-xl font-bold mb-6">
          Selecione as disciplinas para matrícula
        </h3>

        {/* Exibição de Feedback Centralizado */}
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
            turmas.map((turma) => (
              <div key={turma.id_turma} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleAccordion(turma.id_turma)}
                  className="w-full flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className="text-[#322A6A] font-bold text-lg text-left">
                    {turma.nome_disciplina}
                  </span>
                  
                  <svg
                    className={`w-6 h-6 text-[#322A6A] transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openAccordion === turma.id_turma ? "rotate-180" : ""
                    }`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {/* Accordion Content */}
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

                    {/* Action Button */}
                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleMatricular(turma.id_turma)}
                        disabled={enrollingId === turma.id_turma}
                        className="bg-[#322A6A] text-white px-8 py-2 rounded-lg font-bold hover:bg-[#251c61] transition-colors cursor-pointer shadow-md disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {enrollingId === turma.id_turma ? "Processando..." : "Matricular"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        <br />
        <SmallCard
            linkTo="/home-aluno" // Ajustado para apontar para a rota protegida correta do aluno
            text="Voltar"
            icon="profile" // Necessário caso o SmallCard espere um ícone, ou remova se for opcional
            variant="blue"
        />
      </div>
    </PagesLayout>
  );
}