import { FormEvent, useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Table from "../components/ui/Table";
import { apiFetch } from "../lib/api";

interface Call {
  id: string;
  title: string;
  description?: string;
}

export default function CallManagementPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState<Call | null>(null);

  async function load() {
    const data = await apiFetch("/calls");
    setCalls(data);
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
    const body = JSON.stringify({ title, description });
    const headers = { "Content-Type": "application/json" };
    if (editing) {
      await apiFetch(`/calls/${editing.id}`, { method: "PUT", headers, body });
    } else {
      await apiFetch("/calls", { method: "POST", headers, body });
    }
    reset();
    load();
  }

  async function remove(id: string) {
    await apiFetch(`/calls/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Manage Calls</h1>
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
            <th></th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
