import { apiFetch } from "../lib/api";
import type { CallTemplate, CallTemplateInput } from "../types/callTemplates.types";

export function getCallTemplates() {
  return apiFetch(`/call_templates`) as Promise<CallTemplate[]>;
}

export function getCallTemplate(id: string) {
  return apiFetch(`/call_templates/${id}`) as Promise<CallTemplate>;
}

export function createCallTemplate(data: CallTemplateInput) {
  return apiFetch(`/call_templates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CallTemplate>;
}

export function updateCallTemplate(id: string, data: CallTemplateInput) {
  return apiFetch(`/call_templates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CallTemplate>;
}

export function deleteCallTemplate(id: string) {
  return apiFetch(`/call_templates/${id}`, { method: "DELETE" });
}
