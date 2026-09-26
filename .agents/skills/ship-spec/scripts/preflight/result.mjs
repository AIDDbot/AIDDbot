import path from "node:path";

export function evaluateEvidence(root, spec, verification, qualification, verificationReport, qualificationReport) {
  const verificationEvidence = verificationReport;
  const qualificationEvidence = qualificationReport;
  const valid = verificationEvidence.ok && qualificationEvidence.ok;
  const eligible = valid && (verification?.status === "green" && ["green", "amber"].includes(qualification?.status)
    || verification?.status === "red" && Number(verification.revision) >= 3);
  return {
    spec: spec.id, specFile: path.relative(root, spec.file),
    verification: verification && { status: verification.status, revision: Number(verification.revision), date: verification.date, time: verification.time },
    qualification: qualification && { status: qualification.status, revision: Number(qualification.revision), date: qualification.date, time: qualification.time },
    evidence: { verification: verificationEvidence, qualification: qualificationEvidence }, eligible,
    blockers: [
      ...(!verificationEvidence.ok ? [`Verification: ${verificationEvidence.reason}`] : []),
      ...(!qualificationEvidence.ok ? [`Qualification: ${qualificationEvidence.reason}`] : []),
      ...(valid && !eligible ? ["Shipping requires green verification with green or amber qualification, or red verification at revision 3 or later with completed qualification evidence."] : []),
    ],
  };
}
