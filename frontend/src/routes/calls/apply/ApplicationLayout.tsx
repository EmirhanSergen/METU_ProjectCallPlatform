import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useToast } from "../../../context/ToastProvider";
import { apiFetch } from "../../../lib/api";
import { getCall } from "../../../lib/api/calls";
import Stepper, { Step } from "../../../components/common/Stepper";
import { ApplicationProvider } from "../../../context/ApplicationProvider";


const steps: Step[] = [
  { name: "Call Info", path: "step1" },
  { name: "Upload", path: "step2" },
  { name: "Review", path: "step3" },
  { name: "Submit", path: "step4" },
];

export default function ApplicationLayout() {
  const { callId } = useParams<{ callId: string }>();
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!callId) return;
    setLoading(true);
    setError(null);
    apiFetch(`/calls/${callId}`)
      .then(() => show("Call info loaded"))
      .catch((err) => {
        setError(err.message);
        show("Failed to load call");
      })
      .finally(() => setLoading(false));
  }, [callId, show]);
  const [call, setCall] = useState<any>();

  useEffect(() => {
    if (callId) {
      getCall(callId).then(setCall).catch(() => setCall(undefined));
    }
  }, [callId]);


  if (!callId) return null;

  return (
    <ApplicationProvider callId={callId}>
      <div className="p-4">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        <Stepper steps={steps} />
        <Outlet />
      </div>
    </ApplicationProvider>
  );
}
