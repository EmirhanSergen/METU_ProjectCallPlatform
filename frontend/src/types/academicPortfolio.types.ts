export interface AcademicPortfolioInput {
  application_form_id?: string;
  field_name?: string;
  field_value?: string;
}

export interface AcademicPortfolio extends AcademicPortfolioInput {
  id: string;
}
