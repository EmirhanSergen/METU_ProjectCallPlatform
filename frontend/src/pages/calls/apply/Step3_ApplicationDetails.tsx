
import { useState } from "react";
import { Input, Textarea, Checkbox } from "../../../components/ui";
import { useToast } from "../../../context/ToastProvider";

import { useApplication } from "../../../context/ApplicationProvider";

export default function Step3_ApplicationDetails() {
  const { application, updateApplicationField } = useApplication();

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
    updateApplicationField(name, type === "checkbox" ? checked : value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Application Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="project_title" label="Project Title" value={application.project_title || ""} onChange={handleChange} />
        <Input name="acronym" label="Acronym" value={application.acronym || ""} onChange={handleChange} />
        <Input name="keywords" label="Keywords (semicolon separated)" value={application.keywords || ""} onChange={handleChange} />
        <Input name="selected_supervisor" label="Selected Supervisor" value={application.selected_supervisor || ""} onChange={handleChange} />
      </div>
      <Textarea name="abstract" label="Abstract (max 400 words)" value={form.abstract} onChange={handleChange} />
      <Checkbox name="has_secondment" label="Has Secondment?" checked={form.has_secondment} onChange={handleChange} />
      {form.has_secondment && (

        <>
          <Checkbox
            name="selected_from_db"
            label="Selected from DB"
            checked={application.selected_from_db || false}
            onChange={handleChange}
          />
          {!application.selected_from_db && (
            <Input
              name="institution_name"
              label="Secondment Institution Name"
              value={application.institution_name || ""}
              onChange={handleChange}
            />
          )}
        </>
      )}
    </div>
  );
}
