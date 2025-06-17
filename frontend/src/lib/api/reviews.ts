import { apiFetch } from "../api";
import type { SubmitReviewData, SubmitReviewResponse } from "../../types/reviews.types";

export function submitReview(data: SubmitReviewData) {
  return apiFetch("/review_reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SubmitReviewResponse>;
}
