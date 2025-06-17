import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCall } from "../lib/api/calls";

export default function CallPreviewPage() {
  const { callId } = useParams<{ callId: string }>();
  const [call, setCall] = useState<any>();

  useEffect(() => {
    if (callId) {
      getCall(callId).then(setCall).catch(() => setCall(undefined));
    }
  }, [callId]);

  if (!call) return <div>Loading...</div>;
  return (
    <div>
      <h1>{call.title}</h1>
      <p>{call.description}</p>
    </div>
  );
}
