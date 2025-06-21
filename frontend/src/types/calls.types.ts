import type { Call, CallStatus } from './global';

export interface CallInput {
  title: string;
  description?: string | null;
  status?: CallStatus;
  start_date?: string | null;
  end_date?: string | null;
}

export type GetCallsResponse = Call[];
export type GetCallResponse = Call;
