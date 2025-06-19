import DocumentList from "../../../components/DocumentList";
import { useApplication } from "../../../context/ApplicationProvider";

export default function Step3_Review() {
  const { attachments, deleteAttachment } = useApplication();

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Uploaded Documents</h2>
      <DocumentList documents={attachments} onDelete={deleteAttachment} />
    </div>
  );
}
