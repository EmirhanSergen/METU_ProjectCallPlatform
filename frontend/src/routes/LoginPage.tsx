import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useToast } from "../context/ToastProvider";
import { apiFetch } from "../lib/api";
import { login } from "../lib/api/auth";


export default function LoginPage() {
  const { show } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("token", data.access_token);
      show("Logged in successfully");
    } catch (err) {
      setError((err as Error).message);
      show("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2 p-4">
      <h1>Login</h1>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </Button>
      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
}
