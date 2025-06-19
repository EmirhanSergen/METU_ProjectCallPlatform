import { apiFetch } from "../lib/api";
import type { CreateUserInput, UpdateUserInput, User } from "../types/users.types";

export function createUser(data: CreateUserInput) {
  const payload = {
    email: data.email,
    first_name: data.first_name ?? "",
    last_name: data.last_name ?? "",
    password: data.password ?? "",
    role: data.role,
  };
  return apiFetch("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }) as Promise<User>;
}

export function updateUser(id: string, data: UpdateUserInput) {
  return apiFetch(`/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<User>;
}

export function getUser(id: string) {
  return apiFetch(`/users/${id}`) as Promise<User>;
}
