import { ChangeEvent, useState } from "react";
import { useToast } from "../../../context/ToastProvider";
import { useApplication } from "../../../context/ApplicationProvider";
import DocumentList from "../../../components/ui/DocumentList";

export default function Step4_DocumentsUpload() {
  const { uploadAttachment, attachments, deleteAttachment } = useApplication();
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          disabled={loading}
          className="block mt-2"
        />
        <DocumentList
          documents={attachments.filter((a) => a.field_name === "passport_or_id")}
          onDelete={deleteAttachment}
        />
      </div>

      <div>
        <label className="font-medium">PhD Certificate</label>
        <input
          type="file"
          accept="application/pdf,image/jpeg,image/jpg"
          onChange={(e) => handleChange(e, "phd_certificate")}
          disabled={loading}
          className="block mt-2"
        />
        <DocumentList
          documents={attachments.filter((a) => a.field_name === "phd_certificate")}
          onDelete={deleteAttachment}
        />
      </div>

      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
}
