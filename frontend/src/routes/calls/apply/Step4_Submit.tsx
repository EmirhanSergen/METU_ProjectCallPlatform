
import { useState } from "react";
import Button from "../../../components/ui/Button";
import { useToast } from "../../../context/ToastProvider";
import { useApplication } from "../../../context/ApplicationProvider";

export default function Step4_Submit() {
  const { submitApplication } = useApplication();
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await submitApplication();
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
