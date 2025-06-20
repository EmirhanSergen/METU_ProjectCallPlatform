import { apiFetch } from "../lib/api";
import type { EthicsIssueInput, EthicsIssue } from "../types/ethics_issues";

export function getEthicsIssues() {
  return apiFetch(`/ethics_issues`) as Promise<EthicsIssue[]>;
}

export function getEthicsIssue(id: string) {
  return apiFetch(`/ethics_issues/${id}`) as Promise<EthicsIssue>;
}

export function createEthicsIssue(data: EthicsIssueInput) {
  return apiFetch(`/ethics_issues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<EthicsIssue>;
}

export function updateEthicsIssue(id: string, data: EthicsIssueInput) {
  return apiFetch(`/ethics_issues/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<EthicsIssue>;
}

export function deleteEthicsIssue(id: string) {
  return apiFetch(`/ethics_issues/${id}`, { method: "DELETE" });
}
