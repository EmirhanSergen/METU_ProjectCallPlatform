
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../../components/ui/Input";
import { useApplication } from "../../../context/ApplicationProvider";
import { useToast } from "../../../context/ToastProvider";
import {
  applicantInfoSchema,
  type ApplicantInfoForm,
} from "./schemas";



export default function Step2_ApplicantInfo() {
  const { updateApplicationField, application, completeStep, isSubmitted } = useApplication();
  const { show } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicantInfoForm>({
    resolver: zodResolver(applicantInfoSchema),
    defaultValues: {},
  });

  useEffect(() => {
    reset(application as Partial<ApplicantInfoForm>);
  }, [application, reset]);

  const onSubmit = async (data: ApplicantInfoForm) => {
    try {
      for (const [field, value] of Object.entries(data)) {
        await updateApplicationField(field, value);
      }
      await completeStep("step2");
      show("Applicant Info saved");
    } catch (error) {
      show("Failed to save applicant info");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-semibold">Applicant Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input {...register("title") } placeholder="Title" disabled={isSubmitted} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <Input {...register("surname") } placeholder="Surname" disabled={isSubmitted} />
          {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message}</p>}
        </div>
        <div>
          <Input {...register("first_name") } placeholder="First Name" disabled={isSubmitted} />
          {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
        </div>
        <div>
          <Input {...register("year_of_birth") } placeholder="Year of Birth" disabled={isSubmitted} />
          {errors.year_of_birth && <p className="text-red-500 text-sm">{errors.year_of_birth.message}</p>}
        </div>
        <div>
          <Input {...register("nationality") } placeholder="Nationality" disabled={isSubmitted} />
          {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality.message}</p>}
        </div>
        <div>
          <Input {...register("organisation") } placeholder="Organisation" disabled={isSubmitted} />
        </div>
        <div>
          <Input {...register("university") } placeholder="University" disabled={isSubmitted} />
        </div>
        <div>
          <Input {...register("department") } placeholder="Department" disabled={isSubmitted} />
        </div>
        <div>
          <Input {...register("town_or_city") } placeholder="Town or City" disabled={isSubmitted} />
        </div>
        <div>
          <Input {...register("country") } placeholder="Country" disabled={isSubmitted} />
          {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
        </div>
        <div>
          <Input {...register("current_position") } placeholder="Current Position" disabled={isSubmitted} />
        </div>
        <div>
          <Input {...register("gender") } placeholder="Gender" disabled={isSubmitted} />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
}