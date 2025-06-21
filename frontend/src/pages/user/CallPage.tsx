import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastProvider";
import { useAuth } from "../../context/AuthProvider";
import { getCalls, getMyApplications } from "../../api";
import { ApiError } from "../../lib/api";
import { UserRole } from "../../types/global";
import type { Call } from "../../types/global";

export default function CallPage() {
  const { show } = useToast();
  const { role } = useAuth();
  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasDraft, setHasDraft] = useState(false);

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
        const msg = err instanceof ApiError ? err.message : "Failed to load call";
        setError(err instanceof ApiError ? err.message : msg);
        show(msg);
      })
      .finally(() => setLoading(false));
  }, [show]);

  useEffect(() => {
    if (!call || role !== "applicant") return;
    getMyApplications()
      .then((apps) => {
        const found = apps.find((a) => a.call_id === call.id && a.status !== "SUBMITTED");
        setHasDraft(!!found);
      })
      .catch(() => setHasDraft(false));
  }, [call, role]);

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
          {role === "applicant" && (
            <Link
              to={`/call/${call.id}/apply`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {hasDraft ? "Continue" : "Apply Now"}
            </Link>
          )}

          {(role === UserRole.admin || role === UserRole.super_admin) && (
            <Link
              to={`/call/${call.id}/applications`}
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
