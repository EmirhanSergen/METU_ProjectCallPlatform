import { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import { getApplications } from "../../../api";
import { getCalls } from "../../../api";
import { useToast } from "../../../context/ToastProvider";
import { ApiError } from "../../../lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({ calls: 0, applications: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { show } = useToast();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const calls = await getCalls();
        const apps = await getApplications();
        setStats({ calls: calls.length, applications: apps.length });
      } catch (err) {
        const msg = err instanceof ApiError ? err.message : "Failed to load data";
        setError(err instanceof ApiError ? err.message : msg);
        show(msg);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <Card>
        <p>Total Calls: {stats.calls}</p>
        <p>Total Applications: {stats.applications}</p>
      </Card>
    </div>
  );
}
