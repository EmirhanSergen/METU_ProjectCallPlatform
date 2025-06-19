import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import { apiFetch } from "../lib/api";
import { getCalls } from "../lib/api/calls";

export default function DashboardPage() {
  const [stats, setStats] = useState({ calls: 0, applications: 0 });

  useEffect(() => {
    async function load() {
      try {
        const calls = await getCalls();
        const apps = await apiFetch("/applications");
        setStats({ calls: calls.length, applications: apps.length });
      } catch {
        // ignore errors for demo
      }
    }
    load();
  }, []);

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
