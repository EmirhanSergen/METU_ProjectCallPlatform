
export interface DocumentItem {
  id: string;
  doc_name: string;
}

export default function DocumentList({
  documents,
  onDelete,
}: {
  documents: DocumentItem[];
  onDelete?: (id: string) => void;
}) {
  if (documents.length === 0) {
    return <p>No documents uploaded.</p>;
  }

  return (
    <ul className="space-y-2">
      {documents.map((doc) => (
        <li key={doc.id} className="flex justify-between border p-2 rounded">
          <span>{doc.doc_name}</span>
          {onDelete && (
            <button
              className="text-red-500"
              onClick={() => onDelete(doc.id)}
            >
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
