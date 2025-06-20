import type { User } from './users';

export type ApplicationStatus = 'DRAFT' | 'SUBMITTED' | 'CLOSED' | 'ARCHIVED';

export interface ApplicationInput {
  call_id?: string | null;
  user_id?: string | null;
  status?: ApplicationStatus;
  completed_steps?: string[] | null;
}

export interface Application extends ApplicationInput {
  id: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ApplicationOut extends Application {
  user: User;
}
