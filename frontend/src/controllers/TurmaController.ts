import { request } from "../services/api";
import { TurmaModel } from "../models/TurmaModel";

export class TurmaController {
  static async cadastrar(dados: Partial<TurmaModel>): Promise<{ mensagem: string, turma: TurmaModel }> {
    return request("/turmas", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  }

  static async listar(): Promise<TurmaModel[]> {
    return request<TurmaModel[]>("/turmas");
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