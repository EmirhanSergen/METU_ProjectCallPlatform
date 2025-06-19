import { useEffect, useState } from "react";
import { useToast } from "../context/ToastProvider";
import { getApplications } from "../api/applications";

interface Application {
  id: string;
}

export default function CallApplicationsPage() {
  const { show } = useToast();
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getApplications()
      .then((data) => {
        setApps(data);
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
      <h1>Applications</h1>
      <ul className="list-disc pl-5">
        {apps.map((a) => (
          <li key={a.id}>{a.id}</li>
        ))}
      </ul>
    </div>
  );
}
