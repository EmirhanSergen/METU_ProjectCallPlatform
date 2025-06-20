import { apiFetch } from "../lib/api";
import type { EthicalOptionalTableInput, EthicalOptionalTable } from "../types/ethical_optional_tables";

export function getEthicalOptionalTables() {
  return apiFetch(`/ethical_optional_tables`) as Promise<EthicalOptionalTable[]>;
}

export function getEthicalOptionalTable(id: string) {
  return apiFetch(`/ethical_optional_tables/${id}`) as Promise<EthicalOptionalTable>;
}

export function createEthicalOptionalTable(data: EthicalOptionalTableInput) {
  return apiFetch(`/ethical_optional_tables`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<EthicalOptionalTable>;
}

export function updateEthicalOptionalTable(id: string, data: EthicalOptionalTableInput) {
  return apiFetch(`/ethical_optional_tables/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<EthicalOptionalTable>;
}

export function deleteEthicalOptionalTable(id: string) {
  return apiFetch(`/ethical_optional_tables/${id}`, { method: "DELETE" });
}
