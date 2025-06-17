import { apiFetch } from "../api";
import type { GetCallsResponse, GetCallResponse } from "../../types/calls.types";

export function getCalls() {
  return apiFetch("/calls") as Promise<GetCallsResponse>;
}

export function getCall(id: string) {
  return apiFetch(`/calls/${id}`) as Promise<GetCallResponse>;
}
