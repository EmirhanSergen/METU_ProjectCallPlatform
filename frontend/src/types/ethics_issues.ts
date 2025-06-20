export interface EthicsIssueInput {
  application_form_id?: string;
  meta_id?: string;
  question_text: string;
  answer?: string | null;
  page_reference?: string | null;
}

export interface EthicsIssue extends EthicsIssueInput {
  id: string;
}
