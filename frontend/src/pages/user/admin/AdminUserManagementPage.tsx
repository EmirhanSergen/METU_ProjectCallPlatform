import { useEffect, useState } from "react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { UserRole } from "../../../types/global";
import { createUser, listUsers } from "../../../api";
import { useToast } from "../../../context/ToastProvider";

interface UserItem {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  organization?: string | null;
  role: UserRole;
}

export default function AdminUserManagementPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.applicant);
  const { show } = useToast();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await listUsers();
        setUsers(data);
      } catch (err) {
        show((err as Error).message);
      }
    }
    fetchUsers();
  }, [show]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = await createUser({
        email,
        first_name: firstName,
        last_name: lastName,
        organization: organization || undefined,
        password,
        role,
      });
      setUsers((prev) => [...prev, newUser]);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setOrganization("");
      show("User created");
    } catch (err) {
      show((err as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">User Management</h1>
      <form onSubmit={handleAdd} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
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
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <Input
            id="firstName"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <Input
            id="lastName"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Temporary password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          <Input
            id="organization"
            placeholder="Organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={UserRole.applicant}>applicant</option>
            <option value={UserRole.reviewer}>reviewer</option>
            <option value={UserRole.admin}>admin</option>
          </select>
        </div>
        <Button type="submit">Add User</Button>
      </form>
      <table className="min-w-full border divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Organization
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((u) => (
            <tr key={u.id}>
              <td className="px-4 py-2 whitespace-nowrap">{u.email}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.first_name} {u.last_name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.organization || '-'}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.role}</td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td className="px-4 py-2" colSpan={4}>
                No users yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
