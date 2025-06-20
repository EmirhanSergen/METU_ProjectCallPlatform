export interface ReviewReportBase {
  call_id?: string | null;
  application_id?: string | null;
  reviewer_id?: string | null;
  project_number?: string | null;
  applicant_name?: string | null;
  project_type?: string | null;
  project_title?: string | null;
  excellence_grade?: number | null;
  impact_grade?: number | null;
  implementation_grade?: number | null;
  excellence_comments?: Record<string, unknown> | null;
  impact_comments?: Record<string, unknown> | null;
  implementation_comments?: Record<string, unknown> | null;
  raises_ethics_issues?: boolean | null;
  ethics_details?: string | null;
  total_score?: number | null;
  total_weighted_score?: number | null;
  normalized_score?: number | null;
  additional_comments?: string | null;
}

export interface ReviewReportCreate extends ReviewReportBase {}

export interface ReviewReport extends ReviewReportBase {
  id: string;
  created_at?: string | null;
}

export interface SubmitReviewResponse {
  id: string;
}
