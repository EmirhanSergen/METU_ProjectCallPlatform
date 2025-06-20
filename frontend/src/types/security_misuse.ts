export interface SecurityMisuseInput {
  application_form_id?: string;
  question_text?: string | null;
  answer?: string | null;
  page_reference?: string | null;
}

export interface SecurityMisuse extends SecurityMisuseInput {
  id: string;
}
