import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { createCall, updateCall, getCall, getCalls } from "../api/calls";
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (form.status === "PUBLISHED") {
      try {
        const published = await getCalls("PUBLISHED");
        if (
          published.length > 0 &&
          (!callId || published[0].id !== callId)
        ) {
          setError("Another call is already published. Choose a different status.");
          setLoading(false);
          return;
        }
      } catch (err) {
        // ignore errors in checking published call
      }
    }
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
      navigate("/call/manage");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {callId ? "Edit Call" : "Create Call"}
        </h1>

        {loading && <div className="text-center text-gray-600">Loading...</div>}
        {error && <div className="text-red-500 text-center mb-4">Error: {error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <Input
              id="title"
              name="title"
              placeholder="Enter call title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter call description"
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.description ?? ""}
              onChange={handleChange}
              rows={4}
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.status}
              onChange={handleChange}
            >
              {(["DRAFT", "PUBLISHED", "CLOSED", "ARCHIVED"] as CallStatus[]).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
              <Input
                type="date"
                name="start_date"
                value={form.start_date || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
              <Input
                type="date"
                name="end_date"
                value={form.end_date || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <Button type="submit" disabled={loading}>
              {callId ? "Update" : "Create"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/call/manage")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
