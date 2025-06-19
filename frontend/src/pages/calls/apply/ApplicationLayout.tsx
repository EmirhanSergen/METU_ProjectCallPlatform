import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { ApplicationProvider, useApplication } from "../../../context/ApplicationProvider";

interface Step {
  name: string;
  path: string;
}

const steps: Step[] = [
  { name: "Call Info", path: "step1" },
  { name: "Applicant Info", path: "step2" },
  { name: "Application Details", path: "step3" },
  { name: "Documents Upload", path: "step4" },
  { name: "Academic Portfolio", path: "step5" },
  { name: "Mobility", path: "step6" },
  { name: "Proposal & CV", path: "step7" },
  { name: "Ethics & Security", path: "step8" },
  { name: "Review & Submit", path: "step9" },
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
      <LayoutContent activeIndex={activeIndex} />
    </ApplicationProvider>
  );
}

function LayoutContent({ activeIndex }: { activeIndex: number }) {
  const { completedSteps } = useApplication();
  const completed = completedSteps;
  return (
    <div className="p-6 md:flex md:space-x-6">
      <nav className="w-full md:w-64 space-y-2 mb-4 md:mb-0" aria-label="Progress">
        {steps.map((step, index) => (
          <NavLink
            key={step.path}
            to={step.path}
            className={({ isActive }) =>
              [
                "block px-4 py-2 rounded-lg font-medium text-sm transition",
                index === activeIndex || isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
              ].join(" ")
            }
          >
            {completed.includes(step.path) ? (
              <span className="text-green-600 mr-1">✓</span>
            ) : (
              <span className="mr-1">{index + 1}.</span>
            )}
            {step.name}
          </NavLink>
        ))}
      </nav>
      <div className="flex-1 bg-white p-4 rounded-lg shadow">
        <Outlet />
      </div>
    </div>
  );
}
