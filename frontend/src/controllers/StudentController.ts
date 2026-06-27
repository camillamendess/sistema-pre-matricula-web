import { StudentModel } from "../models/StudentModel";

export class StudentController {
  /**
   * Fetches the student profile details using their user_id.
   */
  static async getStudentByUserId(userId: string): Promise<StudentModel> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`http://localhost:3333/api/students/user/${userId}`);
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            student_id: "std_1001",
            user_id: userId,
            enrollment_number: "2024100123",
          });
        }, 400);
      });
    } catch (error) {
      console.error("Erro no StudentController:", error);
      throw error;
    }
  }
}