export interface SupervisorInput {
  institution_id?: string;
  name_surname: string;
  email?: string;
  phone?: string;
  department?: string;
}

export interface Supervisor extends SupervisorInput {
  id: string;
}
