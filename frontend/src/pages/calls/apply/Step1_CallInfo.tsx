import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { useToast } from "../../../context/ToastProvider";
import { useApplication } from "../../../context/ApplicationProvider";

export default function Step1_CallInfo() {
  const { call, createApplication, applicationId, completeStep } = useApplication();
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      const ok = await createApplication();
      if (ok) {
        completeStep("step1");
        show("Application created");
      }
    } catch (err) {
      setError((err as Error).message);
      show("Failed to create application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">{call?.title}</h2>
      <p>{call?.description}</p>
      <Button onClick={handleCreate} disabled={!!applicationId || loading}>
        {loading
          ? "Loading..."
          : applicationId
          ? "Application Created"
          : "Start Application"}
      </Button>
      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
}
