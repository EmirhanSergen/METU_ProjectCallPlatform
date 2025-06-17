import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useToast } from "../context/ToastProvider";
import { login } from "../lib/api/auth";

export default function LoginPage() {
  const { show } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const { access_token } = await login({ email, password });
      localStorage.setItem("token", access_token);
      show("Logged in");
    } catch {
      show("Login failed");
    }
  };

  return (
    <div className="space-y-2 p-4">
      <h1>Login</h1>
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
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
