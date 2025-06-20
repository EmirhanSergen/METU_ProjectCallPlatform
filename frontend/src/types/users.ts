export type UserRole = 'applicant' | 'reviewer' | 'admin' | 'super_admin';

export interface UserBase {
  email: string;
  first_name: string;
  last_name: string;
  organization?: string | null;
  role?: UserRole;
}

export interface UserCreate extends UserBase {
  password: string;
}

export interface UserUpdate extends UserBase {
  password?: string | null;
}

export interface User extends UserBase {
  id: string;
  created_at?: string | null;
  updated_at?: string | null;
}
