import { Outlet, useParams } from "react-router-dom";
import Stepper, { Step } from "../ui/Stepper";
import { ApplicationProvider } from "../../context/ApplicationProvider";


const steps: Step[] = [
  { name: "Call Info", path: "step1" },
  { name: "Upload", path: "step2" },
  { name: "Review", path: "step3" },
  { name: "Submit", path: "step4" },
];

export default function ApplicationLayout() {
  const { callId } = useParams<{ callId: string }>();

  if (!callId) return null;

  return (
    <ApplicationProvider callId={callId}>
      <div className="p-4">
        <Stepper steps={steps} />
        <Outlet />
      </div>
    </ApplicationProvider>
  );
}
