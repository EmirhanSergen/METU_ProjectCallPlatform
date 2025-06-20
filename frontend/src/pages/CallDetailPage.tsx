import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToast } from "../context/ToastProvider";
import { getCall } from "../api";
import { Call } from "../types/global";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthProvider";

export default function CallDetailPage() {
  const { callId } = useParams<{ callId: string }>();
  const { show } = useToast();
  const { role } = useAuth();
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

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{call?.title}</h1>
      <p>{call?.description}</p>
      {role === "applicant" && callId && (
        <Link to={`/call/${callId}/apply`}>
          <Button>Apply</Button>
        </Link>
      )}
    </div>
  );
}
