import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
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
    apiFetch("/applications/me")
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1>My Applications</h1>
      <table className="min-w-full border divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((app) => (
            <tr key={app.id}>
              <td className="px-4 py-2 whitespace-nowrap">{app.id}</td>
              <td className="px-4 py-2 whitespace-nowrap">{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
