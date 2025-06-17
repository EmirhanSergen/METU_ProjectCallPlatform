import { useEffect } from "react";
import { NavLink, Outlet, useParams, useLocation } from "react-router-dom";
import { ApplicationProvider } from "../../../context/ApplicationProvider";

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

  useEffect(() => {
    if (callId) {
      // Placeholder for fetching call information
      // fetchCall(callId)
    }
  }, [callId]);

  const currentStepIndex = steps.findIndex((step) =>
    location.pathname.includes(step.path)
  );

  if (!callId) return null;

  return (
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
