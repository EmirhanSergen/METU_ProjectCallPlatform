import { apiFetch } from "../api";

export interface LoginData {
  email: string;
  password: string;
}

export function login(data: LoginData) {
  return apiFetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export interface RegisterData {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}

export function register(data: RegisterData) {
  return apiFetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
