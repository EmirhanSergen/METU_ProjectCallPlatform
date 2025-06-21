import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../../../context/ToastProvider";
import { getApplications } from "../../../api";
import { ApiError } from "../../../lib/api";
import type { Application } from "../../../types/applications";

export default function CallApplicationsPage() {
  const { callId } = useParams<{ callId: string }>();
  const { show } = useToast();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!callId) return;
    setLoading(true);
    setError(null);
    getApplications(callId)
      .then((data) => {
        setApps(data);
        if (data.length > 0) {
          show("Applications loaded");
        } else {
          show("No applications found");
        }
      })
      .catch((err) => {
        const msg = err instanceof ApiError ? err.message : "Failed to load applications";
        setError(err instanceof ApiError ? err.message : msg);
        show(msg);
      })
      .finally(() => setLoading(false));
  }, [callId, show]);

  return (
    <section className="w-full bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Applications</h1>

        {loading && <div className="text-center text-gray-600">Loading...</div>}

        {error && (
          <div className="text-red-500 text-center font-medium">{error}</div>
        )}

        {!loading && !error && apps.length === 0 && (
          <div className="text-center text-gray-500">
            There are currently <strong>no applications</strong> submitted for this call.
          </div>
        )}

        {!loading && !error && apps.length > 0 && (
          <ul className="divide-y divide-gray-200">
            {apps.map((a) => (
              <li key={a.id} className="py-2 px-1">
                <span className="font-medium text-gray-800">Application ID:</span>{" "}
                <span className="text-gray-700">{a.id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
