import { request } from "../services/api";
import { TurmaModel } from "../models/TurmaModel";

interface TurmaFiltros {
  codigo_turma?: string;
  periodo_letivo?: string;
  id_disciplina?: number;
  nome_disciplina?: string;
  codigo_disciplina?: string;
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

export class TurmaController {
  static async cadastrar(dados: Partial<TurmaModel>): Promise<{ mensagem: string, turma: TurmaModel }> {
    return request("/turmas", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  }

  static async listar(filtros: TurmaFiltros = {}): Promise<TurmaModel[]> {
    return request<TurmaModel[]>(`/turmas${buildQuery(filtros)}`);
  }

  static async buscar(id: number): Promise<TurmaModel> {
    return request<TurmaModel>(`/turmas/${id}`);
  }

  static async atualizar(id: number, dados: Partial<TurmaModel>): Promise<{ mensagem: string, turma: TurmaModel }> {
    return request(`/turmas/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    });
  }

  static async excluir(id: number): Promise<{ mensagem: string }> {
    return request(`/turmas/${id}`, { method: "DELETE" });
  }
}
