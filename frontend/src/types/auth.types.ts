export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterResponse {
  id?: string;
}
