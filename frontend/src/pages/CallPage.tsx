import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastProvider";
import { useAuth } from "../context/AuthProvider";
import { getCalls } from "../api/calls";
import type { Call } from "../types/global";

export default function CallPage() {
  const { show } = useToast();
  const { role } = useAuth();
  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCalls("PUBLISHED")
      .then((data) => {
        const openCall = data.find((c) => c.status === "PUBLISHED"); // tek çağrı mantığına uygun
        if (!openCall) throw new Error("No active call available");
        setCall(openCall);
      })
      .catch((err) => {
        setError(err.message);
        show("Failed to load call");
      })
      .finally(() => setLoading(false));
  }, [show]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!call) return <div className="text-center">No open call found.</div>;

  return (
    <section className="w-full bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">{call.title}</h1>

        <div className="text-gray-700 space-y-4">
          <p>{call.description}</p>

          <div className="text-sm text-gray-600">
            <p><strong>Status:</strong> {call.status}</p>
            {call.start_date && <p><strong>Start:</strong> {call.start_date.slice(0, 10)}</p>}
            {call.end_date && <p><strong>End:</strong> {call.end_date.slice(0, 10)}</p>}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            to={`/call/${call.id}/preview`}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Preview
          </Link>

          {role === "applicant" && (
            <Link
              to={`/call/${call.id}/apply`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Apply Now
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
          )}

          {role === "admin" && (
            <Link
              to={`/calls/${call.id}/applications`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              View Applications
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
