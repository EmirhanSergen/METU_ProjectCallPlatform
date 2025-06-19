import { apiFetch } from "../lib/api";
import type { GetCallsResponse, GetCallResponse } from "../../types/calls.types";

export function getCalls() {
  return apiFetch("/calls") as Promise<GetCallsResponse>;
}

export function getCall(id: string) {
  return apiFetch(`/calls/${id}`) as Promise<GetCallResponse>;
}

export function createCall(data: { title: string; description?: string }) {
  return apiFetch(`/calls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function updateCall(id: string, data: { title: string; description?: string }) {
  return apiFetch(`/calls/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function deleteCall(id: string) {
  return apiFetch(`/calls/${id}`, { method: "DELETE" });
}
