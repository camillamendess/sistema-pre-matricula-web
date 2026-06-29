import { request } from "../services/api";
import { AlunoModel } from "../models/AlunoModel";

interface AlunoFiltros {
  nome?: string;
  email?: string;
  matricula?: string;
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

export class AlunoController {
  static async cadastrar(dados: Partial<AlunoModel>): Promise<{ mensagem: string, aluno: AlunoModel }> {
    return request("/alunos", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  }

  static async listar(filtros: AlunoFiltros = {}): Promise<AlunoModel[]> {
    return request<AlunoModel[]>(`/alunos${buildQuery(filtros)}`);
  }

  static async buscarMe(): Promise<AlunoModel> {
    return request<AlunoModel>("/alunos/me");
  }

  static async buscar(id: number): Promise<AlunoModel> {
    return request<AlunoModel>(`/alunos/${id}`);
  }

  static async atualizar(id: number, dados: Partial<AlunoModel>): Promise<{ mensagem: string, aluno: AlunoModel }> {
    return request(`/alunos/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    });
  }

  static async excluir(id: number): Promise<{ mensagem: string }> {
    return request(`/alunos/${id}`, { method: "DELETE" });
  }
}
