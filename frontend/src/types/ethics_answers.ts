export interface EthicsAnswerInput {
  application_form_id?: string;
  free_text?: string | null;
}

export interface EthicsAnswer extends EthicsAnswerInput {
  id: string;
}
