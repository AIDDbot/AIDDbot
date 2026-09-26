import path from "node:path";
function signatureEvidence(evaluation, signature) {
  if (!evaluation) return { ok: true, reason: "no evaluation yet" };
  if (!signature) return { ok: true, reason: "legacy spec without evaluation signature" };
  if (signature.invalid) return { ok: false, reason: "spec frontmatter evaluation signature is incomplete" };
  if (signature.status !== evaluation.status || signature.revision !== evaluation.revision) return { ok: false, reason: "spec signature does not match journal" };
  if (Number.isNaN(new Date(signature.at).getTime()) || !/^[\da-f]{40,64}$/i.test(signature.commit)) return { ok: false, reason: "spec signature has invalid timestamp or commit" };
  return { ok: true, reason: "spec signature matches journal" };
}

export function evaluateEvidence(root, spec, verification, qualification, verificationReport, qualificationReport) {
  const verificationSignature = signatureEvidence(verification, spec.signatures.verification);
  const qualificationSignature = signatureEvidence(qualification, spec.signatures.qualification);
  const verificationEvidence = verificationSignature.ok ? verificationReport : { ...verificationReport, ok: false, reason: verificationSignature.reason };
  const qualificationEvidence = qualificationSignature.ok ? qualificationReport : { ...qualificationReport, ok: false, reason: qualificationSignature.reason };
  const valid = verificationEvidence.ok && qualificationEvidence.ok;
  const eligible = valid && (verification?.status === "green" && ["green", "amber"].includes(qualification?.status)
    || verification?.status === "red" && Number(verification.revision) >= 3);
  return {
    spec: spec.id, specFile: path.relative(root, spec.file),
    verification: verification && { status: verification.status, revision: Number(verification.revision), date: verification.date, time: verification.time },
    qualification: qualification && { status: qualification.status, revision: Number(qualification.revision), date: qualification.date, time: qualification.time },
    signature: spec.signatures, evidence: { verification: verificationEvidence, qualification: qualificationEvidence }, eligible,
    blockers: [
      ...(!verificationEvidence.ok ? [`Verification: ${verificationEvidence.reason}`] : []),
      ...(!qualificationEvidence.ok ? [`Qualification: ${qualificationEvidence.reason}`] : []),
      ...(valid && !eligible ? ["Shipping requires green verification with green or amber qualification, or red verification at revision 3 or later with completed qualification evidence."] : []),
    ],
  };
}
