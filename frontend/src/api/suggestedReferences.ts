import { apiFetch } from "../lib/api";
import type { SuggestedReferenceInput, SuggestedReference } from "../types/suggestedReference.types";

export function createSuggestedReference(data: SuggestedReferenceInput) {
  return apiFetch(`/suggested_references`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SuggestedReference>;
}

export function getSuggestedReference(id: string) {
  return apiFetch(`/suggested_references/${id}`) as Promise<SuggestedReference>;
}

export function listSuggestedReferences() {
  return apiFetch(`/suggested_references`) as Promise<SuggestedReference[]>;
}

export function updateSuggestedReference(id: string, data: SuggestedReferenceInput) {
  return apiFetch(`/suggested_references/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SuggestedReference>;
}

export function deleteSuggestedReference(id: string) {
  return apiFetch(`/suggested_references/${id}`, { method: "DELETE" });
}
