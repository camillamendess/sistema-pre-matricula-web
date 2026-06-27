import { UserModel } from "../models/UserModel";

export class UserController {
  /**
   * Fetches the current logged-in user from the backend.
   */
  static async getCurrentUser(): Promise<UserModel> {
    try {
      // TODO: Replace this URL with your actual backend endpoint (e.g., '/api/users/me')
      // const response = await fetch("http://localhost:3333/api/users/me", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // "Authorization": `Bearer ${token}` // Include auth token if needed
      //   },
      // });
      //
      // if (!response.ok) throw new Error("Falha ao buscar dados do usuário");
      // return await response.json();

      // MOCK RESPONSE FOR DEVELOPMENT
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user_id: "123456",
            name: "Fulano de Tal",
            email: "fulano@uesb.edu.br",
            user_type: "student",
          });
        }, 800); // Simulated network delay
      });
      
    } catch (error) {
      console.error("Erro no UserController:", error);
      throw error;
    }
  }
}