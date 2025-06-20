import { apiFetch } from "../lib/api";
import type {
  ApplicationForm,
  ApplicationFormCreate,
} from "../types/applicationForm.types";

export function createApplicationForm(data: ApplicationFormCreate) {
  return apiFetch("/application_forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<ApplicationForm>;
}

export function getApplicationForm(id: string) {
  return apiFetch(`/application_forms/${id}`) as Promise<ApplicationForm>;
}

export function updateApplicationForm(id: string, data: ApplicationFormCreate) {
  return apiFetch(`/application_forms/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<ApplicationForm>;
}
