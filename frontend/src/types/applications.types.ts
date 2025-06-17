export interface CreateApplicationRequest {
  call_id: string;
}

export interface CreateApplicationResponse {
  id: string;
}

export interface UploadAttachmentResponse {
  id: string;
  doc_name: string;
}
