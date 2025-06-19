import { Input } from "../../../components/ui/Input";
import { useApplication } from "../../../context/ApplicationProvider";

export default function Step2_ApplicantInfo() {
  const { application, updateApplicationField } = useApplication();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateApplicationField(name, value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Applicant Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="title" label="Title" value={application.title || ""} onChange={handleChange} />
        <Input name="surname" label="Surname" value={application.surname || ""} onChange={handleChange} />
        <Input name="first_name" label="First Name" value={application.first_name || ""} onChange={handleChange} />
        <Input name="year_of_birth" label="Year of Birth" value={application.year_of_birth || ""} onChange={handleChange} />
        <Input name="nationality" label="Nationality" value={application.nationality || ""} onChange={handleChange} />
        <Input name="organisation" label="Organisation" value={application.organisation || ""} onChange={handleChange} />
        <Input name="university" label="University" value={application.university || ""} onChange={handleChange} />
        <Input name="department" label="Department" value={application.department || ""} onChange={handleChange} />
        <Input name="town_or_city" label="Town or City" value={application.town_or_city || ""} onChange={handleChange} />
        <Input name="country" label="Country" value={application.country || ""} onChange={handleChange} />
        <Input name="current_position" label="Current Position" value={application.current_position || ""} onChange={handleChange} />
        <Input name="gender" label="Gender" value={application.gender || ""} onChange={handleChange} />
      </div>
    </div>
  );
}