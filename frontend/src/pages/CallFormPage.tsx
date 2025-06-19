import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { createCall, updateCall, getCall } from "../api/calls";
import { CallStatus, Call } from "../types/global";
import type { CallInput } from "../types/calls.types";
import { useToast } from "../context/ToastProvider";

export default function CallFormPage() {
  const { callId } = useParams<{ callId: string }>();
  const navigate = useNavigate();
  const { show } = useToast();

  const [form, setForm] = useState<CallInput>({
    title: "",
    description: "",
    status: "DRAFT",
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!callId) return;
    setLoading(true);
    setError(null);
    getCall(callId)
      .then((data: Call) => {
        setForm({
          title: data.title ?? "",
          description: data.description ?? "",
          status: data.status ?? "DRAFT",
          start_date: data.start_date ? data.start_date.substring(0, 10) : "",
          end_date: data.end_date ? data.end_date.substring(0, 10) : "",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [callId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payload: CallInput = {
      ...form,
      start_date: form.start_date || undefined,
      end_date: form.end_date || undefined,
    };
    try {
      if (callId) {
        await updateCall(callId, payload);
        show("Call updated");
      } else {
        await createCall(payload);
        show("Call created");
      }
      navigate("/calls/manage");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{callId ? "Edit Call" : "Create Call"}</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border rounded p-2"
          value={form.description ?? ""}
          onChange={handleChange}
        />
        <select
          name="status"
          className="w-full border rounded p-2"
          value={form.status}
          onChange={handleChange}
        >
          {(["DRAFT", "PUBLISHED", "CLOSED", "ARCHIVED"] as CallStatus[]).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className="flex space-x-2">
          <Input
            type="date"
            name="start_date"
            value={form.start_date || ""}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="end_date"
            value={form.end_date || ""}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">{callId ? "Update" : "Create"}</Button>
        <Button type="button" variant="outline" onClick={() => navigate("/calls/manage")}>Cancel</Button>
      </form>
    </div>
  );
}
