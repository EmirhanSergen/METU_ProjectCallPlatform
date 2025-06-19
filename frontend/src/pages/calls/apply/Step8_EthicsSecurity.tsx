import { useState } from "react";
import { useApplication } from "../../../context/ApplicationProvider";
import { Textarea } from "../../../components/ui/Textarea";
import { Checkbox } from "../../../components/ui/Checkbox";
import EthicsIssuesTable from "../../../components/application/EthicsIssuesTable";
import SecurityIssuesTable from "../../../components/application/SecurityIssuesTable";

export default function Step8_EthicsSecurity() {
  const { application, updateApplicationField } = useApplication();
  const [ethicsConfirmed, setEthicsConfirmed] = useState(
    application.ethics_confirmed || false
  );
  const [ethicalDescription, setEthicalDescription] = useState(
    application.ethical_dimension_description || ""
  );
  const [complianceText, setComplianceText] = useState(
    application.compliance_text || ""
  );
  const [securitySelfAssessment, setSecuritySelfAssessment] = useState(
    application.security_self_assessment_text || ""
  );

  const handleChange = () => {
    updateApplicationField("ethics_confirmed", ethicsConfirmed);
    updateApplicationField(
      "ethical_dimension_description",
      ethicalDescription
    );
    updateApplicationField("compliance_text", complianceText);
    updateApplicationField(
      "security_self_assessment_text",
      securitySelfAssessment
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Ethics and Security</h2>

      <div className="space-y-2">
        <EthicsIssuesTable />
        <Checkbox
          label="I confirm that I have reviewed the ethical issues."
          checked={ethicsConfirmed}
          onChange={(e) => setEthicsConfirmed(e.target.checked)}
        />
        <Textarea
          label="Describe the ethical dimension of your proposal"
          value={ethicalDescription}
          onChange={(e) => setEthicalDescription(e.target.value)}
        />
        <Textarea
          label="Compliance with Ethical Principles"
          value={complianceText}
          onChange={(e) => setComplianceText(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <SecurityIssuesTable />
        <Textarea
          label="Security Self-Assessment"
          value={securitySelfAssessment}
          onChange={(e) => setSecuritySelfAssessment(e.target.value)}
        />
      </div>

      <button
        onClick={handleChange}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        Save Section
      </button>
    </div>
  );
}
