import { apiFetch } from "../lib/api";
import type { CallRequiredDocument, CallRequiredDocumentInput } from "../types/callRequiredDocuments.types";

export function getCallRequiredDocuments() {
  return apiFetch(`/call_required_documents`) as Promise<CallRequiredDocument[]>;
}

export function getCallRequiredDocument(id: string) {
  return apiFetch(`/call_required_documents/${id}`) as Promise<CallRequiredDocument>;
}

export function createCallRequiredDocument(data: CallRequiredDocumentInput) {
  return apiFetch(`/call_required_documents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CallRequiredDocument>;
}

export function updateCallRequiredDocument(id: string, data: CallRequiredDocumentInput) {
  return apiFetch(`/call_required_documents/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CallRequiredDocument>;
}

export function deleteCallRequiredDocument(id: string) {
  return apiFetch(`/call_required_documents/${id}`, { method: "DELETE" });
}
