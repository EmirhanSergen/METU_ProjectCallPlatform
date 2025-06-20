import { useState } from "react";
import Table from "../ui/Table";

const securityQuestions = [
  "Does your project involve dual-use items or technology?",
  "Will it use or produce security sensitive data?",
  "Could the results be misused for malicious purposes?",
];

export default function SecurityIssuesTable() {
  const [answers, setAnswers] = useState<string[]>(
    Array(securityQuestions.length).fill("")
  );
  const [pages, setPages] = useState<string[]>(
    Array(securityQuestions.length).fill("")
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
      <h3 className="font-medium">Security Issues</h3>
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
          {securityQuestions.map((q, i) => (
            <tr key={i}>
              <td className="text-left">{q}</td>
              <td>
                <input
                  type="radio"
                  name={`security_${i}`}
                  value="yes"
                  checked={answers[i] === "yes"}
                  onChange={() => setAnswer(i, "yes")}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`security_${i}`}
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
