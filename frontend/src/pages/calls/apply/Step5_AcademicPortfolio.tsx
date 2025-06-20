import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";
import { Button } from "../../../components/ui/Button";
import { useApplication } from "../../../context/ApplicationProvider";
import { useToast } from "../../../context/ToastProvider";

export default function Step5_AcademicPortfolio() {
  const { updateApplicationField, application, completeStep } = useApplication();
  const { show } = useToast();
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    reset(application as any);
  }, [application, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "reference_list"
  });

  const onSubmit = async (data: any) => {
    try {
      await updateApplicationField("academic_portfolio", data);
      await completeStep("step5");
      show("Academic portfolio saved");
    } catch {
      show("Failed to save portfolio");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-lg font-semibold">Academic Portfolio</h2>
      <div>
        <label className="block text-sm">Doctoral Discipline</label>
        <Input {...register("doctoral_discipline")} />
      </div>
      <div>
        <label className="block text-sm">Doctoral Thesis Title</label>
        <Input {...register("doctoral_thesis_title")} />
      </div>
      <div>
        <label className="block text-sm">Awarding Institution</label>
        <Input {...register("doctoral_awarding_institution")} />
      </div>
      <div>
        <label className="block text-sm">Doctoral Award Date</label>
        <Input type="date" {...register("doctoral_award_date")} />
      </div>
      <div>
        <label className="block text-sm">Current Institution</label>
        <Input {...register("current_institution")} />
      </div>
      <div>
        <label className="block text-sm">Department</label>
        <Input {...register("current_department")} />
      </div>
      <div>
        <label className="block text-sm">Town/City</label>
        <Input {...register("current_institution_town")} />
      </div>
      <div>
        <label className="block text-sm">Country</label>
        <Input {...register("current_institution_country")} />
      </div>
      <div>
        <label className="block text-sm">Phone Number</label>
        <Input {...register("current_phone_number")} />
      </div>

      <div className="pt-4">
        <h3 className="font-medium">Suggested References</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded mb-4 space-y-2">
            <div>
              <label className="block text-sm">Full Name</label>
              <Input {...register(`reference_list.${index}.name_surname`)} />
            </div>
            <div>
              <label className="block text-sm">Institution</label>
              <Input {...register(`reference_list.${index}.institution`)} />
            </div>
            <div>
              <label className="block text-sm">Department</label>
              <Input {...register(`reference_list.${index}.department`)} />
            </div>
            <div>
              <label className="block text-sm">Country</label>
              <Input {...register(`reference_list.${index}.country`)} />
            </div>
            <div>
              <label className="block text-sm">Position</label>
              <Input {...register(`reference_list.${index}.position`)} />
            </div>
            <div>
              <label className="block text-sm">Phone Number</label>
              <Input {...register(`reference_list.${index}.phone_number`)} />
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <Input {...register(`reference_list.${index}.email`)} />
            </div>
            <div>
              <label className="block text-sm">Reason for Reference</label>
              <Textarea {...register(`reference_list.${index}.reason`)} />
            </div>
            <Button type="button" onClick={() => remove(index)} variant="outline">Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({})}>Add Reference</Button>
      </div>

      <Button type="submit">Save and Continue</Button>
    </form>
  );
}
