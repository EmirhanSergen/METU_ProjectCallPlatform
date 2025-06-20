import { apiFetch } from "./api";
import type { MobilityEntryInput, MobilityEntry } from "../types/mobility.types";

export function getMobilityEntries(applicationFormId: string) {
  return apiFetch(`/mobility_entries/application_form/${applicationFormId}`) as Promise<MobilityEntry[]>;
}

export function createMobilityEntry(applicationFormId: string, data: MobilityEntryInput) {
  return apiFetch(`/mobility_entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, application_form_id: applicationFormId }),
  }) as Promise<MobilityEntry>;
}

export function updateMobilityEntry(id: string, data: MobilityEntryInput) {
  return apiFetch(`/mobility_entries/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<MobilityEntry>;
}

export function deleteMobilityEntry(id: string) {
  return apiFetch(`/mobility_entries/${id}`, { method: "DELETE" });
}
