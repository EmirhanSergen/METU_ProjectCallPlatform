export interface AcademicReferenceInput {
  application_form_id?: string;
  ref_type?: string;
  title?: string;
  year?: number;
  doi?: string;
}

export interface AcademicReference extends AcademicReferenceInput {
  id: string;
}
