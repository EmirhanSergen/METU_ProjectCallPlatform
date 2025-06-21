import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../context/ToastProvider";
import { useApplication } from "../../context/ApplicationProvider";


export default function Step1_CallInfo() {
  const {
    call,
    applicationId,
    createApplication,
    completeStep,
    completedSteps,
  } = useApplication();
  const { show } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If an application already exists, mark this step as completed on load
    if (applicationId && !completedSteps.includes("step1")) {
      completeStep("step1").catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId, completedSteps]);

  const handleCreate = async () => {
    if (!call?.id) return;
    setLoading(true);
    setError(null);
    try {
      await createApplication();
      await completeStep("step1");
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
      {!applicationId && (
        <Button onClick={handleCreate} disabled={loading}>
          {loading ? "Loading..." : "Start Application"}
        </Button>
      )}
      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
}
