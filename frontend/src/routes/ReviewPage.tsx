import { useParams } from "react-router-dom";

export default function ReviewPage() {
  const { reviewId } = useParams<{ reviewId: string }>();
  return <div>Review form for {reviewId}</div>;
}
