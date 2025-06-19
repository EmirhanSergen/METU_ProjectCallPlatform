
import { useState } from "react";
import { Attachment } from "../types/application";
import ConfirmModal from "./ui/ConfirmModal";

export default function DocumentList({
  documents,
  onDelete,
}: {
  documents: Attachment[];
  onDelete?: (id: string) => void;
}) {
  const [confirmId, setConfirmId] = useState<string | null>(null);
  if (documents.length === 0) {
    return <p>No documents uploaded.</p>;
  }

  return (
    <ul className="space-y-2">
      {documents.map((doc) => (
        <li key={doc.id} className="flex justify-between border p-2 rounded">
          <span>{doc.doc_name}</span>
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
