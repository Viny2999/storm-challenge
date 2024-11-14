import { Role } from "./User";

export interface LoginResponse {
  token: string;
  role: Role;
}