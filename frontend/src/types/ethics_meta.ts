export interface EthicsMetaInput {
  category?: string | null;
  label?: string | null;
}

export interface EthicsMeta extends EthicsMetaInput {
  id: string;
}
