import { Outlet, useParams } from "react-router-dom";
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
  const location = useLocation();

  if (!callId) return null;

  const activeIndex = steps.findIndex((s) =>
    location.pathname.includes(s.path)
  );

  return (
    <ApplicationProvider callId={callId}>
      <div className="p-4 flex space-x-4">
        <nav className="w-48 space-y-2" aria-label="Progress">
          {steps.map((step, index) => (
            <NavLink
              key={step.path}
              to={step.path}
              className={({ isActive }) =>
                [
                  "block px-4 py-2 rounded-md",
                  index === activeIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                ].join(" ")
              }
            >
              {step.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </ApplicationProvider>
  );
}
