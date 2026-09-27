import { EXIT, parseArgs } from "../lib/cli.mjs";
import { latestEvaluation, readControl } from "../lib/control.mjs";
import { relative } from "../lib/paths.mjs";
import { reportEvidence } from "../lib/reports.mjs";
import { findRoot } from "../lib/root.mjs";
import { resolveSpecDir } from "../lib/spec.mjs";

const summary = (entry) => entry && { status: entry.status, revision: entry.revision, commit: entry.commit, at: entry.at, report: entry.report };

/**
 * Exit 0 when the evidence permits shipping, 1 otherwise; the JSON lists every blocker.
 * It reads only control.json and the presence of the reports, so a fresh clone agrees (D2).
 */
export default function evalGate(argv) {
  const { spec: input } = parseArgs(argv, { positional: ["spec"] });
  const root = findRoot();
  const { dir } = resolveSpecDir(root, input);
  const control = readControl(dir);
  const verification = latestEvaluation(control, "verification");
  const qualification = latestEvaluation(control, "qualification");
  const evidence = {
    verification: reportEvidence(dir, "verification", verification),
    qualification: reportEvidence(dir, "qualification", qualification),
  };
  for (const item of Object.values(evidence)) item.file = relative(root, item.file);
  const valid = evidence.verification.ok && evidence.qualification.ok;
  const eligible = control.status !== "shipped" && valid
    && (verification.status === "green" && ["green", "amber"].includes(qualification.status)
      || verification.status === "red" && verification.revision >= 3);
  const body = {
    spec: control.id, state: control.status,
    verification: summary(verification), qualification: summary(qualification),
    evidence, eligible,
    blockers: [
      ...(control.status === "shipped" ? ["The spec is already shipped."] : []),
      ...(!evidence.verification.ok ? [`Verification: ${evidence.verification.reason}`] : []),
      ...(!evidence.qualification.ok ? [`Qualification: ${evidence.qualification.reason}`] : []),
      ...(valid && !eligible && control.status !== "shipped" ? ["Shipping requires green verification with green or amber qualification, or red verification at revision 3 or later with completed qualification evidence."] : []),
    ],
  };
  return { body, exitCode: eligible ? EXIT.ok : EXIT.rule };
}
