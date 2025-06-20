export interface MobilityEntryInput {
  application_form_id?: string | null;
  from_date: string;
  to_date: string;
  organisation?: string | null;
  country?: string | null;
}

export interface MobilityEntry extends MobilityEntryInput {
  id: string;
}
