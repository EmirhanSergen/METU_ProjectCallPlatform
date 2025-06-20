export interface SecurityMetaInput {
  category?: string | null;
  label?: string | null;
}

export interface SecurityMeta extends SecurityMetaInput {
  id: string;
}
