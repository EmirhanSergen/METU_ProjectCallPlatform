
import { useState } from "react";
import { Attachment } from "../../types/application";
import ConfirmModal from "./ConfirmModal";
import { apiFetch } from "../../api/api";

export default function DocumentList({
  documents,
  onDelete,
}: {
  documents: Attachment[];
  onDelete?: (id: string) => void;
}) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const handleDownload = async (doc: Attachment) => {
    try {
      const blob = (await apiFetch(`/files/${doc.id}`, { asBlob: true })) as Blob;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.doc_name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };
  if (documents.length === 0) {
    return <p>No documents uploaded.</p>;
  }

  return (
    <ul className="space-y-2">
      {documents.map((doc) => (
        <li key={doc.id} className="flex justify-between border p-2 rounded">
          <button
            onClick={() => handleDownload(doc)}
            className="text-blue-600 underline"
          >
            {doc.field_name ? `${doc.field_name}: ${doc.doc_name}` : doc.doc_name}
          </button>
          {onDelete && (
            <>
              <button
                className="text-red-500"
                onClick={() => setConfirmId(doc.id)}
              >
                Delete
              </button>
              <ConfirmModal
                open={confirmId === doc.id}
                onOpenChange={() => setConfirmId(null)}
                title="Delete document?"
                description="This action cannot be undone."
                onConfirm={() => onDelete(doc.id)}
              />
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
