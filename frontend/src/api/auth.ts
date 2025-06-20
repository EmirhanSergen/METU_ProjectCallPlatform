import { apiFetch } from "./api";
import type { LoginData, RegisterData } from "../types/auth.types";


export function login(data: LoginData) {
  return apiFetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function register(data: RegisterData) {
  return apiFetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function requestPasswordReset(email: string) {
  return apiFetch("/auth/password_reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}
