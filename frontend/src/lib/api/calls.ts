import { apiFetch } from "../api";

export function getCalls() {
  return apiFetch("/calls");
}

export function getCall(id: string) {
  return apiFetch(`/calls/${id}`);
}
