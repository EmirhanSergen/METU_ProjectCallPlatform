import { apiFetch } from "../lib/api";
import type { GetCallsResponse, GetCallResponse, CallInput } from "../types/calls.types";


export function getCalls(status?: string) {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  return apiFetch(`/call${query}`) as Promise<GetCallsResponse>;
}

export function getCall(id: string) {
  return apiFetch(`/call/${id}`) as Promise<GetCallResponse>;
}

export function createCall(data: CallInput) {
  return apiFetch(`/call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function updateCall(id: string, data: CallInput) {
  return apiFetch(`/call/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function deleteCall(id: string) {
  return apiFetch(`/call/${id}`, { method: "DELETE" });
}
