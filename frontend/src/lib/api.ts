const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch(path: string, options: RequestInit & { asBlob?: boolean } = {}) {
  const token = localStorage.getItem("token");
  const headers = new Headers(options.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    let message = res.statusText;
    try {
      const data = await res.clone().json();
      const detail = (data as any).detail;
      message = typeof detail === "string" ? detail : JSON.stringify(detail || (data as any).message || message);
    } catch {
      const text = await res.text().catch(() => null);
      if (text) message = text;
    }
    throw new ApiError(res.status, message);
  }
  if (res.status === 204) return null;
  if (options.asBlob) return res.blob();
  return res.json();
}
