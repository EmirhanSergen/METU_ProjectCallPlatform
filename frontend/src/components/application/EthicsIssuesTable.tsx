import { useEffect, useState } from "react";
import Table from "../ui/Table";
import { useApplication } from "../../context/ApplicationProvider";
import { useToast } from "../../context/ToastProvider";
import {
  createEthicsAnswer,
  updateEthicsAnswer,
  getEthicsAnswers,
} from "../../api/ethics_answers";
import type { EthicsAnswer, EthicsAnswerInput } from "../../types/ethics_answers";

const ethicsQuestions = [
  "Does your research involve human participants?",
  "Does it involve the collection or processing of personal data?",
  "Does it involve the use of animals?",
  "Could your work cause environmental or health and safety concerns?",
];

export default function EthicsIssuesTable() {
  const { applicationFormId, isSubmitted } = useApplication();
  const { show } = useToast();
  const [answers, setAnswers] = useState<string[]>(
    Array(ethicsQuestions.length).fill("")
  );
  const [records, setRecords] = useState<(EthicsAnswer | null)[]>(
    Array(ethicsQuestions.length).fill(null)
  );
  const [pages, setPages] = useState<string[]>(
    Array(ethicsQuestions.length).fill("")
  );

  useEffect(() => {
    if (!applicationFormId) return;
    getEthicsAnswers()
      .then((data) => {
        const filtered = data.filter(
          (a) => a.application_form_id === applicationFormId
        );
        const ans = Array(ethicsQuestions.length).fill("");
        const rec = Array<EthicsAnswer | null>(ethicsQuestions.length).fill(null);
        for (let i = 0; i < filtered.length && i < ethicsQuestions.length; i++) {
          ans[i] = filtered[i].free_text || "";
          rec[i] = filtered[i];
        }
        setAnswers(ans);
        setRecords(rec);
      })
      .catch(() => show("Failed to load ethics answers"));
  }, [applicationFormId, show]);

  const setAnswer = (index: number, value: string) => {
    const copy = [...answers];
    copy[index] = value;
    setAnswers(copy);

    if (!applicationFormId) return;
    const input: EthicsAnswerInput = {
      application_form_id: applicationFormId,
      free_text: value,
    };
    const record = records[index];
    const promise = record
      ? updateEthicsAnswer(record.id, input)
      : createEthicsAnswer(input);
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
                  disabled={isSubmitted}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`ethics_${i}`}
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
