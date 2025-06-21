import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import { useToast } from "../context/ToastProvider";
import { useAuth } from "../context/AuthProvider";
import { ApiError } from "../lib/api";
import { UserRole } from "../types/global";

export default function LoginPage() {
  const { show } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      const msg = "Email and password are required";
      setError(msg);
      show(msg);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const user = await login(email, password);
      show("Logged in successfully");
      if (user?.role === UserRole.admin || user?.role === UserRole.super_admin) {
        navigate("/dashboard");
      } else if (user?.role === UserRole.reviewer) {
        navigate("/reviewer");
      } else if (user?.role === UserRole.applicant) {

        navigate("/applications/me");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
        show(err.message);
      } else {
        const msg = "Login failed";
        setError(msg);
        show(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="w-full bg-gray-50 py-16 px-4 min-h-screen">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Welcome Back</h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            <strong>All users (applicant, reviewer, admin)</strong> can log in through this page.
          </p>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              <Link to="/password-reset" className="text-blue-600 hover:underline">
                Forgot your password?
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
