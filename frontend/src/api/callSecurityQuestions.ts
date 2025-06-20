import { apiFetch } from "../lib/api";
import type { CallSecurityQuestion, CallSecurityQuestionInput } from "../types/callSecurityQuestions.types";

export function getCallSecurityQuestions() {
  return apiFetch(`/call_security_questions`) as Promise<CallSecurityQuestion[]>;
}

export function getCallSecurityQuestion(id: string) {
  return apiFetch(`/call_security_questions/${id}`) as Promise<CallSecurityQuestion>;
}

export function createCallSecurityQuestion(data: CallSecurityQuestionInput) {
  return apiFetch(`/call_security_questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CallSecurityQuestion>;
}

export function updateCallSecurityQuestion(id: string, data: CallSecurityQuestionInput) {
  return apiFetch(`/call_security_questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CallSecurityQuestion>;
}

export function deleteCallSecurityQuestion(id: string) {
  return apiFetch(`/call_security_questions/${id}`, { method: "DELETE" });
}
