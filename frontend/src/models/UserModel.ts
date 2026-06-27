export type UserType = "student" | "admin";

export interface UserModel {
  user_id: string;
  name: string;
  email: string;
  user_type: UserType;
  password?: string; // Optional on frontend, as it's encrypted on the DB
}