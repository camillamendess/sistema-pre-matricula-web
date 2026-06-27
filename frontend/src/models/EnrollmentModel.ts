export interface EnrollmentModel {
  enrollment_id: string;
  class_id: string;
  student_id: string;
  date_requested: string; // ISO string format recommended (e.g., "2026-06-27T16:22:00Z")
}