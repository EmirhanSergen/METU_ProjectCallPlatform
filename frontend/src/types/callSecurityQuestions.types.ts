export interface CallSecurityQuestionInput {
  call_id?: string;
  category?: string | null;
  question: string;
}

export interface CallSecurityQuestion extends CallSecurityQuestionInput {
  id: string;
}
