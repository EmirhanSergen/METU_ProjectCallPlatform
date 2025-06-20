import { apiFetch } from "../lib/api";
import type { AcademicPortfolioInput, AcademicPortfolio } from "../types/academicPortfolio.types";

export function createAcademicPortfolio(data: AcademicPortfolioInput) {
  return apiFetch(`/academic_portfolios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<AcademicPortfolio>;
}

export function getAcademicPortfolio(id: string) {
  return apiFetch(`/academic_portfolios/${id}`) as Promise<AcademicPortfolio>;
}

export function listAcademicPortfolios() {
  return apiFetch(`/academic_portfolios`) as Promise<AcademicPortfolio[]>;
}

export function updateAcademicPortfolio(id: string, data: AcademicPortfolioInput) {
  return apiFetch(`/academic_portfolios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<AcademicPortfolio>;
}

export function deleteAcademicPortfolio(id: string) {
  return apiFetch(`/academic_portfolios/${id}`, { method: "DELETE" });
}
