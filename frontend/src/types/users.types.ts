import { UserRole } from './global';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CreateUserInput {
  email: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  role?: UserRole;
}

export interface UpdateUserInput {
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string | null;
  role?: UserRole;
}
