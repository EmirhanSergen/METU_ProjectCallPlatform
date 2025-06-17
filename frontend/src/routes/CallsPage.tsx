import { useEffect, useState } from "react";
import { getCalls } from "../lib/api/calls";

export default function CallsPage() {
  const [calls, setCalls] = useState<any[]>([]);

  useEffect(() => {
    getCalls()
      .then(setCalls)
      .catch(() => setCalls([]));
  }, []);

  return (
    <div>
      <h1>Open Calls</h1>
      <ul>
        {calls.map((c) => (
          <li key={c.id}>{c.title}</li>
        ))}
      </ul>
    </div>
  );
}
