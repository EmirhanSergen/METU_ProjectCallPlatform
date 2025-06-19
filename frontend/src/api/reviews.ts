import { apiFetch } from "../lib/api";
import type { ReviewReport, SubmitReviewResponse } from "../../types/reviews.types";

export function submitReview(data: ReviewReport) {
  return apiFetch("/review_reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SubmitReviewResponse>;
}

export function getReviewReport(id: string) {
  return apiFetch(`/review_reports/${id}`) as Promise<ReviewReport>;
}

export function getReviewReports() {
  return apiFetch(`/review_reports`) as Promise<ReviewReport[]>;
}

export function createReviewReport(data: ReviewReport) {
  return apiFetch(`/review_reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
