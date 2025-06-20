import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import Table from "../../../components/ui/Table";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import { getCalls, deleteCall } from "../../../api";
import { Call, UserRole } from "../../../types/global";
import { useAuth } from "../../../context/AuthProvider";

export default function CallManagementPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const { role } = useAuth();
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
      <h1 className="text-xl font-bold">Manage Call</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      <div>
        <Button onClick={() => navigate("/call/manage/new")}>Create New Call</Button>
      </div>
      <Table>
        <thead>
          <tr className="bg-gray-100">
            <th>Title</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
            <th>Applications</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.status}</td>
              <td>{c.start_date ? c.start_date.substring(0, 10) : "-"}</td>
              <td>{c.end_date ? c.end_date.substring(0, 10) : "-"}</td>
              <td className="space-x-2">
                <Button type="button" onClick={() => navigate(`/call/manage/${c.id}`)}>
                  Edit
                </Button>
                {role === UserRole.super_admin ? (
                  <>
                    <Button type="button" onClick={() => setConfirmId(c.id)}>
                      Delete
                    </Button>
                    <ConfirmModal
                      open={confirmId === c.id}
                      onOpenChange={() => setConfirmId(null)}
                      title="Delete call?"
                      description="This action cannot be undone."
                      onConfirm={() => remove(c.id)}
                    />
                  </>
                ) : (
                  <span
                    className="text-gray-400"
                    title="Only super admins can delete calls"
                  >
                    Delete
                  </span>
                )}
              </td>
              <td>
                <Link to={`/call/${c.id}/applications`}>
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
