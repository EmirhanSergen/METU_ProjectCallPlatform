import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentList, { Document } from "../components/documents/DocumentList";
import { apiFetch } from "../lib/api";

export default function CallPreviewPage() {
  const { callId } = useParams<{ callId: string }>();
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    async function load() {
      const apps = await apiFetch("/applications");
      const appIds = apps.filter((a: any) => a.call_id === callId).map((a: any) => a.id);
      const attachments = await apiFetch("/attachments");
      const docs = attachments
        .filter((a: any) => appIds.includes(a.application_id))
        .map((a: any) => ({ id: a.id, name: a.doc_name || "document", url: `/files/${a.id}` }));
      setDocuments(docs);
    }
    load();
  }, [callId]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Call Documents</h1>
      <DocumentList documents={documents} />
    </div>
  );
}
