import { useEffect, useState } from "react";
import Table from "../ui/Table";
import { useApplication } from "../../context/ApplicationProvider";
import { useToast } from "../../context/ToastProvider";
import {
  createSecurityAnswer,
  updateSecurityAnswer,
  listSecurityAnswers,
} from "../../api/security_answers";
import type { SecurityAnswer, SecurityAnswerInput } from "../../types/security_answers";

const securityQuestions = [
  "Does your project involve dual-use items or technology?",
  "Will it use or produce security sensitive data?",
  "Could the results be misused for malicious purposes?",
];

export default function SecurityIssuesTable() {
  const { applicationFormId, isSubmitted } = useApplication();
  const { show } = useToast();
  const [answers, setAnswers] = useState<string[]>(
    Array(securityQuestions.length).fill("")
  );
  const [records, setRecords] = useState<(SecurityAnswer | null)[]>(
    Array(securityQuestions.length).fill(null)
  );
  const [pages, setPages] = useState<string[]>(
    Array(securityQuestions.length).fill("")
  );

  useEffect(() => {
    if (!applicationFormId) return;
    listSecurityAnswers()
      .then((data) => {
        const filtered = data.filter(
          (a) => a.application_form_id === applicationFormId
        );
        const ans = Array(securityQuestions.length).fill("");
        const rec = Array<SecurityAnswer | null>(securityQuestions.length).fill(null);
        for (let i = 0; i < filtered.length && i < securityQuestions.length; i++) {
          ans[i] = filtered[i].free_text || "";
          rec[i] = filtered[i];
        }
        setAnswers(ans);
        setRecords(rec);
      })
      .catch(() => show("Failed to load security answers"));
  }, [applicationFormId, show]);

  const setAnswer = (index: number, value: string) => {
    const copy = [...answers];
    copy[index] = value;
    setAnswers(copy);

    if (!applicationFormId) return;
    const input: SecurityAnswerInput = {
      application_form_id: applicationFormId,
      free_text: value,
    };
    const record = records[index];
    const promise = record
      ? updateSecurityAnswer(record.id, input)
      : createSecurityAnswer(input);
    promise
      .then((data) => {
        setRecords((prev) => {
          const arr = [...prev];
          arr[index] = data;
          return arr;
        });
        show("Answer saved");
      })
      .catch(() => show("Failed to save answer"));
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
                  disabled={isSubmitted}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`security_${i}`}
                  value="no"
                  checked={answers[i] === "no"}
                  onChange={() => setAnswer(i, "no")}
                  disabled={isSubmitted}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="input w-20"
                  disabled={answers[i] !== "yes" || isSubmitted}
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
