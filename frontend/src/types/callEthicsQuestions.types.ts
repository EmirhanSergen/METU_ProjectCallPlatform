export interface CallEthicsQuestionInput {
  call_id?: string;
  category?: string | null;
  question: string;
}

export interface CallEthicsQuestion extends CallEthicsQuestionInput {
  id: string;
}
