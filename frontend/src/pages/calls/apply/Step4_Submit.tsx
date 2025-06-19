
import { useState } from "react";
import { Button } from "../../../ui/Button";
import ConfirmModal from "../../../ui/ConfirmModal";
import { useToast } from "../../../context/ToastProvider";
import { useApplication } from "../../../context/ApplicationProvider";

export default function Step4_Submit() {
  const { submitApplication } = useApplication();
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    const success = await submitApplication();
    if (success) {
      show("Application submitted");
    } else {
      setError("Submission failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <p>Ready to submit your application.</p>
      <Button onClick={() => setOpen(true)} disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </Button>
      <ConfirmModal
        open={open}
        onOpenChange={setOpen}
        title="Submit application?"
        description="You won't be able to edit after submitting."
        onConfirm={handleSubmit}
      />
      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
}
