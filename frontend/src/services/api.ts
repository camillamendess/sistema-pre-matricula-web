const API_BASE_URL = "http://localhost:3333/api"; // Altere para a porta do backend

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("@SistemaAcademico:token");

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.erro || `Erro na requisição: ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}