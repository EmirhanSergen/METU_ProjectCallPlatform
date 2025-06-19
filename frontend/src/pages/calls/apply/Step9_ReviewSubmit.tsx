import { useState } from "react";
import { useApplication } from "../../../context/ApplicationProvider";
import { Button } from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";

export default function Step9_ReviewSubmit() {
  const { applicationId, submitApplication, completeStep } = useApplication();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const success = await submitApplication();
      if (success) {
        setSubmitted(true);
        completeStep("step9");
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
      setOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Final Review & Submit</h2>
      <p className="text-sm text-gray-700">
        Please ensure all required fields and uploads are complete. Once you submit, you won’t be able to edit your application.
      </p>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {submitted ? (
        <div className="text-green-600 font-medium">Application successfully submitted!</div>
      ) : (
        <>
          <Button onClick={() => setOpen(true)} disabled={submitting || !applicationId}>
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
          <ConfirmModal
            open={open}
            onOpenChange={setOpen}
            title="Submit Application"
            description="Are you sure you want to submit? You won't be able to make changes after submission."
            onConfirm={handleSubmit}
          />
        </>
      )}
    </div>
  );
}
