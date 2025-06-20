export interface CallTemplateInput {
  call_id?: string;
  name?: string | null;
  file_path?: string | null;
}

export interface CallTemplate extends CallTemplateInput {
  id: string;
}
