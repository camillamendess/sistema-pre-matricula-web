import { request } from "../services/api";
import { DisciplinaModel } from "../models/DisciplinaModel";

interface DisciplinaFiltros {
  codigo?: string;
  nome?: string;
  departamento?: string;
  creditos?: number;
}

export interface AlunoDisciplina {
  id_aluno: number;
  nome: string;
  email: string;
  matricula: string;
  data_solicitacao?: string;
  id_turma: number;
  codigo_turma: string;
  periodo_letivo: string;
}

function buildQuery(params: object): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export class DisciplinaController {
  static async cadastrar(dados: Partial<DisciplinaModel>): Promise<{ mensagem: string, disciplina: DisciplinaModel }> {
    return request("/disciplinas", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  }

  static async listar(filtros: DisciplinaFiltros = {}): Promise<DisciplinaModel[]> {
    return request<DisciplinaModel[]>(`/disciplinas${buildQuery(filtros)}`);
  }

  static async buscar(id: number): Promise<DisciplinaModel> {
    return request<DisciplinaModel>(`/disciplinas/${id}`);
  }

  static async listarAlunos(id: number): Promise<AlunoDisciplina[]> {
    return request<AlunoDisciplina[]>(`/disciplinas/${id}/alunos`);
  }

  static async atualizar(id: number, dados: Partial<DisciplinaModel>): Promise<{ mensagem: string, disciplina: DisciplinaModel }> {
    return request(`/disciplinas/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    });
  }

  static async excluir(id: number): Promise<{ mensagem: string }> {
    return request(`/disciplinas/${id}`, { method: "DELETE" });
  }
}
