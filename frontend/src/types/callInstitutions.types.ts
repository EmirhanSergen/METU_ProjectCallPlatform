export interface CallInstitutionInput {
  call_id?: string;
  institution_id?: string;
  is_default?: boolean;
}

export interface CallInstitution extends CallInstitutionInput {
  id: string;
}
