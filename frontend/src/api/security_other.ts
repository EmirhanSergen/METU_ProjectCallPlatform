import { apiFetch } from "../lib/api";
import type { SecurityOther, SecurityOtherInput } from "../types/security_other";

export function createSecurityOther(data: SecurityOtherInput) {
  return apiFetch("/security_others", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SecurityOther>;
}

export function getSecurityOther(id: string) {
  return apiFetch(`/security_others/${id}`) as Promise<SecurityOther>;
}

export function listSecurityOthers() {
  return apiFetch(`/security_others`) as Promise<SecurityOther[]>;
}

export function updateSecurityOther(id: string, data: SecurityOtherInput) {
  return apiFetch(`/security_others/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SecurityOther>;
}

export function deleteSecurityOther(id: string) {
  return apiFetch(`/security_others/${id}`, { method: "DELETE" });
}
