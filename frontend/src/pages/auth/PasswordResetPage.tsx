import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useToast } from "../context/ToastProvider";
import { requestPasswordReset } from "../api";
import { ApiError } from "../lib/api";

export default function PasswordResetPage() {
  const { show } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await requestPasswordReset(email);
      show(
        "If an account exists for that email, instructions have been sent."
      );
    } catch (err) {
      if (err instanceof ApiError) {
        show(err.message);
      } else {
        show("Failed to send password reset instructions.");
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
          <h1 className="text-2xl font-bold text-center mb-4">
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Enter your email and we'll send you reset instructions.
          </p>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
