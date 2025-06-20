import { apiFetch } from "../lib/api";
import type { Attachment, AttachmentInput } from "../types/attachments";

export function getAttachment(id: string) {
  return apiFetch(`/attachments/${id}`) as Promise<Attachment>;
}

export function listAttachments() {
  return apiFetch(`/attachments`) as Promise<Attachment[]>;
}

export function getApplicationAttachments(applicationId: string) {
  return apiFetch(`/attachments/application/${applicationId}`) as Promise<Attachment[]>;
}

export function createAttachment(data: AttachmentInput) {
  return apiFetch(`/attachments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<Attachment>;
}

export function updateAttachment(id: string, data: AttachmentInput) {
  return apiFetch(`/attachments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<Attachment>;
}

export function confirmAttachment(id: string) {
  return apiFetch(`/attachments/${id}/confirm`, {
    method: "PATCH",
  }) as Promise<Attachment>;
}

export function deleteAttachment(id: string) {
  return apiFetch(`/attachments/${id}`, { method: "DELETE" });
}

export function uploadAttachment(applicationId: string, file: File, field: string) {
  const formData = new FormData();
  formData.append("upload", file);
  formData.append("field", field);
  return apiFetch(`/applications/${applicationId}/upload_file`, {
    method: "POST",
    body: formData,
  }) as Promise<Attachment>;
}

export function uploadProposal(applicationId: string, file: File) {
  const formData = new FormData();
  formData.append("proposal", file);
  return apiFetch(`/applications/${applicationId}/upload_file`, {
    method: "POST",
    body: formData,
  }) as Promise<Attachment>;
}

export function uploadCV(applicationId: string, file: File) {
  const formData = new FormData();
  formData.append("cv", file);
  return apiFetch(`/applications/${applicationId}/upload_file`, {
    method: "POST",
    body: formData,
  }) as Promise<Attachment>;
}
