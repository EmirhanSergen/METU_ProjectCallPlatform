import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import Table from "../components/ui/Table";
import { getCalls, deleteCall } from "../api/calls";
import { Call } from "../types/global";

export default function CallManagementPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getCalls();
      setCalls(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    setLoading(true);
    setError(null);
    try {
      await deleteCall(id);
      await load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Manage Calls</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      <div>
        <Button onClick={() => navigate("/calls/manage/new")}>Create New Call</Button>
      </div>
      <Table>
        <thead>
          <tr className="bg-gray-100">
            <th>Title</th>
            <th>Actions</th>
            <th>Applications</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td className="space-x-2">
                <Button type="button" onClick={() => navigate(`/calls/manage/${c.id}`)}>
                  Edit
                </Button>
                <Button type="button" onClick={() => remove(c.id)}>
                  Delete
                </Button>
              </td>
              <td>
                <Link to={`/calls/${c.id}/applications`}>
                  <Button variant="link">Applications</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
