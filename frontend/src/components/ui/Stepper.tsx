import { NavLink, useLocation } from "react-router-dom";

export interface Step {
  name: string;
  path: string;
}

interface StepperProps {
  steps: Step[];
  currentStepIndex?: number;
}

export default function Stepper({ steps, currentStepIndex }: StepperProps) {
  const location = useLocation();
  const activeIndex =
    currentStepIndex ?? steps.findIndex((s) => location.pathname.includes(s.path));

  return (
    <nav className="mb-4 flex space-x-4" aria-label="Progress">
      {steps.map((step, index) => (
        <NavLink
          key={step.path}
          to={step.path}
          className={({ isActive }) =>
            [
              "px-4 py-2 rounded-md",
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
  );
}
