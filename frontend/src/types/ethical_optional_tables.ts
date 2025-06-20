export interface EthicalOptionalTableInput {
  application_form_id?: string;
  rows?: number | null;
  columns?: number | null;
  content?: Record<string, unknown> | null;
}

export interface EthicalOptionalTable extends EthicalOptionalTableInput {
  id: string;
}
