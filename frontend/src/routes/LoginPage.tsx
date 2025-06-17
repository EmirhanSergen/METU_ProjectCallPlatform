import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useToast } from "../context/ToastProvider";

export default function LoginPage() {
  const { show } = useToast();
  const handleLogin = () => show("Logged in");

  return (
    <div className="space-y-2 p-4">
      <h1>Login</h1>
      <Input placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
