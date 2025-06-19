import { useEffect, useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { getUser, updateUser } from "../api/users";
import { useAuth } from "../context/AuthProvider";
import { useToast } from "../context/ToastProvider";

export default function SettingsPage() {
  const { userId } = useAuth();
  const { show } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [institution, setInstitution] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!userId) return;
    getUser(userId)
      .then((u) => {
        setFirstName(u.first_name);
        setLastName(u.last_name);
      })
      .catch(() => {});
  }, [userId]);

  const handleSubmit = async () => {
    if (!userId) return;
    try {
      await updateUser(userId, {
        first_name: firstName,
        last_name: lastName,
        password: password || undefined,
      });
      show("Settings updated");
      setPassword("");
    } catch (err) {
      show((err as Error).message);
    }
  };

  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Account Settings</h1>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
              Institution (optional)
            </label>
            <Input
              id="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </div>
    </section>
  );
}
