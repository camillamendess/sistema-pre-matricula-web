import { request } from "../services/api";
import { DisciplinaModel } from "../models/DisciplinaModel";

export class DisciplinaController {
  static async cadastrar(dados: Partial<DisciplinaModel>): Promise<{ mensagem: string, disciplina: DisciplinaModel }> {
    return request("/disciplinas", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  }

  static async listar(): Promise<DisciplinaModel[]> {
    return request<DisciplinaModel[]>("/disciplinas");
  }

  static async buscar(id: number): Promise<DisciplinaModel> {
    return request<DisciplinaModel>(`/disciplinas/${id}`);
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