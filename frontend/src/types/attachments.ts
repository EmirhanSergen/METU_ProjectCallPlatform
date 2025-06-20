export interface AttachmentInput {
  application_id?: string | null;
  doc_name?: string | null;
  field_name?: string | null;
  file_path?: string | null;
  confirmed?: boolean | null;
}

export interface Attachment extends AttachmentInput {
  id: string;
  uploaded_at?: string | null;
}
