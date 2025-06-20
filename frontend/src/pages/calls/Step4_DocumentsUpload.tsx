import { ChangeEvent, useState, useEffect } from "react";
import { useToast } from "../../context/ToastProvider";
import { useApplication } from "../../context/ApplicationProvider";
import DocumentList from "../../components/ui/DocumentList";

import { FileInput } from "../../components/ui";
export default function Step4_DocumentsUpload() {
  const {
    uploadAttachment,
    attachments,
    deleteAttachment,
    completeStep,
    markPartialStep,
    clearPartialStep,
    isSubmitted,
  } = useApplication();
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passportUploaded, setPassportUploaded] = useState(false);
  const [phdCertificateUploaded, setPhdCertificateUploaded] = useState(false);

  const handleSave = async () => {
    if (passportUploaded && phdCertificateUploaded) {
      await completeStep("step4");
      show("Documents saved");
    } else {
      markPartialStep("step4");
      show("Please upload both documents before completing this step");
    }
  };

  useEffect(() => {
    const hasPassport = attachments.some((a) => a.field_name === "passport_or_id");
    const hasPhd = attachments.some((a) => a.field_name === "phd_certificate");
    setPassportUploaded(hasPassport);
    setPhdCertificateUploaded(hasPhd);
    if (hasPassport && hasPhd) {
      clearPartialStep("step4");
    } else if (hasPassport || hasPhd) {
      markPartialStep("step4");
    } else {
      clearPartialStep("step4");
    }
  }, [attachments, markPartialStep, clearPartialStep]);

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      await uploadAttachment(file, field);
      show("File uploaded");
    } catch (err) {
      setError((err as Error).message);
      show("Upload failed");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="font-medium">Passport or ID</label>
        <input
          type="file"
          accept="application/pdf,image/jpeg,image/jpg"
          onChange={(e) => handleChange(e, "passport_or_id")}
          disabled={loading || isSubmitted}
          className="block mt-2"
        />
        <DocumentList
          documents={attachments.filter((a) => a.field_name === "passport_or_id")}
          onDelete={isSubmitted ? undefined : deleteAttachment}
        />
      </div>

      <div>
        <label className="font-medium">PhD Certificate</label>
        <input
          type="file"
          accept="application/pdf,image/jpeg,image/jpg"
          onChange={(e) => handleChange(e, "phd_certificate")}
          disabled={loading || isSubmitted}
          className="block mt-2"
        />
        <DocumentList
          documents={attachments.filter((a) => a.field_name === "phd_certificate")}
          onDelete={isSubmitted ? undefined : deleteAttachment}
        />
      </div>

      {error && <div className="text-red-500">Error: {error}</div>}
      <button
        onClick={handleSave}
        disabled={isSubmitted}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
