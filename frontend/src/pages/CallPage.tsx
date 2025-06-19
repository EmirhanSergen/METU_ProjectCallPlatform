import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastProvider";
import { getCalls } from "../api/calls";
import { Call } from "../types/global";
import { useAuth } from "../context/AuthProvider";

export default function CallPage() {
  const { show } = useToast();
  const { role } = useAuth();
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCalls()
      .then((data) => {
        setCalls(data);
        show("Call loaded");
      })
      .catch((err) => {
        setError(err.message);
        show("Failed to load call");
      })
      .finally(() => setLoading(false));
  }, [show]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1>Open Call</h1>
      <ul className="list-disc pl-5 space-y-2">
        {calls.map((c) => (
          <li key={c.id} className="flex items-center space-x-4">
            <span>{c.title}</span>
            <Link to={`/call/${c.id}/preview`} className="text-blue-600 underline">
              Preview
            </Link>
            {role === "applicant" && (
              <Link
                to={`/call/${c.id}/apply`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Apply
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
