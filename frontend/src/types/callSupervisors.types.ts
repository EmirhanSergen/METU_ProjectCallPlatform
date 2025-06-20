export interface CallSupervisorInput {
  call_id?: string;
  supervisor_id?: string;
}

export interface CallSupervisor extends CallSupervisorInput {
  id: string;
}
