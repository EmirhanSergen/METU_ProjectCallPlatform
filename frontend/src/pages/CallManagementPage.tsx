import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import Table from "../ui/Table";
import { getCalls, createCall, updateCall, deleteCall } from "../api/calls";
import { Call } from "../types/global";

export default function CallManagementPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState<Call | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const reset = () => {
    setTitle("");
    setDescription("");
    setEditing(null);
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = { title, description };
      if (editing) {
        await updateCall(editing.id, data);
      } else {
        await createCall(data);
      }
      reset();
      await load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

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
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">{editing ? "Update" : "Create"}</Button>
        {editing && (
          <Button type="button" onClick={reset}>
            Cancel
          </Button>
        )}
      </form>
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
                <Button type="button" onClick={() => {setEditing(c);setTitle(c.title);setDescription(c.description || "");}}>
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
