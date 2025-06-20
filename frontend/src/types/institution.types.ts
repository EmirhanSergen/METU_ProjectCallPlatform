export interface InstitutionInput {
  name: string;
  country?: string;
  website?: string;
}

export interface Institution extends InstitutionInput {
  id: string;
}
