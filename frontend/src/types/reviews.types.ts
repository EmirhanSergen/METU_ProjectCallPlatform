
export interface Attachment {
  id: string;
  doc_name: string;
  application_id?: string;
  file_path?: string;
  confirmed?: boolean;
  uploaded_at?: string;
}

export interface Review {
  excellence_grade: string;
  impact_grade: string;
  implementation_grade: string;
  additional_comments: string;
}

export interface ReviewReport extends Review {
  id?: string;
  call_id?: string;
  application_id?: string;
  reviewer_id?: string;
  project_number?: string;
  applicant_name?: string;
  project_type?: string;
  project_title?: string;
  excellence_comments?: Record<string, unknown>;
  impact_comments?: Record<string, unknown>;
  implementation_comments?: Record<string, unknown>;
  raises_ethics_issues?: boolean;
  ethics_details?: string;
  total_score?: number;
  total_weighted_score?: number;
  normalized_score?: number;
  created_at?: string;

}
