import fs from "node:fs";
import { EXIT, parseArgs } from "../lib/cli.mjs";
import { read } from "../lib/frontmatter.mjs";
import { latest, readEvaluations } from "../lib/journal.mjs";
import { relative } from "../lib/paths.mjs";
import { reportEvidence } from "../lib/reports.mjs";
import { findRoot } from "../lib/root.mjs";
import { resolveSpecDir } from "../lib/spec.mjs";

const summary = (event) => event && { status: event.status, revision: Number(event.revision), date: event.date, time: event.time };

/** Exit 0 when the evidence permits shipping, 1 otherwise; the JSON lists every blocker. */
export default function evalGate(argv) {
  const { spec: input } = parseArgs(argv, { positional: ["spec"] });
  const root = findRoot();
  const { dir, file } = resolveSpecDir(root, input);
  let id;
  try { id = read(fs.readFileSync(file, "utf8"), "Spec").id; } catch { /* Fall back to the directory name. */ }
  id = /^S\d{4}$/.test(id ?? "") ? id : /\b(S\d{4})\b/.exec(dir.split(/[\\/]/).at(-1))?.[1];
  if (!id) throw new Error(`Could not determine spec ID from ${file}`);
  const events = readEvaluations(root, id);
  const verification = latest(events, "verify");
  const qualification = latest(events, "qualify");
  const evidence = {
    verification: reportEvidence(dir, "verification", verification, id),
    qualification: reportEvidence(dir, "qualification", qualification, id),
  };
  const valid = evidence.verification.ok && evidence.qualification.ok;
  const eligible = valid && (verification?.status === "green" && ["green", "amber"].includes(qualification?.status)
    || verification?.status === "red" && Number(verification.revision) >= 3);
  const body = {
    spec: id, specFile: relative(root, file),
    verification: summary(verification), qualification: summary(qualification),
    evidence, eligible,
    blockers: [
      ...(!evidence.verification.ok ? [`Verification: ${evidence.verification.reason}`] : []),
      ...(!evidence.qualification.ok ? [`Qualification: ${evidence.qualification.reason}`] : []),
      ...(valid && !eligible ? ["Shipping requires green verification with green or amber qualification, or red verification at revision 3 or later with completed qualification evidence."] : []),
    ],
  };
  return { body, exitCode: eligible ? EXIT.ok : EXIT.rule };
}
