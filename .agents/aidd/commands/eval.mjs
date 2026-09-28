// `aidd eval <kind> <status> <summary> [--spec <id>]`: record one evaluation at HEAD.
import fs from "node:fs";
import path from "node:path";
import { git, journal, RuleError, UsageError } from "../lib/core.mjs";
import { KINDS, readControl, requireSpec, STATUSES, writeControl } from "../lib/spec.mjs";

export default function evaluate(root, [kind, status, summary], flags) {
  if (!KINDS.includes(kind)) throw new UsageError(`Kind must be one of: ${KINDS.join(", ")}.`);
  if (!STATUSES.includes(status)) throw new UsageError(`Status must be one of: ${STATUSES.join(", ")}.`);
  if (!summary?.trim()) throw new UsageError("Give a one-line summary of the evaluation.");
  const dir = requireSpec(root, typeof flags.spec === "string" ? flags.spec : undefined);
  const control = readControl(dir);
  if (control.status === "shipped") throw new RuleError(`${control.id} is already shipped.`);
  const report = path.join(dir, `${kind}.md`);
  if (status !== "green" && !fs.existsSync(report)) {
    throw new RuleError(`This ${status} ${kind} needs its findings in ${kind}.md first; write it, then record again.`);
  }
  const revision = control.evaluations.filter((entry) => entry.kind === kind).length + 1;
  const commit = git(root, ["rev-parse", "HEAD"]);
  control.evaluations.push({ kind, revision, status, commit, at: new Date().toISOString(), summary: summary.trim() });
  writeControl(dir, control);
  journal(root, { event: "evaluated", spec: control.id, status, summary: `${kind} ${revision}: ${summary}` });
  return { spec: control.id, kind, revision, status, commit };
}
