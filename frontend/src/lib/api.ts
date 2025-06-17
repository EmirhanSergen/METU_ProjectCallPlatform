export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const res = await fetch(path, { ...options, headers });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export function getReviewReport(id: string) {
  return apiFetch(`/review_reports/${id}`);
}

export function getApplicationAttachments(applicationId: string) {
  return apiFetch(`/attachments/application/${applicationId}`);
}

export function createReviewReport(data: Record<string, unknown>) {
  return apiFetch(`/review_reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
