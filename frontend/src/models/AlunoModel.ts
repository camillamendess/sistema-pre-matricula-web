export interface AlunoModel {
  id_aluno: number;
  id_usuario: number;
  nome: string;
  email: string;
  matricula: string;
  tipo_usuario?: number; // Retornado pelos JOINs no backend
}