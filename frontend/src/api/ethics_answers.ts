import { apiFetch } from "../lib/api";
import type { EthicsAnswerInput, EthicsAnswer } from "../types/ethics_answers";

export function getEthicsAnswers() {
  return apiFetch(`/ethics_answers`) as Promise<EthicsAnswer[]>;
}

export function getEthicsAnswer(id: string) {
  return apiFetch(`/ethics_answers/${id}`) as Promise<EthicsAnswer>;
}

export function createEthicsAnswer(data: EthicsAnswerInput) {
  return apiFetch(`/ethics_answers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<EthicsAnswer>;
}

export function updateEthicsAnswer(id: string, data: EthicsAnswerInput) {
  return apiFetch(`/ethics_answers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<EthicsAnswer>;
}

export function deleteEthicsAnswer(id: string) {
  return apiFetch(`/ethics_answers/${id}`, { method: "DELETE" });
}
