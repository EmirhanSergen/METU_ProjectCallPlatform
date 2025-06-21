import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import { useToast } from "../context/ToastProvider";
import { useAuth } from "../context/AuthProvider";
import { ApiError } from "../api/api";

export default function RegisterPage() {
  const { show } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register(email, password);
      show("Registration successful! Check your email.");
      navigate("/login");
    } catch (err) {
      if (err instanceof ApiError) {
        show(err.message);
      } else {
        show("Registration failed. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="w-full bg-gray-50 py-16 px-4 min-h-screen">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Create Your Account</h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Only <strong>applicant</strong> role registrations are allowed through this page.
          </p>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
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

            <Button type="submit" className="w-full">
              Register
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
