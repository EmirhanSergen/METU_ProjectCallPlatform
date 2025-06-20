export interface CreateApplicationRequest {
  call_id: string;
}

export interface CreateApplicationResponse {
  id: string;
  application_form_id?: string;
}

export interface UploadAttachmentResponse {
  id: string;
  doc_name: string;
  field_name?: string;
}

export interface MyApplication {
  id: string;
  status?: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}
