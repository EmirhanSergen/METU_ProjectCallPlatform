
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../../components/ui/Input";
import { useApplication } from "../../../context/ApplicationProvider";
import { useToast } from "../../../context/ToastProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  applicantInfoSchema,
  type ApplicantInfoForm,
} from "./schemas";

const schema = z.object({
  title: z.string().optional(),
  surname: z.string().min(1, "Required"),
  first_name: z.string().min(1, "Required"),
  year_of_birth: z.string().optional(),
  nationality: z.string().optional(),
  organisation: z.string().optional(),
  university: z.string().optional(),
  department: z.string().optional(),
  town_or_city: z.string().optional(),
  country: z.string().optional(),
  current_position: z.string().optional(),
  gender: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Step2_ApplicantInfo() {
  const { updateApplication, markStepCompleted } = useApplication();
  const { show } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicantInfoForm>({
    resolver: zodResolver(applicantInfoSchema),
    defaultValues: {
      title: "",
      surname: "",
      first_name: "",
      year_of_birth: "",
      nationality: "",
      organisation: "",
      university: "",
      department: "",
      town_or_city: "",
      country: "",
      current_position: "",
      gender: "",
    },
  });

  const onSubmit = async (data: ApplicantInfoForm) => {
    try {
      await updateApplication(data);
      markStepCompleted("step2");
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
          <Input {...register("title") } placeholder="Title" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <Input {...register("surname") } placeholder="Surname" />
          {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message}</p>}
        </div>
        <div>
          <Input {...register("first_name") } placeholder="First Name" />
          {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
        </div>
        <div>
          <Input {...register("year_of_birth") } placeholder="Year of Birth" />
          {errors.year_of_birth && <p className="text-red-500 text-sm">{errors.year_of_birth.message}</p>}
        </div>
        <div>
          <Input {...register("nationality") } placeholder="Nationality" />
          {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality.message}</p>}
        </div>
        <div>
          <Input {...register("organisation") } placeholder="Organisation" />
        </div>
        <div>
          <Input {...register("university") } placeholder="University" />
        </div>
        <div>
          <Input {...register("department") } placeholder="Department" />
        </div>
        <div>
          <Input {...register("town_or_city") } placeholder="Town or City" />
        </div>
        <div>
          <Input {...register("country") } placeholder="Country" />
          {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
        </div>
        <div>
          <Input {...register("current_position") } placeholder="Current Position" />
        </div>
        <div>
          <Input {...register("gender") } placeholder="Gender" />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
}