import { apiFetch } from "../lib/api";
import type { SecurityEUCI, SecurityEUCIInput } from "../types/security_euci";

export function createSecurityEUCI(data: SecurityEUCIInput) {
  return apiFetch("/security_eucis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SecurityEUCI>;
}

export function getSecurityEUCI(id: string) {
  return apiFetch(`/security_eucis/${id}`) as Promise<SecurityEUCI>;
}

export function listSecurityEUCIs() {
  return apiFetch(`/security_eucis`) as Promise<SecurityEUCI[]>;
}

export function updateSecurityEUCI(id: string, data: SecurityEUCIInput) {
  return apiFetch(`/security_eucis/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SecurityEUCI>;
}

export function deleteSecurityEUCI(id: string) {
  return apiFetch(`/security_eucis/${id}`, { method: "DELETE" });
}
