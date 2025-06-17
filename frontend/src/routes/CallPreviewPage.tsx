import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../context/ToastProvider";
import { getCall } from "../lib/api/calls";
import { Call } from "../types";

export default function CallPreviewPage() {
  const { callId } = useParams<{ callId: string }>();
  const { show } = useToast();
  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!callId) return;
    setLoading(true);
    setError(null);
    getCall(callId)
      .then((data) => {
        setCall(data);
        show("Call loaded");
      })
      .catch((err) => {
        setError(err.message);
        show("Failed to load call");
      })
      .finally(() => setLoading(false));
  }, [callId, show]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return <div>{call ? call.title : "No call"}</div>;
}
