import { apiFetch } from "../api";
import type {
  CreateApplicationRequest,
  CreateApplicationResponse,
  UploadAttachmentResponse,
} from "../../types/applications.types";

export function createApplication(callId: string) {
  const body: CreateApplicationRequest = { call_id: callId };
  return apiFetch("/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }) as Promise<CreateApplicationResponse>;
}

export function uploadAttachment(applicationId: string, file: File) {
  const formData = new FormData();
  formData.append("upload", file);
  return apiFetch(`/applications/${applicationId}/upload_file`, {
    method: "POST",
    body: formData,
  }) as Promise<UploadAttachmentResponse>;
}
