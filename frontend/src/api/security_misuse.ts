import { apiFetch } from "../lib/api";
import type { SecurityMisuse, SecurityMisuseInput } from "../types/security_misuse";

export function createSecurityMisuse(data: SecurityMisuseInput) {
  return apiFetch("/security_misuses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SecurityMisuse>;
}

export function getSecurityMisuse(id: string) {
  return apiFetch(`/security_misuses/${id}`) as Promise<SecurityMisuse>;
}

export function listSecurityMisuses() {
  return apiFetch(`/security_misuses`) as Promise<SecurityMisuse[]>;
}

export function updateSecurityMisuse(id: string, data: SecurityMisuseInput) {
  return apiFetch(`/security_misuses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SecurityMisuse>;
}

export function deleteSecurityMisuse(id: string) {
  return apiFetch(`/security_misuses/${id}`, { method: "DELETE" });
}
