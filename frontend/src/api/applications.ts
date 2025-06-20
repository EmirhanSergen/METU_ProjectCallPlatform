import { apiFetch } from "./api";
import type {
  CreateApplicationRequest,
  CreateApplicationResponse,
  UploadAttachmentResponse,
  MyApplication,
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

export function uploadProposal(applicationId: string, file: File) {
  return uploadAttachment(applicationId, file, "proposal");
}

export function uploadCV(applicationId: string, file: File) {
  return uploadAttachment(applicationId, file, "cv");
}

export function getApplications() {
  return apiFetch(`/applications`) as Promise<any[]>;
}

export function getApplicationsByCall(callId: string) {
  const query = `?call_id=${encodeURIComponent(callId)}`;
  return apiFetch(`/applications${query}`) as Promise<any[]>;
}

export function getApplication(id: string) {
  return apiFetch(`/applications/${id}`) as Promise<any>;
}

export function getMyApplications() {
  return apiFetch(`/applications/me`) as Promise<MyApplication[]>;
}

export function updateApplication(id: string, data: Record<string, unknown>) {
  return apiFetch(`/applications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function patchApplication(id: string, data: Record<string, unknown>) {
  return apiFetch(`/applications/${id}`, {
    method: "PATCH",
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

export function confirmAttachment(id: string) {
  return apiFetch(`/attachments/${id}/confirm`, { method: "PATCH" });
}
