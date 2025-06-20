
import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useToast } from "../context/ToastProvider";
import type { Attachment, ReviewReport, Review } from "../types/reviews.types";
import { getReviewReport, createReviewReport } from "../api";
import { getApplicationAttachments } from "../api";


export default function ReviewPage() {
  const { reviewId } = useParams<{ reviewId: string }>();
  const { show } = useToast();
  const [review, setReview] = useState<ReviewReport | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [form, setForm] = useState<Review>({
    excellence_grade: "",
    impact_grade: "",
    implementation_grade: "",
    additional_comments: "",
  });

  useEffect(() => {
    if (!reviewId) return;
    getReviewReport(reviewId)
      .then(setReview)
      .catch((err) => show(err.message));
  }, [reviewId, show]);

  useEffect(() => {
    if (review?.application_id) {
      getApplicationAttachments(review.application_id)
        .then(setAttachments)
        .catch((err) => show(err.message));
    }
  }, [review, show]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!review) return;
    const data = { ...review, ...form };
    createReviewReport(data)
      .then(() => show("Review submitted"))
      .catch((err: unknown) => {
      if (err instanceof Error) {
        show(err.message);
      } else {
        show("An unexpected error occurred");
      }
    });
  }

  if (!review) return <div>Loading...</div>;

  return (
    <div className="space-y-4 p-4">
      <h1>Review {review.id}</h1>
      <div>
        <h2>Attachments</h2>
        <ul className="list-disc pl-4">
          {attachments.map((a) => (
            <li key={a.id}>
              <a
                href={`/files/${a.id}`}
                className="text-blue-600 underline"
                target="_blank"
                rel="noreferrer"
              >
                {a.doc_name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <div>
          <label>Excellence Grade</label>
          <Input
            name="excellence_grade"
            type="number"
            value={form.excellence_grade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Impact Grade</label>
          <Input
            name="impact_grade"
            type="number"
            value={form.impact_grade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Implementation Grade</label>
          <Input
            name="implementation_grade"
            type="number"
            value={form.implementation_grade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Comments</label>
          <textarea
            name="additional_comments"
            className="border p-2 rounded w-full"
            value={form.additional_comments}
            onChange={handleChange}
          />
        </div>
        <Button onClick={handleSubmit}>Submit Review</Button>
      </div>
    </div>
  );
}
