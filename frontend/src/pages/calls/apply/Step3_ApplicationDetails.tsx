
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/Input";
import { useToast } from "../../../context/ToastProvider";

import { useApplication } from "../../../context/ApplicationProvider";

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
  const { application, updateApplicationField, markStepCompleted } = useApplication();
  const { show } = useToast();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      project_title: application.project_title || "",
      acronym: application.acronym || "",
      keywords: application.keywords || "",
      abstract: application.abstract || "",
      selected_supervisor: application.selected_supervisor || "",
      has_secondment: application.has_secondment || false,
      selected_from_db: application.selected_from_db || false,
      institution_name: application.institution_name || "",
    },
  });

  const onSubmit = () => {
    markStepCompleted("step3");
    show("Application details saved");
  };

  const reg = (name: keyof FormValues) =>
    register(name, {
      onBlur: (e) => {
        const value =
          e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
        updateApplicationField(name, value);
      },
      onChange: (e) => {
        const value =
          e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
        updateApplicationField(name, value);
      },
    });

  const hasSecondment = watch("has_secondment");

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold">Application Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Project Title</label>
          <Input {...reg("project_title")}/>
          {errors.project_title && (
            <p className="text-red-500 text-sm">{errors.project_title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm">Acronym</label>
          <Input {...reg("acronym")}/>
        </div>
        <div>
          <label className="block text-sm">Keywords (semicolon separated)</label>
          <Input {...reg("keywords")}/>
        </div>
        <div>
          <label className="block text-sm">Selected Supervisor</label>
          <Input {...reg("selected_supervisor")}/>
        </div>
      </div>
      <div>
        <label className="block text-sm">Abstract (max 400 words)</label>
        <textarea className="input h-24 w-full" {...reg("abstract")}></textarea>
      </div>
      <div>
        <label className="inline-flex items-center space-x-2">
          <input type="checkbox" {...reg("has_secondment")}/>
          <span>Has Secondment?</span>
        </label>
      </div>
      {hasSecondment && (
        <div className="space-y-2">
          <label className="inline-flex items-center space-x-2">
            <input type="checkbox" {...reg("selected_from_db")}/>
            <span>Selected from DB</span>
          </label>
          {!watch("selected_from_db") && (
            <div>
              <label className="block text-sm">Secondment Institution Name</label>
              <Input {...reg("institution_name")}/>
            </div>
          )}
        </div>
      )}
      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
    </form>
  );
}
