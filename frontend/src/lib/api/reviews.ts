import { apiFetch } from "../api";
import type { ReviewReport } from "../../types/reviews.types";

export function submitReview(data: ReviewReport) {

  return apiFetch("/review_reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<SubmitReviewResponse>;
}
