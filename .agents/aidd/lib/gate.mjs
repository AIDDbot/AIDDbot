// The shipping gate. It reads only control.json and the presence of the reports, so a fresh
// clone agrees (D2). `aidd eval gate` reports it and `aidd release` enforces it (D24).
import { latestEvaluation } from "./control.mjs";
import { relative } from "./paths.mjs";
import { reportEvidence } from "./reports.mjs";

const summary = (entry) => entry && { status: entry.status, revision: entry.revision, commit: entry.commit, at: entry.at, report: entry.report };

/** True when the latest evaluations permit shipping; `aidd eval record` moves the spec to `qualified` exactly then. */
export const shippable = (verification, qualification) => Boolean(verification && qualification)
  && (verification.status === "green" && ["green", "amber"].includes(qualification.status) || verification.status === "red" && verification.revision >= 3);

export function gate(root, dir, control) {
  const verification = latestEvaluation(control, "verification");
  const qualification = latestEvaluation(control, "qualification");
  const evidence = {
    verification: reportEvidence(dir, "verification", verification),
    qualification: reportEvidence(dir, "qualification", qualification),
  };
  for (const item of Object.values(evidence)) item.file = relative(root, item.file);
  const blockers = [
    ...(control.status === "shipped" ? ["The spec is already shipped."] : []),
    ...(control.blocked ? [`The spec is blocked: ${control.blocked.reason}`] : []),
    ...(!evidence.verification.ok ? [`Verification: ${evidence.verification.reason}`] : []),
    ...(!evidence.qualification.ok ? [`Qualification: ${evidence.qualification.reason}`] : []),
    ...(control.status !== "shipped" && control.status !== "qualified" ? [`The spec is ${control.status}; shipping requires qualified: green verification with green or amber qualification, or red verification at revision 3 or later with a completed qualification.`] : []),
  ];
  return {
    spec: control.id, state: control.status, blocked: control.blocked,
    verification: summary(verification), qualification: summary(qualification),
    evidence, eligible: !blockers.length && shippable(verification, qualification), blockers,
  };
}
