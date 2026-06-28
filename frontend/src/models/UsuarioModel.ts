// No backend, 1 = Admin, 2 = Aluno
export type TipoUsuario = 1 | 2;

export interface UsuarioModel {
  id_usuario: number;
  nome: string;
  email: string;
  tipo_usuario: TipoUsuario;
  senha?: string; // Usado apenas no cadastro/login
}