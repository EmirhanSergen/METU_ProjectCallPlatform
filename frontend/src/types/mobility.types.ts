export interface MobilityEntryInput {
  from_date: string;
  to_date: string;
  organisation?: string;
  country?: string;
}

export interface MobilityEntry extends MobilityEntryInput {
  id: string;
}
