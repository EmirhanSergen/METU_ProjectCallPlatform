import type { ApplicationStatus } from './global';

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

export interface ApplicationInput {
  call_id?: string | null;
  user_id?: string | null;
  status?: ApplicationStatus;
  completed_steps?: string[] | null;
}

export interface Application extends ApplicationInput {
  id: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface MyApplication {
  id: string;
  call_id: string;
  status?: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}
