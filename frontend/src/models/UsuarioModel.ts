export type TipoUsuario = 1 | 2; // 1 = Admin, 2 = Aluno

export interface UsuarioModel {
  id_usuario: number;
  nome: string;
  email: string;
  tipo_usuario: TipoUsuario;
  senha?: string;
  
  // Novos campos que chegam no payload quando o usuário é Aluno
  id_aluno?: number;
  matricula?: string;
  matriculas?: Array<{
    id_pre_matricula: number;
    id_turma: number;
    codigo_turma: string;
    periodo_letivo: string;
    codigo_disciplina: string;
    nome_disciplina: string;
    departamento: string;
  }>;
}