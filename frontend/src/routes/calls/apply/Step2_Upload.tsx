import { useState } from "react";
import { uploadAttachment } from "../../../lib/api/applications";

export default function Step2_Upload() {
  const [file, setFile] = useState<File | null>(null);
  const applicationId = "00000000-0000-0000-0000-000000000000";

  const handleUpload = async () => {
    if (!file) return;
    try {
      await uploadAttachment(applicationId, file);
    } catch {
      // ignore errors in demo
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button className="px-4 py-2 bg-primary text-white" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}
