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
