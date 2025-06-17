import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-48 bg-gray-100 p-4 space-y-2">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/calls/manage">Calls</Link>
    </aside>
  );
}
