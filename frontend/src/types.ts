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
}
