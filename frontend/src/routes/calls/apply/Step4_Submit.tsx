import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { useToast } from "../../../context/ToastProvider";
import { apiFetch } from "../../../lib/api";

export default function Step4_Submit() {
  const { callId } = useParams<{ callId: string }>();
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!callId) return;
    setLoading(true);
    setError(null);
    try {
      await apiFetch("/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ call_id: callId }),
      });
      show("Application submitted");
    } catch (err) {
      setError((err as Error).message);
      show("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Ready to submit your application.</p>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </Button>
      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
}
