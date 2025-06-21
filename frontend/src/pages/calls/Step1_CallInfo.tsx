import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../context/ToastProvider";
import { useApplication } from "../../context/ApplicationProvider";
import {
  createApplication,
  createApplicationForm,
  patchApplication,
} from "../../api";
import type { Application } from "../../types/applications";

export default function Step1_CallInfo() {
  const { call, applicationId } = useApplication();
  const { show } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    // If an application already exists, mark this step as completed on load
    if (applicationId) {
      patchApplication(applicationId, {
        completed_steps: ["step1"],
      }).catch(() => {});
    }
  }, [applicationId]);

  const handleCreate = async () => {
    if (!call?.id) return;
    setLoading(true);
    setError(null);
    try {
      const app: Application = await createApplication({ call_id: call.id });
      setApplication(app);
      await createApplicationForm({ application_id: app.id });
      await patchApplication(app.id, { completed_steps: ["step1"] });
      show("Application created");
      navigate("../step2");
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
