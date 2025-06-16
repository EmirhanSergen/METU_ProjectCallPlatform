-- Add composite unique indexes for soft deleted rows
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE users ADD CONSTRAINT uq_users_email_deleted UNIQUE (email, is_deleted);

ALTER TABLE application_forms DROP CONSTRAINT IF EXISTS application_forms_application_id_key;
ALTER TABLE application_forms DROP CONSTRAINT IF EXISTS application_forms_project_number_key;
ALTER TABLE application_forms ADD CONSTRAINT uq_app_form_app_id_deleted UNIQUE (application_id, is_deleted);
ALTER TABLE application_forms ADD CONSTRAINT uq_app_form_project_number_deleted UNIQUE (project_number, is_deleted);

ALTER TABLE application_info DROP CONSTRAINT IF EXISTS application_info_application_id_key;
ALTER TABLE application_info ADD CONSTRAINT uq_app_info_app_id_deleted UNIQUE (application_id, is_deleted);
