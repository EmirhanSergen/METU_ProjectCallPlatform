export enum UserRole {
  applicant = 'applicant',
  reviewer = 'reviewer',
  admin = 'admin',
  super_admin = 'super_admin',
}

export interface Call {
  id: string;
  title?: string;
  description?: string | null;
  status?: CallStatus;
  start_date?: string | null;
  end_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export type CallStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'ARCHIVED';
