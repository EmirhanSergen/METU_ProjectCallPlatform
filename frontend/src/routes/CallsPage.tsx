import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../components/ui/Table";
import { getCalls } from "../lib/api";

interface Call {
  id: string;
  title: string;
  status: string;
}

export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    getCalls()
      .then(setCalls)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <Table>
      <thead>
        <tr>
          <th align="left">Title</th>
          <th align="left">Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {calls.map((call) => (
          <tr key={call.id} className="odd:bg-gray-50">
            <td>{call.title}</td>
            <td>{call.status}</td>
            <td>
              <Link to={`/calls/${call.id}/apply`} className="text-blue-600">
                Apply
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
