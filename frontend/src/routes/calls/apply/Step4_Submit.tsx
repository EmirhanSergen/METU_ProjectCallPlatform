import { useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { useToast } from "../../../context/ToastProvider";
import { createApplication } from "../../../lib/api/applications";

export default function Step4_Submit() {
  const { show } = useToast();
  const { callId } = useParams<{ callId: string }>();
  const handleSubmit = async () => {
    if (!callId) return;
    try {
      await createApplication(callId);
      show("Application submitted");
    } catch {
      show("Submission failed");
    }
  };
  return (
    <div>
      <p>Ready to submit your application.</p>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
