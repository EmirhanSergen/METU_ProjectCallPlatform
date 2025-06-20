import { apiFetch } from "../lib/api";
import type { SupervisorInput, Supervisor } from "../types/supervisor.types";

export function createSupervisor(data: SupervisorInput) {
  return apiFetch(`/supervisors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<Supervisor>;
}

export function getSupervisor(id: string) {
  return apiFetch(`/supervisors/${id}`) as Promise<Supervisor>;
}

export function listSupervisors() {
  return apiFetch(`/supervisors`) as Promise<Supervisor[]>;
}

export function updateSupervisor(id: string, data: SupervisorInput) {
  return apiFetch(`/supervisors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<Supervisor>;
}

export function deleteSupervisor(id: string) {
  return apiFetch(`/supervisors/${id}`, { method: "DELETE" });
}
