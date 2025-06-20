import { useState } from "react";
import { Link } from "react-router-dom";
import { useApplication } from "../../context/ApplicationProvider";
import { Button } from "../../components/ui/Button";
import ConfirmModal from "../../components/ui/ConfirmModal";

const steps = [
  { name: "Call Info", path: "step1" },
  { name: "Applicant Info", path: "step2" },
  { name: "Application Details", path: "step3" },
  { name: "Documents Upload", path: "step4" },
  { name: "Academic Portfolio", path: "step5" },
  { name: "Mobility", path: "step6" },
  { name: "Proposal & CV", path: "step7" },
  { name: "Ethics & Security", path: "step8" },
  { name: "Review & Submit", path: "step9" },
];

export default function Step9_ReviewSubmit() {
  const {
    applicationId,
    submitApplication,
    completedSteps,
    partialSteps,
    completeStep,
    isSubmitted,
  } = useApplication();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasMissing = steps.some(
    (step) => step.path !== "step9" && !completedSteps.includes(step.path)
  );
  const hasPartial = partialSteps.length > 0;
  const alreadySubmitted = isSubmitted || submitted;

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const success = await submitApplication();
      if (success) {
        setSubmitted(true);
        await completeStep("step9");
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

      <ul className="space-y-1 text-sm">
        {steps.map((step) => {
          const done = completedSteps.includes(step.path);
          const partial = partialSteps.includes(step.path);
          return (
            <li key={step.path} className="flex justify-between">
              {done ? (
                <span>{step.name}</span>
              ) : (
                <Link to={`../${step.path}`} className="text-blue-600 underline">
                  {step.name}
                </Link>
              )}
              <span
                className={
                  done
                    ? "text-green-600"
                    : partial
                    ? "text-yellow-600"
                    : "text-red-600"
                }
              >
                {done ? "Completed" : partial ? "Incomplete" : "Missing"}
              </span>
            </li>
          );
        })}
      </ul>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      {(hasMissing || hasPartial) && (
        <div className="text-red-500 text-sm">
          Please complete all steps before submitting. Sections marked as
          "Missing" or "Incomplete" need to be saved.
        </div>
      )}

      {alreadySubmitted ? (
        <div className="text-green-600 font-medium">Application successfully submitted!</div>
      ) : (
        <>
          <Button
            onClick={() => setOpen(true)}
            disabled={submitting || !applicationId || hasMissing || hasPartial || isSubmitted}
          >
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
