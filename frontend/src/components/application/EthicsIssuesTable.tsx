import { useState } from "react";
import Table from "../ui/Table";

const ethicsQuestions = [
  "Does your research involve human participants?",
  "Does it involve the collection or processing of personal data?",
  "Does it involve the use of animals?",
  "Could your work cause environmental or health and safety concerns?",
];

export default function EthicsIssuesTable() {
  const [answers, setAnswers] = useState<string[]>(
    Array(ethicsQuestions.length).fill("")
  );
  const [pages, setPages] = useState<string[]>(
    Array(ethicsQuestions.length).fill("")
  );

  const setAnswer = (index: number, value: string) => {
    const copy = [...answers];
    copy[index] = value;
    setAnswers(copy);
  };

  const setPage = (index: number, value: string) => {
    const copy = [...pages];
    copy[index] = value;
    setPages(copy);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Ethics Issues</h3>
      <Table className="table-auto">
        <thead>
          <tr>
            <th className="text-left">Question</th>
            <th className="text-left">Yes</th>
            <th className="text-left">No</th>
            <th className="text-left">Page</th>
          </tr>
        </thead>
        <tbody>
          {ethicsQuestions.map((q, i) => (
            <tr key={i}>
              <td className="text-left">{q}</td>
              <td>
                <input
                  type="radio"
                  name={`ethics_${i}`}
                  value="yes"
                  checked={answers[i] === "yes"}
                  onChange={() => setAnswer(i, "yes")}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`ethics_${i}`}
                  value="no"
                  checked={answers[i] === "no"}
                  onChange={() => setAnswer(i, "no")}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="input w-20"
                  disabled={answers[i] !== "yes"}
                  value={pages[i]}
                  onChange={(e) => setPage(i, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
