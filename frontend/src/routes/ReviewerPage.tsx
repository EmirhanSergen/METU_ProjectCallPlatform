import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastProvider";
import { getReviewReports } from "../lib/api/reviews";
import type { ReviewReport } from "../types/reviews.types";

export default function ReviewerPage() {
  const { show } = useToast();
  const [reviews, setReviews] = useState<ReviewReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getReviewReports()
      .then((data) => {
        setReviews(data);
        show("Reviews loaded");
      })
      .catch((err) => {
        setError(err.message);
        show("Failed to load reviews");
      })
      .finally(() => setLoading(false));
  }, [show]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1>My Reviews</h1>
      <ul className="list-disc pl-5 space-y-2">
        {reviews.map((r) => (
          <li key={r.id} className="flex items-center space-x-4">
            <span>{r.project_title || r.id}</span>
            <Link to={`/review/${r.id}`} className="text-blue-600 underline">
              Review
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
