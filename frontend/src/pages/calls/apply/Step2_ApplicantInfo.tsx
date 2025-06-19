import { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { useToast } from "../../../context/ToastProvider";
import { useApplication } from "../../../context/ApplicationProvider";

export default function Step2_ApplicantInfo() {
  const { applicationData, updateApplication } = useApplication();
  const { show } = useToast();
  const [form, setForm] = useState({
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateApplication(form);
      show("Applicant Info saved");
    } catch (error) {
      show("Failed to save applicant info");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Applicant Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="title" label="Title" value={form.title} onChange={handleChange} />
        <Input name="surname" label="Surname" value={form.surname} onChange={handleChange} />
        <Input name="first_name" label="First Name" value={form.first_name} onChange={handleChange} />
        <Input name="year_of_birth" label="Year of Birth" value={form.year_of_birth} onChange={handleChange} />
        <Input name="nationality" label="Nationality" value={form.nationality} onChange={handleChange} />
        <Input name="organisation" label="Organisation" value={form.organisation} onChange={handleChange} />
        <Input name="university" label="University" value={form.university} onChange={handleChange} />
        <Input name="department" label="Department" value={form.department} onChange={handleChange} />
        <Input name="town_or_city" label="Town or City" value={form.town_or_city} onChange={handleChange} />
        <Input name="country" label="Country" value={form.country} onChange={handleChange} />
        <Input name="current_position" label="Current Position" value={form.current_position} onChange={handleChange} />
        <Input name="gender" label="Gender" value={form.gender} onChange={handleChange} />
      </div>
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
}