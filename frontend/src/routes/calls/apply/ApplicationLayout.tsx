import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams, useLocation } from "react-router-dom";
import { useToast } from "../../../context/ToastProvider";
import { apiFetch } from "../../../lib/api";


interface Step {
  name: string;
  path: string;
}

const steps: Step[] = [
  { name: "Call Info", path: "step1" },
  { name: "Upload", path: "step2" },
  { name: "Review", path: "step3" },
  { name: "Submit", path: "step4" },
];

export default function ApplicationLayout() {
  const { callId } = useParams<{ callId: string }>();
  const location = useLocation();
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

  const currentStepIndex = steps.findIndex((step) =>
    location.pathname.includes(step.path)
  );

  if (!callId) return null;

  return (
    <div className="p-4">
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      <nav className="mb-4 flex space-x-4" aria-label="Progress">
        {steps.map((step, index) => (
          <NavLink
            key={step.path}
            to={step.path}
            className={({ isActive }) =>
              [
                "px-4 py-2 rounded-md",
                index === currentStepIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              ].join(" ")
            }
          >
            {step.name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
    <ApplicationProvider callId={callId}>
      <div className="p-4">
        <nav className="mb-4 flex space-x-4" aria-label="Progress">
          {steps.map((step, index) => (
            <NavLink
              key={step.path}
              to={step.path}
              className={({ isActive }) =>
                [
                  "px-4 py-2 rounded-md",
                  index === currentStepIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                ].join(" ")
              }
            >
              {step.name}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </div>
    </ApplicationProvider>
  );
}
