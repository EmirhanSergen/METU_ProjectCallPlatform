import { apiFetch } from "../lib/api";
import type { ReviewReport } from "../types/review_reports";

export function getReviewReport(id: string) {
  return apiFetch(`/review_reports/${id}`) as Promise<ReviewReport>;
}

export function listReviewReports() {
  return apiFetch(`/review_reports`) as Promise<ReviewReport[]>;
}

export function createReviewReport(data: ReviewReport) {
  return apiFetch(`/review_reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<ReviewReport>;
}

export function updateReviewReport(id: string, data: ReviewReport) {
  return apiFetch(`/review_reports/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<ReviewReport>;
}

export function deleteReviewReport(id: string) {
  return apiFetch(`/review_reports/${id}`, { method: "DELETE" });
}
