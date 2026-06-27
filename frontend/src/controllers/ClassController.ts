import { ClassModel } from "../models/ClassModel";

export class ClassController {
  /**
   * Fetches classes available for a specific academic term.
   */
  static async getClassesByTerm(term: string): Promise<ClassModel[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`http://localhost:3333/api/classes?term=${term}`);
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              class_id: "cls_1",
              course_id: "crs_1", // Links to Arquitetura de Computadores
              class_code: "T01",
              academic_term: term,
            },
            {
              class_id: "cls_2",
              course_id: "crs_2", // Links to Programação Concorrente
              class_code: "T02",
              academic_term: term,
            }
          ]);
        }, 500);
      });
    } catch (error) {
      console.error("Erro no ClassController:", error);
      throw error;
    }
  }
}