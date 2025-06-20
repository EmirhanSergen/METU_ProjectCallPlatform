import { apiFetch } from "../lib/api";
import type { Attachment, AttachmentInput } from "../types/attachments";

export function getAttachments() {
  return apiFetch(`/attachments`) as Promise<Attachment[]>;
}

export function getAttachment(id: string) {
  return apiFetch(`/attachments/${id}`) as Promise<Attachment>;
}

export function getAttachmentsByApplication(applicationId: string) {
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
  return apiFetch(`/attachments/${id}/confirm`, { method: "PATCH" }) as Promise<Attachment>;
}

export function deleteAttachment(id: string) {
  return apiFetch(`/attachments/${id}`, { method: "DELETE" });
}
