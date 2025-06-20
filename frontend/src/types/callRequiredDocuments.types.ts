export interface CallRequiredDocumentInput {
  call_id?: string;
  doc_name: string;
  mime_types?: string | null;
  mandatory?: boolean;
  order_index?: number | null;
}

export interface CallRequiredDocument extends CallRequiredDocumentInput {
  id: string;
}
