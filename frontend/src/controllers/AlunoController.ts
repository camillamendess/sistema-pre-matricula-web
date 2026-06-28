import { request } from "../services/api";
import { AlunoModel } from "../models/AlunoModel";

export class AlunoController {
  static async cadastrar(dados: Partial<AlunoModel>): Promise<{ mensagem: string, aluno: AlunoModel }> {
    return request("/alunos", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  }

  static async listar(): Promise<AlunoModel[]> {
    return request<AlunoModel[]>("/alunos");
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