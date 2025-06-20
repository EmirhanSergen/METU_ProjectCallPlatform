// Utility fetch wrapper for API requests

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function apiFetch(
  path: string,
  options: RequestInit & { asBlob?: boolean } = {}
) {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    let message = res.statusText;
    try {
      const data = await res.clone().json();
      const detail = data.detail;
      if (detail && typeof detail !== "string") {
        message = JSON.stringify(detail);
      } else {
        message = detail || data.message || message;
      }
    } catch {
      try {
        const text = await res.text();
        if (text) message = text;
      } catch {}
    }
    throw new Error(message);
  }
  if (res.status === 204) return null;
  if (options.asBlob) {
    return res.blob();
  }
  return res.json();
}

