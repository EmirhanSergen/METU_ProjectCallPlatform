import { useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { useToast } from "../../../context/ToastProvider";
import { useApplication } from "../../../context/ApplicationProvider";
import { useNavigate } from "react-router-dom";

export default function Step4_Submit() {
  const { submitApplication } = useApplication();
  const { show } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await submitApplication();
    show("Application submitted");
    navigate("/");
  };
  return (
    <div>
      <p>Ready to submit your application.</p>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
