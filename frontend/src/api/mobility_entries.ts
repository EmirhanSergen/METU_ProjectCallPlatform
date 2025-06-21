import { apiFetch } from "../lib/api";
import type { MobilityEntry, MobilityEntryInput } from "../types/mobility_entries";

export function getMobilityEntry(id: string) {
  return apiFetch(`/mobility_entries/${id}`) as Promise<MobilityEntry>;
}

export function listMobilityEntries() {
  return apiFetch(`/mobility_entries`) as Promise<MobilityEntry[]>;
}

export function getMobilityEntriesByApplicationForm(applicationFormId: string) {
  return apiFetch(
    `/mobility_entries/application_form/${applicationFormId}`
  ) as Promise<MobilityEntry[]>;
}

export function getMobilityEntries(applicationFormId: string) {
  return getMobilityEntriesByApplicationForm(applicationFormId);
}

export function createMobilityEntry(
  applicationFormId: string,
  data: MobilityEntryInput
) {
  return apiFetch(`/mobility_entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ application_form_id: applicationFormId, ...data }),
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
