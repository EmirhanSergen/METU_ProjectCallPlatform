import { apiFetch } from "../api";

export function createApplication(callId: string) {
  return apiFetch("/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ call_id: callId }),
  });
}

export function uploadAttachment(applicationId: string, file: File) {
  const formData = new FormData();
  formData.append("upload", file);
  return apiFetch(`/applications/${applicationId}/upload_file`, {
    method: "POST",
    body: formData,
  });
}
