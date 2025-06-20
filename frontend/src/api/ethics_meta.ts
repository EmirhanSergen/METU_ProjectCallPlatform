import { apiFetch } from "../lib/api";
import type { EthicsMetaInput, EthicsMeta } from "../types/ethics_meta";

export function getEthicsMetas() {
  return apiFetch(`/ethics_metas`) as Promise<EthicsMeta[]>;
}

export function getEthicsMeta(id: string) {
  return apiFetch(`/ethics_metas/${id}`) as Promise<EthicsMeta>;
}

export function createEthicsMeta(data: EthicsMetaInput) {
  return apiFetch(`/ethics_metas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<EthicsMeta>;
}

export function updateEthicsMeta(id: string, data: EthicsMetaInput) {
  return apiFetch(`/ethics_metas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<EthicsMeta>;
}

export function deleteEthicsMeta(id: string) {
  return apiFetch(`/ethics_metas/${id}`, { method: "DELETE" });
}
