import { apiFetch } from "../lib/api";
import type { CallEthicsQuestion, CallEthicsQuestionInput } from "../types/callEthicsQuestions.types";

export function getCallEthicsQuestions() {
  return apiFetch(`/call_ethics_questions`) as Promise<CallEthicsQuestion[]>;
}

export function getCallEthicsQuestion(id: string) {
  return apiFetch(`/call_ethics_questions/${id}`) as Promise<CallEthicsQuestion>;
}

export function createCallEthicsQuestion(data: CallEthicsQuestionInput) {
  return apiFetch(`/call_ethics_questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CallEthicsQuestion>;
}

export function updateCallEthicsQuestion(id: string, data: CallEthicsQuestionInput) {
  return apiFetch(`/call_ethics_questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CallEthicsQuestion>;
}

export function deleteCallEthicsQuestion(id: string) {
  return apiFetch(`/call_ethics_questions/${id}`, { method: "DELETE" });
}
