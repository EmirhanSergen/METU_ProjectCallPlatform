import { apiFetch } from "../lib/api";
import type { User, UserCreate, UserUpdate } from "../types/users";

export function createUser(data: UserCreate) {
  return apiFetch(`/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<User>;
}

export function getUser(id: string) {
  return apiFetch(`/users/${id}`) as Promise<User>;
}

export function listUsers() {
  return apiFetch(`/users`) as Promise<User[]>;
}

export function updateUser(id: string, data: UserUpdate) {
  return apiFetch(`/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<User>;
}

export function deleteUser(id: string) {
  return apiFetch(`/users/${id}`, { method: "DELETE" });
}
