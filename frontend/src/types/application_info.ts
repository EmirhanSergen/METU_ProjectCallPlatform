export interface ApplicationInfoInput {
  application_id?: string | null;
  applicant_name?: string | null;
  project_number?: string | null;
  project_title?: string | null;
}

export interface ApplicationInfo extends ApplicationInfoInput {
  id: string;
}
