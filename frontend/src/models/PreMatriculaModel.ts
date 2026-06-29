export interface PreMatriculaModel {
  id_pre_matricula: number;
  id_aluno: number;
  id_turma: number;
  data_solicitacao?: string;
  
  // Atributos extras que vêm no listarTodas()
  nome_aluno?: string;
  matricula?: string;
  codigo_turma?: string;
  periodo_letivo?: string;
  id_disciplina?: number;
  codigo_disciplina?: string;
  nome_disciplina?: string;
  creditos?: number;
  departamento?: string;
}

// Interface para o endpoint de relatório
export interface RelatorioMatriculaModel {
  id_turma: number;
  codigo_turma: string;
  periodo_letivo: string;
  nome_disciplina: string;
  departamento: string;
  quantidade_alunos: string | number; // O COUNT() do Postgres pode retornar string
}
