import { useEffect, useState } from "react";
import { useToast } from "../context/ToastProvider";
import { apiFetch } from "../lib/api";


interface Call {
  id: string;
  title: string;
}

export default function CallsPage() {
  const { show } = useToast();
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiFetch("/calls")
      .then((data) => {
        setCalls(data);
        show("Calls loaded");
      })
      .catch((err) => {
        setError(err.message);
        show("Failed to load calls");
      })
      .finally(() => setLoading(false));
  }, [show]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1>Open Calls</h1>
      <ul className="list-disc pl-5">
        {calls.map((c) => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
    </div>
  );
}
