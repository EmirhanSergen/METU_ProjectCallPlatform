import { apiFetch } from "../lib/api";
import type { SecurityAnswer, SecurityAnswerInput } from "../types/security_answers";

export function createSecurityAnswer(data: SecurityAnswerInput) {
  return apiFetch("/security_answers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SecurityAnswer>;
}

export function getSecurityAnswer(id: string) {
  return apiFetch(`/security_answers/${id}`) as Promise<SecurityAnswer>;
}

export function listSecurityAnswers() {
  return apiFetch(`/security_answers`) as Promise<SecurityAnswer[]>;
}

export function updateSecurityAnswer(id: string, data: SecurityAnswerInput) {
  return apiFetch(`/security_answers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SecurityAnswer>;
}

export function deleteSecurityAnswer(id: string) {
  return apiFetch(`/security_answers/${id}`, { method: "DELETE" });
}
