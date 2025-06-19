import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { UserRole } from "../types/global";

interface UserItem {
  email: string;
  role: UserRole;
}

export default function AdminUserManagementPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.applicant);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create user", { email, role });
    setUsers((prev) => [...prev, { email, role }]);
    setEmail("");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
              Role
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((u, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2 whitespace-nowrap">{u.email}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.role}</td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td className="px-4 py-2" colSpan={2}>
                No users yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
