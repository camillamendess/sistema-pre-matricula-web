import { CourseModel } from "../models/CourseModel";

export class CourseController {
  /**
   * Fetches a list of all courses available in the institution.
   */
  static async getAllCourses(): Promise<CourseModel[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch("http://localhost:3333/api/courses");
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              course_id: "crs_1",
              course_name: "Arquitetura de Computadores",
              course_code: "COMP101",
              course_credits: 4,
              department: "Ciência da Computação",
            },
            {
              course_id: "crs_2",
              course_name: "Programação Concorrente",
              course_code: "COMP102",
              course_credits: 4,
              department: "Ciência da Computação",
            },
            {
              course_id: "crs_3",
              course_name: "Lógica Digital",
              course_code: "ENG201",
              course_credits: 6,
              department: "Engenharia",
            }
          ]);
        }, 600);
      });
    } catch (error) {
      console.error("Erro no CourseController:", error);
      throw error;
    }
  }
}