import { useEffect, useState } from "react";
import { getMyApplications } from "../api/applications";
import { useToast } from "../context/ToastProvider";

interface Application {
  id: string;
  status?: string;
  call_id?: string;
}

export default function MyApplicationsPage() {
  const { show } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMyApplications()
      .then((data) => {
        setApplications(data);
        show("Applications loaded");
      })
      .catch((err) => {
        setError(err.message);
        show("Failed to load applications");
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
            <th className="px-4 py-3 text-left">Application ID</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white text-gray-800">
          {applications.map((app) => (
            <tr key={app.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
              <td className="px-4 py-2 font-mono">{app.id}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
