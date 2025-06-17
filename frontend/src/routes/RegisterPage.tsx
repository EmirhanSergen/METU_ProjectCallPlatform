import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useToast } from "../context/ToastProvider";
import { apiFetch } from "../lib/api";

export default function RegisterPage() {
  const { show } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      await apiFetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      show("Registered successfully");
    } catch (err) {
      setError((err as Error).message);
      show("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2 p-4">
      <h1>Register</h1>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleRegister} disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </Button>
      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
}
