import { request } from "../services/api";
import { PreMatriculaModel, RelatorioMatriculaModel } from "../models/PreMatriculaModel";

export class PreMatriculaController {
  static async cadastrar(id_turma: number): Promise<{ mensagem: string, matricula: PreMatriculaModel }> {
    return request("/pre-matriculas", {
      method: "POST",
      body: JSON.stringify({ id_turma }),
    });
  }

  static async cadastrarParaAluno(id_aluno: number, id_turma: number): Promise<{ mensagem: string, matricula: PreMatriculaModel }> {
    return request("/pre-matriculas/admin", {
      method: "POST",
      body: JSON.stringify({ id_aluno, id_turma }),
    });
  }

  static async listar(): Promise<PreMatriculaModel[]> {
    return request<PreMatriculaModel[]>("/pre-matriculas");
  }

  static async listarMinhas(): Promise<PreMatriculaModel[]> {
    return request<PreMatriculaModel[]>("/pre-matriculas/minhas");
  }

  static async listarPorAluno(id_aluno: number): Promise<PreMatriculaModel[]> {
    return request<PreMatriculaModel[]>(`/pre-matriculas/aluno/${id_aluno}`);
  }

  /**
   * Endpoint para o colegiado emitir relatórios filtrados e ordenados
   */
  static async relatorio(parametros?: { id_turma?: number, ordenarPor?: 'disciplina' | 'alunos', ordem?: 'ASC' | 'DESC' }): Promise<RelatorioMatriculaModel[]> {
    const params = new URLSearchParams();
    if (parametros?.id_turma) params.append("id_turma", parametros.id_turma.toString());
    if (parametros?.ordenarPor) params.append("ordenarPor", parametros.ordenarPor);
    if (parametros?.ordem) params.append("ordem", parametros.ordem);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    return request<RelatorioMatriculaModel[]>(`/pre-matriculas/relatorio${queryString}`);
  }

  static async excluir(id: number): Promise<{ mensagem: string }> {
    return request(`/pre-matriculas/${id}`, { method: "DELETE" });
  }
}
