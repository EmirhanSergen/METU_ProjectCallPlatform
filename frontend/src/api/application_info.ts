import { apiFetch } from "../lib/api";
import type { ApplicationInfo, ApplicationInfoInput } from "../types/application_info";

export function createApplicationInfo(data: ApplicationInfoInput) {
  return apiFetch(`/application_infos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<ApplicationInfo>;
}

export function getApplicationInfo(id: string) {
  return apiFetch(`/application_infos/${id}`) as Promise<ApplicationInfo>;
}

export function listApplicationInfos() {
  return apiFetch(`/application_infos`) as Promise<ApplicationInfo[]>;
}

export function updateApplicationInfo(id: string, data: ApplicationInfoInput) {
  return apiFetch(`/application_infos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<ApplicationInfo>;
}

export function deleteApplicationInfo(id: string) {
  return apiFetch(`/application_infos/${id}`, { method: "DELETE" });
}
