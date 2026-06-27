import { EnrollmentModel } from "../models/EnrollmentModel";

export class EnrollmentController {
  /**
   * Submits a new class enrollment request for a student.
   */
  static async createEnrollment(studentId: string, classId: string): Promise<EnrollmentModel> {
    try {
      // TODO: Replace with actual API POST call
      // const response = await fetch("http://localhost:3333/api/enrollments", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ student_id: studentId, class_id: classId })
      // });
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            enrollment_id: `enr_${Math.floor(Math.random() * 10000)}`,
            class_id: classId,
            student_id: studentId,
            date_requested: new Date().toISOString(),
          });
        }, 800);
      });
    } catch (error) {
      console.error("Erro no EnrollmentController:", error);
      throw error;
    }
  }

  /**
   * Fetches all current enrollments for a specific student.
   */
  static async getStudentEnrollments(studentId: string): Promise<EnrollmentModel[]> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`http://localhost:3333/api/enrollments/student/${studentId}`);
      // return await response.json();

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              enrollment_id: "enr_1",
              class_id: "cls_1",
              student_id: studentId,
              date_requested: "2026-06-25T10:30:00Z",
            }
          ]);
        }, 600);
      });
    } catch (error) {
      console.error("Erro no EnrollmentController:", error);
      throw error;
    }
  }
}