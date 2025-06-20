import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { useToast } from "../../../context/ToastProvider";
import { useApplication } from "../../../context/ApplicationProvider";

export default function Step1_CallInfo() {
  const { call, createApplication, applicationId, completeStep } = useApplication();
  const { show } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (applicationId) {
      completeStep("step1");
    }
  }, [applicationId, completeStep]);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    try {
      const id = await createApplication();
      if (id) {
        await completeStep("step1");
        show("Application created");
        navigate("../step2");
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
