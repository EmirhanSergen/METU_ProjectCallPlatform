import { apiFetch } from "../api";

export function submitReview(data: any) {
  return apiFetch("/review_reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
