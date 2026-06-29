import { request } from "../services/api";
import { UsuarioModel } from "../models/UsuarioModel";

interface AuthResponse {
  token: string;
  usuario: UsuarioModel;
}

interface UsuarioFiltros {
  nome?: string;
  email?: string;
  tipo_usuario?: number;
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

export class UsuarioController {
  static async login(email: string, senha: string): Promise<AuthResponse> {
    const data = await request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    });

    if (data.token) {
      localStorage.setItem("@SistemaAcademico:token", data.token);
    }
    return data;
  }

  static async cadastrarAdmin(dados: Partial<UsuarioModel>): Promise<{ mensagem: string, usuario: UsuarioModel }> {
    return request("/usuarios/admin", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  }

  static async listar(filtros: UsuarioFiltros = {}): Promise<UsuarioModel[]> {
    return request<UsuarioModel[]>(`/usuarios${buildQuery(filtros)}`);
  }

  static async buscar(id: number): Promise<UsuarioModel> {
    return request<UsuarioModel>(`/usuarios/${id}`);
  }

  static async atualizar(id: number, dados: Partial<UsuarioModel>): Promise<{ mensagem: string, usuario: UsuarioModel }> {
    return request(`/usuarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    });
  }

  static async excluir(id: number): Promise<{ mensagem: string }> {
    return request(`/usuarios/${id}`, { method: "DELETE" });
  }
}
