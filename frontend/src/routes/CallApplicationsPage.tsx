import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Table from "../components/ui/Table";
import { apiFetch } from "../lib/api";
import { useToast } from "../context/ToastProvider";

interface Application {
  id: string;
  call_id: string;
}

export default function CallApplicationsPage() {
  const { callId } = useParams<{ callId: string }>();
  const [applications, setApplications] = useState<Application[]>([]);
  const [reviewers, setReviewers] = useState<Record<string, string>>({});
  const { show } = useToast();

  async function load() {
    const data = await apiFetch("/applications");
    setApplications(data.filter((a: Application) => a.call_id === callId));
  }

  useEffect(() => {
    load();
  }, [callId]);

  async function assign(appId: string) {
    const reviewerId = reviewers[appId];
    if (!reviewerId) return;
    await apiFetch("/review_reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        call_id: callId,
        application_id: appId,
        reviewer_id: reviewerId,
      }),
    });
    show("Reviewer assigned");
    setReviewers((r) => ({ ...r, [appId]: "" }));
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Applications</h1>
      <Table>
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Reviewer</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>
                <Input
                  value={reviewers[app.id] || ""}
                  onChange={(e) =>
                    setReviewers({ ...reviewers, [app.id]: e.target.value })
                  }
                />
              </td>
              <td>
                <Button type="button" onClick={() => assign(app.id)}>
                  Assign
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
