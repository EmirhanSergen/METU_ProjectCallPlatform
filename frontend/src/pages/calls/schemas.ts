import { z } from 'zod';

export const applicantInfoSchema = z.object({
  title: z.string().min(1, 'Required'),
  surname: z.string().min(1, 'Required'),
  first_name: z.string().min(1, 'Required'),
  year_of_birth: z.coerce
    .number()
    .int()
    .min(1900, 'Invalid year')
    .max(new Date().getFullYear(), 'Invalid year')
    .optional(),
  nationality: z.string().min(1, 'Required'),
  organisation: z.string().optional(),
  university: z.string().optional(),
  department: z.string().optional(),
  town_or_city: z.string().optional(),
  country: z.string().min(1, 'Required'),
  current_position: z.string().optional(),
  gender: z.string().optional(),
});

export type ApplicantInfoForm = z.infer<typeof applicantInfoSchema>;

export const applicationDetailsSchema = z.object({
  project_title: z.string().min(1, 'Required'),
  acronym: z.string().optional(),
  keywords: z.string().optional(),
  abstract: z.string().min(1, 'Required'),
  selected_supervisor: z.string().optional(),
  has_secondment: z.boolean().optional(),
  selected_from_db: z.boolean().optional(),
  institution_name: z.string().optional(),
});

export type ApplicationDetailsForm = z.infer<typeof applicationDetailsSchema>;
