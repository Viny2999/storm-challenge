export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserData {
  name: string;
  email: string;
  password: string;
  role: Role;
}