import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyApplications } from "../api";
import { getCall } from "../api";
import { ApiError } from "../../../lib/api";
import { useToast } from "../context/ToastProvider";

interface Application {
  id: string;
  call_id: string;
  status?: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export default function MyApplicationsPage() {
  const { show } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [callTitles, setCallTitles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMyApplications()
      .then(async (data) => {
        setApplications(data);
        const ids = Array.from(new Set(data.map((a) => a.call_id)));
        const titles: Record<string, string> = {};
        await Promise.all(
          ids.map(async (id) => {
            try {
              const call = await getCall(id);
              titles[id] = call.title ?? id;
            } catch {
              titles[id] = id;
            }
          })
        );
        setCallTitles(titles);
        show("Applications loaded");
      })
      .catch((err) => {
        if (err instanceof ApiError) {
          setError(err.message);
          show(err.message);
        } else {
          setError("Failed to load applications");
          show("Failed to load applications");
        }
      })
      .finally(() => setLoading(false));
  }, [show]);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Loading your applications...</div>
    );

  if (error)
    return (
      <div className="text-red-600 font-medium py-4 text-center">
        Failed to load applications: {error}
      </div>
    );

  if (applications.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No applications found</h2>
        <p className="text-gray-500">
          You haven’t submitted any applications yet. Browse the open call to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Applications</h1>
      <table className="w-full border border-gray-200 shadow-sm rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
          <tr>
            <th className="px-4 py-3 text-left">Application Title</th>
            <th className="px-4 py-3 text-left">Applicant</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Submission Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-800">
          {applications.map((app) => (
            <tr key={app.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
              <td className="px-4 py-2">{callTitles[app.call_id] || app.call_id}</td>
              <td className="px-4 py-2">{app.first_name} {app.last_name}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    app.status === "SUBMITTED"
                      ? "bg-green-100 text-green-800"
                      : app.status === "DRAFT"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {app.status || "Unknown"}
                </span>
              </td>
              <td className="px-4 py-2">{new Date(app.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <Link to={`/call/${app.call_id}/apply`} className="text-blue-600 hover:underline">
                  {app.status === "DRAFT" ? "Continue" : "View"}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
