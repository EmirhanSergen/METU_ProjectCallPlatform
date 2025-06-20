export interface SecurityAnswerInput {
  application_form_id?: string;
  free_text?: string | null;
}

export interface SecurityAnswer extends SecurityAnswerInput {
  id: string;
}
