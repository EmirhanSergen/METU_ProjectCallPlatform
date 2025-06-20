import { apiFetch } from "../lib/api";
import type { SecurityMeta, SecurityMetaInput } from "../types/security_meta";

export function createSecurityMeta(data: SecurityMetaInput) {
  return apiFetch("/security_metas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SecurityMeta>;
}

export function getSecurityMeta(id: string) {
  return apiFetch(`/security_metas/${id}`) as Promise<SecurityMeta>;
}

export function listSecurityMetas() {
  return apiFetch(`/security_metas`) as Promise<SecurityMeta[]>;
}

export function updateSecurityMeta(id: string, data: SecurityMetaInput) {
  return apiFetch(`/security_metas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SecurityMeta>;
}

export function deleteSecurityMeta(id: string) {
  return apiFetch(`/security_metas/${id}`, { method: "DELETE" });
}
