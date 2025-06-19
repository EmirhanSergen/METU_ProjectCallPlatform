
import { ChangeEvent, useState } from "react";
import DocumentList from "../../../components/ui/DocumentList";
import { useToast } from "../../../context/ToastProvider";
import { useApplication } from "../../../context/ApplicationProvider";

export default function Step2_Upload() {
  const { uploadAttachment, attachments, deleteAttachment } = useApplication();
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      await uploadAttachment(file);
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
    <div className="space-y-2">
      <input type="file" onChange={handleChange} disabled={loading} />
      <DocumentList documents={attachments} onDelete={deleteAttachment} />
      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
}
