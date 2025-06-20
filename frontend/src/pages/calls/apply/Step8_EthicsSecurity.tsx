import { useState, useEffect } from "react";
import { useApplication } from "../../../context/ApplicationProvider";
import { useToast } from "../../../context/ToastProvider";
import EthicsIssuesTable from "../../../components/application/EthicsIssuesTable";
import SecurityIssuesTable from "../../../components/application/SecurityIssuesTable";

export default function Step8_EthicsSecurity() {
  const { application, updateApplicationField, completeStep, isSubmitted } = useApplication();
  const { show } = useToast();
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

  useEffect(() => {
    setEthicsConfirmed(application.ethics_confirmed || false);
    setEthicalDescription(application.ethical_dimension_description || "");
    setComplianceText(application.compliance_text || "");
    setSecuritySelfAssessment(application.security_self_assessment_text || "");
  }, [application]);

  const handleChange = () => {
    updateApplicationField("ethics_confirmed", ethicsConfirmed);
    updateApplicationField("ethical_dimension_description", ethicalDescription);
    updateApplicationField("compliance_text", complianceText);
    updateApplicationField(
      "security_self_assessment_text",
      securitySelfAssessment
    );
    completeStep("step8");
    show("Section saved");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Ethics and Security</h2>

      <div className="space-y-2">
        <EthicsIssuesTable />
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={ethicsConfirmed}
            onChange={(e) => setEthicsConfirmed(e.target.checked)}
            disabled={isSubmitted}
          />
          <span>I confirm that I have reviewed the ethical issues.</span>
        </label>
        <div>
          <label className="block text-sm">Describe the ethical dimension of your proposal</label>
          <textarea
            className="input w-full h-24"
            value={ethicalDescription}
            onChange={(e) => setEthicalDescription(e.target.value)}
            disabled={isSubmitted}
          />
        </div>
        <div>
          <label className="block text-sm">Compliance with Ethical Principles</label>
          <textarea
            className="input w-full h-24"
            value={complianceText}
            onChange={(e) => setComplianceText(e.target.value)}
            disabled={isSubmitted}
          />
        </div>
      </div>

      <div className="space-y-2">
        <SecurityIssuesTable />
        <div>
          <label className="block text-sm">Security Self-Assessment</label>
          <textarea
            className="input w-full h-24"
            value={securitySelfAssessment}
            onChange={(e) => setSecuritySelfAssessment(e.target.value)}
            disabled={isSubmitted}
          />
        </div>
      </div>

      <button
        onClick={handleChange}
        disabled={isSubmitted}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        Save Section
      </button>
    </div>
  );
}
