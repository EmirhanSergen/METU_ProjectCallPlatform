import Button from "../../../components/ui/Button";
import { useToast } from "../../../context/ToastProvider";

export default function Step4_Submit() {
  const { show } = useToast();
  const handleSubmit = () => show("Application submitted");
  return (
    <div>
      <p>Ready to submit your application.</p>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
