import { useState } from "react";

export interface Document {
  id: string;
  name: string;
  url: string;
}

export default function DocumentList({ documents }: { documents: Document[] }) {
  const [index, setIndex] = useState(0);
  const current = documents[index];

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, documents.length - 1));

  if (!current) return <div>No documents.</div>;

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <button onClick={prev} disabled={index === 0} className="px-2 py-1 bg-gray-200 rounded" >Prev</button>
        <button onClick={next} disabled={index === documents.length - 1} className="px-2 py-1 bg-gray-200 rounded" >Next</button>
      </div>
      <iframe title={current.name} src={current.url} className="w-full h-96 border" />
      <div className="text-sm text-center">{index + 1} / {documents.length}</div>
    </div>
  );
}
