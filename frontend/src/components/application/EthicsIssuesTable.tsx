import Table from "../ui/Table";

const ethicsQuestions = [
  "Does your research involve human participants?",
  "Does it involve the collection or processing of personal data?",
  "Does it involve the use of animals?",
  "Could your work cause environmental or health and safety concerns?",
];

export default function EthicsIssuesTable() {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Ethics Issues</h3>
      <Table>
        <tbody>
          {ethicsQuestions.map((q, i) => (
            <tr key={i}>
              <td>{q}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
