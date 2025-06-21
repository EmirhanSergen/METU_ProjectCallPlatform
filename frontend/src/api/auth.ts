import { apiFetch } from "../lib/api";
import type { LoginData, RegisterData, LoginResponse, RegisterResponse } from "../types/auth.types";

export function login(data: LoginData) {
  return apiFetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<LoginResponse>;
}

export function register(data: RegisterData) {
  return apiFetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<RegisterResponse>;
}

export function requestPasswordReset(email: string) {
  return apiFetch("/auth/password_reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}
