import { apiFetch } from "../lib/api";
import type { CallInstitution, CallInstitutionInput } from "../types/callInstitutions.types";

export function getCallInstitutions() {
  return apiFetch(`/call_institutions`) as Promise<CallInstitution[]>;
}

export function getCallInstitution(id: string) {
  return apiFetch(`/call_institutions/${id}`) as Promise<CallInstitution>;
}

export function createCallInstitution(data: CallInstitutionInput) {
  return apiFetch(`/call_institutions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CallInstitution>;
}

export function updateCallInstitution(id: string, data: CallInstitutionInput) {
  return apiFetch(`/call_institutions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CallInstitution>;
}

export function deleteCallInstitution(id: string) {
  return apiFetch(`/call_institutions/${id}`, { method: "DELETE" });
}
