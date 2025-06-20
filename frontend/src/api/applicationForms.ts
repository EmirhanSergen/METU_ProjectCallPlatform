import { apiFetch } from "../lib/api";
import type {
  ApplicationForm,
  ApplicationFormInput,
} from "../types/application_forms";

export function createApplicationForm(data: ApplicationFormInput) {
  return apiFetch("/application_forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<ApplicationForm>;
}

export function getApplicationForm(id: string) {
  return apiFetch(`/application_forms/${id}`) as Promise<ApplicationForm>;
}

export function getApplicationForms() {
  return apiFetch(`/application_forms`) as Promise<ApplicationForm[]>;
}

export function updateApplicationForm(id: string, data: ApplicationFormInput) {
  return apiFetch(`/application_forms/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<ApplicationForm>;
}

export function deleteApplicationForm(id: string) {
  return apiFetch(`/application_forms/${id}`, { method: "DELETE" });
}
