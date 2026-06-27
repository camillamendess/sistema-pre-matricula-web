export interface StudentModel {
  student_id: string;
  user_id: string; // Links back to UserModel
  enrollment_number: string; // Matrícula
}