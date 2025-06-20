import { useState, useEffect } from "react";
import { useApplication } from "../../../context/ApplicationProvider";
import { useToast } from "../../../context/ToastProvider";

import { FileInput } from "../../../components/ui";
import DocumentList from "../../../components/ui/DocumentList";
export default function Step7_ProposalCV() {
  const {
    uploadProposal,
    uploadCV,
    attachments,
    deleteAttachment,
    completeStep,
    markPartialStep,
    clearPartialStep,
    isSubmitted,
  } = useApplication();


  const { show } = useToast();
  const [loadingProposal, setLoadingProposal] = useState(false);
  const [loadingCV, setLoadingCV] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proposalUploaded, setProposalUploaded] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);

  useEffect(() => {
    const hasProposal = attachments.some((a) => a.field_name === "proposal");
    const hasCv = attachments.some((a) => a.field_name === "cv");
    setProposalUploaded(hasProposal);
    setCvUploaded(hasCv);
    if (hasProposal && hasCv) {
      clearPartialStep("step7");
    } else if (hasProposal || hasCv) {
      markPartialStep("step7");
    } else {
      clearPartialStep("step7");
    }
  }, [attachments, markPartialStep, clearPartialStep]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "proposal" | "cv") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const setLoading = type === "proposal" ? setLoadingProposal : setLoadingCV;
    const uploadFunc = type === "proposal" ? uploadProposal : uploadCV;

    setLoading(true);
    setError(null);
    try {
      await uploadFunc(file);
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
          disabled={loadingProposal || isSubmitted}
          className="mt-2"
        />
        <DocumentList
          documents={attachments.filter((a) => a.field_name === "proposal")}
          onDelete={isSubmitted ? undefined : deleteAttachment}
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
          disabled={loadingCV || isSubmitted}
          className="mt-2"
        />
        <DocumentList
          documents={attachments.filter((a) => a.field_name === "cv")}
          onDelete={isSubmitted ? undefined : deleteAttachment}
        />
      </div>

      <button
        onClick={async () => {
          if (proposalUploaded && cvUploaded) {
            await completeStep("step7");
            show("Files saved");
          } else {
            markPartialStep("step7");
            show("Please upload both files before completing this step");
          }
        }}
        disabled={isSubmitted}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>

      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
}
