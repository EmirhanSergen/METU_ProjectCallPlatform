import { useState } from "react";
import { useApplication } from "../../../context/ApplicationProvider";
import { useToast } from "../../../context/ToastProvider";

import { FileInput } from "../../../components/ui";
export default function Step7_ProposalCV() {
  const { uploadProposal, uploadCV, updateApplicationField, application } = useApplication();
  const { show } = useToast();
  const [loadingProposal, setLoadingProposal] = useState(false);
  const [loadingCV, setLoadingCV] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "proposal" | "cv") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const setLoading = type === "proposal" ? setLoadingProposal : setLoadingCV;
    const uploadFunc = type === "proposal" ? uploadProposal : uploadCV;

    setLoading(true);
    setError(null);
    try {
      await uploadFunc(file);
      const steps = new Set<string>(application.completed_steps || []);
      steps.add("step7");
      await updateApplicationField("completed_steps", Array.from(steps));
      show(`${type.toUpperCase()} uploaded successfully.`);
    } catch (err) {
      setError((err as Error).message);
      show(`Failed to upload ${type}`);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Proposal Upload</h2>
        <p>
          Please download the proposal template and upload the completed version as a PDF.
        </p>
        <a
          href="/templates/proposal_template.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Download Proposal Template
        </a>
          <FileInput
            accept="application/pdf"
            onChange={(e) => handleUpload(e, "proposal")}
            disabled={loadingProposal}
            className="mt-2"
          />
      </div>

      <div>
        <h2 className="text-lg font-semibold">CV Upload</h2>
        <p>
          Please download the CV template and upload your CV as a PDF.
        </p>
        <a
          href="/templates/cv_template.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Download CV Template
        </a>
          <FileInput
            accept="application/pdf"
            onChange={(e) => handleUpload(e, "cv")}
            disabled={loadingCV}
            className="mt-2"
          />
      </div>

      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
}
