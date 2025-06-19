import { apiFetch } from "../lib/api";
import type {
  CreateApplicationRequest,
  CreateApplicationResponse,
  UploadAttachmentResponse,
} from "../types/applications.types";
import type { Attachment } from "../types/reviews.types";

export function createApplication(callId: string) {
  const body: CreateApplicationRequest = { call_id: callId };
  return apiFetch("/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as Promise<CreateApplicationResponse>;
}

export function uploadAttachment(applicationId: string, file: File, field: string) {
  const formData = new FormData();
  formData.append("upload", file);
  formData.append("field", field);
  return apiFetch(`/applications/${applicationId}/upload_file`, {
    method: "POST",
    body: formData,
  }) as Promise<UploadAttachmentResponse>;
}

export function getApplications() {
  return apiFetch(`/applications`) as Promise<any[]>;
}

export function getMyApplications() {
  return apiFetch(`/applications/me`) as Promise<any[]>;
}

export function updateApplication(id: string, data: Record<string, unknown>) {
  return apiFetch(`/applications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function getApplicationAttachments(id: string) {
  return apiFetch(`/attachments/application/${id}`) as Promise<Attachment[]>;
}

export function deleteAttachment(id: string) {
  return apiFetch(`/attachments/${id}`, { method: "DELETE" });
}
