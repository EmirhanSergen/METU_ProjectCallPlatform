import { apiFetch } from "../lib/api";
import type { CallSupervisor, CallSupervisorInput } from "../types/callSupervisors.types";

export function getCallSupervisors() {
  return apiFetch(`/call_supervisors`) as Promise<CallSupervisor[]>;
}

export function getCallSupervisor(id: string) {
  return apiFetch(`/call_supervisors/${id}`) as Promise<CallSupervisor>;
}

export function createCallSupervisor(data: CallSupervisorInput) {
  return apiFetch(`/call_supervisors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CallSupervisor>;
}

export function updateCallSupervisor(id: string, data: CallSupervisorInput) {
  return apiFetch(`/call_supervisors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<CallSupervisor>;
}

export function deleteCallSupervisor(id: string) {
  return apiFetch(`/call_supervisors/${id}`, { method: "DELETE" });
}
