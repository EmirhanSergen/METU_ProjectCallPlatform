
import { ChangeEvent } from "react";
import DocumentList from "../../../components/DocumentList";
import { useApplication } from "../../../context/ApplicationProvider";

export default function Step2_Upload() {
  const { uploadAttachment, attachments, deleteAttachment } = useApplication();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAttachment(file);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleChange} />
      <DocumentList documents={attachments} onDelete={deleteAttachment} />
    </div>
  );
}
