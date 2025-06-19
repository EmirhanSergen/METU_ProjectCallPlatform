import { useState } from "react";
import { Input, Textarea, Checkbox } from "../../../components/ui";
import { useToast } from "../../../context/ToastProvider";
import { useApplication } from "../../../context/ApplicationProvider";

export default function Step3_ApplicationDetails() {
  const { updateApplication } = useApplication();
  const { show } = useToast();

  const [form, setForm] = useState({
    project_title: "",
    acronym: "",
    keywords: "",
    abstract: "",
    selected_supervisor: "",
    has_secondment: false,
    selected_from_db: false,
    institution_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextareaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateApplication(form);
      show("Application details saved");
    } catch (error) {
      show("Failed to save application details");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Application Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="project_title" label="Project Title" value={form.project_title} onChange={handleChange} />
        <Input name="acronym" label="Acronym" value={form.acronym} onChange={handleChange} />
        <Input name="keywords" label="Keywords (semicolon separated)" value={form.keywords} onChange={handleChange} />
        <Input name="selected_supervisor" label="Selected Supervisor" value={form.selected_supervisor} onChange={handleChange} />
      </div>
      <Textarea name="abstract" label="Abstract (max 400 words)" value={form.abstract} onChange={handleChange} />
      <Checkbox name="has_secondment" label="Has Secondment?" checked={form.has_secondment} onChange={handleChange} />
      {form.has_secondment && (
        <>
          <Checkbox
            name="selected_from_db"
            label="Selected from DB"
            checked={form.selected_from_db}
            onChange={handleChange}
          />
          {!form.selected_from_db && (
            <Input
              name="institution_name"
              label="Secondment Institution Name"
              value={form.institution_name}
              onChange={handleChange}
            />
          )}
        </>
      )}
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}
