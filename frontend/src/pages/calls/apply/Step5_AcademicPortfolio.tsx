import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";
import { Button } from "../../../components/ui/Button";
import { useApplication } from "../../../context/ApplicationProvider";
import { useToast } from "../../../context/ToastProvider";

export default function Step5_AcademicPortfolio() {
  const { updateApplicationField, application } = useApplication();
  const { show } = useToast();
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      doctoral_discipline: application.doctoral_discipline || "",
      doctoral_thesis_title: application.doctoral_thesis_title || "",
      doctoral_awarding_institution: application.doctoral_awarding_institution || "",
      doctoral_award_date: application.doctoral_award_date || "",
      current_institution: application.current_institution || "",
      current_department: application.current_department || "",
      current_institution_town: application.current_institution_town || "",
      current_institution_country: application.current_institution_country || "",
      current_phone_number: application.current_phone_number || "",
      reference_list:
        application.reference_list || [
          {
            name_surname: "",
            institution: "",
            department: "",
            country: "",
            position: "",
            phone_number: "",
            email: "",
            reason: "",
          },
        ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "reference_list"
  });

  const onSubmit = async (data: any) => {
    try {
      await updateApplicationField("academic_portfolio", data);
      const steps = new Set<string>(application.completed_steps || []);
      steps.add("step5");
      await updateApplicationField("completed_steps", Array.from(steps));
      show("Academic portfolio saved");
    } catch {
      show("Failed to save portfolio");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-semibold">Academic Portfolio</h2>
      <Input label="Doctoral Discipline" {...register("doctoral_discipline")} />
      <Input label="Doctoral Thesis Title" {...register("doctoral_thesis_title")} />
      <Input label="Awarding Institution" {...register("doctoral_awarding_institution")} />
      <Input label="Doctoral Award Date" type="date" {...register("doctoral_award_date")} />
      <Input label="Current Institution" {...register("current_institution")} />
      <Input label="Department" {...register("current_department")} />
      <Input label="Town/City" {...register("current_institution_town")} />
      <Input label="Country" {...register("current_institution_country")} />
      <Input label="Phone Number" {...register("current_phone_number")} />

      <div className="pt-4">
        <h3 className="font-medium">Suggested References</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded mb-4 space-y-2">
            <Input label="Full Name" {...register(`reference_list.${index}.name_surname`)} />
            <Input label="Institution" {...register(`reference_list.${index}.institution`)} />
            <Input label="Department" {...register(`reference_list.${index}.department`)} />
            <Input label="Country" {...register(`reference_list.${index}.country`)} />
            <Input label="Position" {...register(`reference_list.${index}.position`)} />
            <Input label="Phone Number" {...register(`reference_list.${index}.phone_number`)} />
            <Input label="Email" {...register(`reference_list.${index}.email`)} />
            <Textarea label="Reason for Reference" {...register(`reference_list.${index}.reason`)} />
            <Button type="button" onClick={() => remove(index)} variant="outline">Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({})}>Add Reference</Button>
      </div>

      <Button type="submit">Save and Continue</Button>
    </form>
  );
}
