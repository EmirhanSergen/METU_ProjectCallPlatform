import Table from "../ui/Table";

const securityQuestions = [
  "Does your project involve dual-use items or technology?",
  "Will it use or produce security sensitive data?",
  "Could the results be misused for malicious purposes?",
];

export default function SecurityIssuesTable() {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Security Issues</h3>
      <Table>
        <tbody>
          {securityQuestions.map((q, i) => (
            <tr key={i}>
              <td>{q}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
