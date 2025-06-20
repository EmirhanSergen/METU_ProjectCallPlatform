export interface SuggestedReferenceInput {
  application_form_id?: string;
  name_surname: string;
  institution: string;
  department?: string;
  country?: string;
  position?: string;
  phone_number?: string;
  email?: string;
  reason?: string;
}

export interface SuggestedReference extends SuggestedReferenceInput {
  id: string;
}
