import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastProvider";
import { submitReview } from "../lib/api/reviews";

export default function ReviewPage() {
  const { reviewId } = useParams<{ reviewId: string }>();
  const { show } = useToast();
  const [score, setScore] = useState(0);

  const handleSubmit = async () => {
    if (!reviewId) return;
    try {
      await submitReview({ application_id: reviewId, total_score: score });
      show("Review submitted");
    } catch {
      show("Failed to submit");
    }
  };

  return (
    <div className="space-y-2 p-4">
      <h1>Review form for {reviewId}</h1>
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        className="border p-2 rounded"
      />
      <Button onClick={handleSubmit}>Submit Review</Button>
    </div>
  );
}
