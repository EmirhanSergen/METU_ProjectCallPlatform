import Button from "../../../components/ui/Button";
import { useApplication } from "../../../context/ApplicationProvider";

export default function Step1_CallInfo() {
  const { call, createApplication, applicationId } = useApplication();

  const handleCreate = async () => {
    await createApplication();
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">{call?.title}</h2>
      <p>{call?.description}</p>
      <Button onClick={handleCreate} disabled={!!applicationId}>
        {applicationId ? "Application Created" : "Start Application"}
      </Button>
    </div>
  );
}
