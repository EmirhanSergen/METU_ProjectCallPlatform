export interface ApplicationFormCreate {
  application_id: string;
  [key: string]: any;
}

export interface ApplicationForm extends ApplicationFormCreate {
  id: string;
}
