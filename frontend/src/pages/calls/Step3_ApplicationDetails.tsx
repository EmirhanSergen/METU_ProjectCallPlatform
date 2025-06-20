
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/Input";
import { useToast } from "../../context/ToastProvider";

import { useApplication } from "../../context/ApplicationProvider";

const schema = z.object({
  project_title: z.string().min(1, "Required"),
  acronym: z.string().optional(),
  keywords: z.string().optional(),
  abstract: z.string().optional(),
  selected_supervisor: z.string().optional(),
  has_secondment: z.boolean().optional(),
  selected_from_db: z.boolean().optional(),
  institution_name: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Step3_ApplicationDetails() {
  const { applicationForm, updateApplicationFormField, completeStep, isSubmitted } = useApplication();
  const { show } = useToast();


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    reset(applicationForm as Partial<FormValues>);
  }, [applicationForm, reset]);

  const onSubmit = async () => {
    await completeStep("step3");
    show("Application details saved");
  };

  const reg = (name: keyof FormValues) =>
    register(name, {
      onBlur: (e) => {
        if (isSubmitted) return;
        const value =
          e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
        updateApplicationFormField(name, value);
      },
      onChange: (e) => {
        if (isSubmitted) return;
        if (e.target.type === "checkbox") {
          updateApplicationFormField(name, (e.target as HTMLInputElement).checked);
        }
      },
    });

  const hasSecondment = watch("has_secondment");

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold">Application Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Project Title</label>
          <Input {...reg("project_title")} disabled={isSubmitted}/>
          {errors.project_title && (
            <p className="text-red-500 text-sm">{errors.project_title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm">Acronym</label>
          <Input {...reg("acronym")} disabled={isSubmitted}/>
        </div>
        <div>
          <label className="block text-sm">Keywords (semicolon separated)</label>
          <Input {...reg("keywords")} disabled={isSubmitted}/>
        </div>
        <div>
          <label className="block text-sm">Selected Supervisor</label>
          <Input {...reg("selected_supervisor")} disabled={isSubmitted}/>
        </div>
      </div>
      <div>
        <label className="block text-sm">Abstract (max 400 words)</label>
        <textarea className="input h-24 w-full" disabled={isSubmitted} {...reg("abstract")}></textarea>
      </div>
      <div>
        <label className="inline-flex items-center space-x-2">
          <input type="checkbox" {...reg("has_secondment")} disabled={isSubmitted}/>
          <span>Has Secondment?</span>
        </label>
      </div>
      {hasSecondment && (
        <div className="space-y-2">
          <label className="inline-flex items-center space-x-2">
            <input type="checkbox" {...reg("selected_from_db")} disabled={isSubmitted}/>
            <span>Selected from DB</span>
          </label>
          {!watch("selected_from_db") && (
            <div>
              <label className="block text-sm">Secondment Institution Name</label>
              <Input {...reg("institution_name")} disabled={isSubmitted}/>
            </div>
          )}
        </div>
      )}
      <button type="submit" disabled={isSubmitted} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
    </form>
  );
}
