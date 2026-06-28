export interface TurmaModel {
  id_turma: number;
  id_disciplina: number;
  codigo_turma: string;
  periodo_letivo: string;
  // Atributos que vêm do JOIN com Disciplina na listagem
  codigo_disciplina?: string;
  nome_disciplina?: string; 
}