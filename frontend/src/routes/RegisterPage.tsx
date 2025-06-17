import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useToast } from "../context/ToastProvider";
import { register } from "../lib/api/auth";

export default function RegisterPage() {
  const { show } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async () => {
    try {
      await register({ email, password });
      show("Registered");
    } catch {
      show("Registration failed");
    }
  };

  return (
    <div className="space-y-2 p-4">
      <h1>Register</h1>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
}
