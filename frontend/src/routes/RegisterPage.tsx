import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useToast } from "../context/ToastProvider";

export default function RegisterPage() {
  const { show } = useToast();
  const handleRegister = () => show("Registered");

  return (
    <div className="space-y-2 p-4">
      <h1>Register</h1>
      <Input placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
}
