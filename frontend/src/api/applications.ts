import { apiFetch } from "../lib/api";
import type { Application, ApplicationInput, ApplicationOut } from "../types/applications";

export function createApplication(data: ApplicationInput) {
  return apiFetch(`/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<Application>;
}

export function getApplication(id: string) {
  return apiFetch(`/applications/${id}`) as Promise<Application>;
}

export function getApplications(callId?: string) {
  const query = callId ? `?call_id=${callId}` : "";
  return apiFetch(`/applications${query}`) as Promise<Application[]>;
}

export function getMyApplications() {
  return apiFetch(`/applications/me`) as Promise<ApplicationOut[]>;
}

export function updateApplication(id: string, data: ApplicationInput) {
  return apiFetch(`/applications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<Application>;
}

export function patchApplication(id: string, data: Partial<ApplicationInput>) {
  return apiFetch(`/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<Application>;
}

export function deleteApplication(id: string) {
  return apiFetch(`/applications/${id}`, { method: "DELETE" });
}
