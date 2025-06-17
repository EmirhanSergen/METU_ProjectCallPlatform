import type { ReviewReport, Attachment } from "../types/reviews.types";

const API_BASE = "http://localhost:8000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || res.statusText);
  }
  if (res.status === 204) return null;
  return res.json();
}

export function getReviewReport(id: string) {
  return apiFetch(`/review_reports/${id}`) as Promise<ReviewReport>;
}

export function getApplicationAttachments(applicationId: string) {
  return apiFetch(`/attachments/application/${applicationId}`) as Promise<Attachment[]>;
}

export function createReviewReport(data: ReviewReport) {
  return apiFetch(`/review_reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
