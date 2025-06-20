export interface SecurityOtherInput {
  application_form_id?: string;
  question_text?: string | null;
  answer?: string | null;
  details?: string | null;
}

export interface SecurityOther extends SecurityOtherInput {
  id: string;
}
