export interface ApplicationFormInput {
  application_id?: string | null;
  applicant_name?: string | null;
  project_number?: string | null;
  project_title?: string | null;
  title?: string | null;
  surname?: string | null;
  first_name?: string | null;
  year_of_birth?: number | null;
  nationality?: string | null;
  organisation?: string | null;
  university?: string | null;
  department?: string | null;
  town_or_city?: string | null;
  country?: string | null;
  current_position?: string | null;
  gender?: string | null;
  passport_or_id_path?: string | null;
  phd_certificate_path?: string | null;
  acronym?: string | null;
  keywords?: string | null;
  abstract?: string | null;
  selected_supervisor?: string | null;
  has_secondment?: boolean | null;
  selected_from_db?: boolean | null;
  institution_name?: string | null;
  loc_document_path?: string | null;
  doctoral_discipline?: string | null;
  doctoral_thesis_title?: string | null;
  doctoral_awarding_institution?: string | null;
  doctoral_award_date?: string | null;
  current_institution?: string | null;
  current_department?: string | null;
  current_institution_town?: string | null;
  current_institution_country?: string | null;
  current_phone_number?: string | null;
  agreed?: boolean | null;
  uploaded_proposal_path?: string | null;
  uploaded_cv_path?: string | null;
  ethics_confirmed?: boolean | null;
  ethical_dimension_description?: string | null;
  compliance_text?: string | null;
  security_self_assessment_text?: string | null;
}

export interface ApplicationForm extends ApplicationFormInput {
  id: string;
  created_at?: string | null;
  updated_at?: string | null;
}
