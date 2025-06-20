import { apiFetch } from "../lib/api";
import type { InstitutionInput, Institution } from "../types/institution.types";

export function createInstitution(data: InstitutionInput) {
  return apiFetch(`/institutions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<Institution>;
}

export function getInstitution(id: string) {
  return apiFetch(`/institutions/${id}`) as Promise<Institution>;
}

export function listInstitutions() {
  return apiFetch(`/institutions`) as Promise<Institution[]>;
}

export function updateInstitution(id: string, data: InstitutionInput) {
  return apiFetch(`/institutions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<Institution>;
}

export function deleteInstitution(id: string) {
  return apiFetch(`/institutions/${id}`, { method: "DELETE" });
}
