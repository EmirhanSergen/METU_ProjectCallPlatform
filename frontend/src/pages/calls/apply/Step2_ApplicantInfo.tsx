import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/Input";
import { useToast } from "../../../context/ToastProvider";
import { useApplication } from "../../../context/ApplicationProvider";

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
  const { application, updateApplicationField } = useApplication();
  const { show } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: application.title || "",
      surname: application.surname || "",
      first_name: application.first_name || "",
      year_of_birth: application.year_of_birth || "",
      nationality: application.nationality || "",
      organisation: application.organisation || "",
      university: application.university || "",
      department: application.department || "",
      town_or_city: application.town_or_city || "",
      country: application.country || "",
      current_position: application.current_position || "",
      gender: application.gender || "",
    },
  });

  const onSubmit = () => {
    show("Applicant Info saved");
  };

  const reg = (name: keyof FormValues) =>
    register(name, {
      onBlur: (e) => updateApplicationField(name, e.target.value),
      onChange: (e) => updateApplicationField(name, e.target.value),
    });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-semibold">Applicant Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Title</label>
          <Input {...reg("title")}/>
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm">Surname</label>
          <Input {...reg("surname")}/>
          {errors.surname && <p className="text-red-500 text-sm">{errors.surname.message}</p>}
        </div>
        <div>
          <label className="block text-sm">First Name</label>
          <Input {...reg("first_name")}/>
          {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
        </div>
        <div>
          <label className="block text-sm">Year of Birth</label>
          <Input {...reg("year_of_birth")}/>
        </div>
        <div>
          <label className="block text-sm">Nationality</label>
          <Input {...reg("nationality")}/>
        </div>
        <div>
          <label className="block text-sm">Organisation</label>
          <Input {...reg("organisation")}/>
        </div>
        <div>
          <label className="block text-sm">University</label>
          <Input {...reg("university")}/>
        </div>
        <div>
          <label className="block text-sm">Department</label>
          <Input {...reg("department")}/>
        </div>
        <div>
          <label className="block text-sm">Town or City</label>
          <Input {...reg("town_or_city")}/>
        </div>
        <div>
          <label className="block text-sm">Country</label>
          <Input {...reg("country")}/>
        </div>
        <div>
          <label className="block text-sm">Current Position</label>
          <Input {...reg("current_position")}/>
        </div>
        <div>
          <label className="block text-sm">Gender</label>
          <Input {...reg("gender")}/>
        </div>
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
    </form>
  );
}