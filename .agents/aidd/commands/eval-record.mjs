import fs from "node:fs";
import path from "node:path";
import { parseArgs, RuleError, UsageError } from "../lib/cli.mjs";
import { requireFields, write } from "../lib/frontmatter.mjs";
import { git } from "../lib/git.mjs";
import { appendEvent, latest, readEvaluations } from "../lib/journal.mjs";
import { REPORTS, reportEvidence, validateFindings } from "../lib/reports.mjs";
import { findRoot } from "../lib/root.mjs";
import { resolveSpecDir } from "../lib/spec.mjs";

const SKILLS = { verification: "verify-behavior", qualification: "review-implementation" };
const STAGES = { verification: "verify", qualification: "qualify" };
const STATUSES = ["green", "amber", "red"];

function input(argv) {
  const args = parseArgs(argv, { positional: ["kind", "specDir", "status", "summary"] });
  if (!Object.hasOwn(SKILLS, args.kind)) throw new UsageError(`Unknown evaluation kind: ${args.kind}`);
  const status = args.status.toLowerCase();
  const summary = args.summary.trim();
  if (!STATUSES.includes(status)) throw new UsageError(`Invalid evaluation status: ${args.status}`);
  if (!summary || /[\r\n|]/.test(summary)) throw new UsageError("Summary must be one line without |.");
  return { kind: args.kind, specDir: args.specDir, status, summary };
}

function loadSpec(root, specDir) {
  const { dir, file } = resolveSpecDir(root, specDir);
  const fields = requireFields(fs.readFileSync(file, "utf8"), ["id", "key", "status"], "Spec");
  if (fields.key !== `${fields.id}-${path.basename(dir).slice(6)}`) throw new RuleError("Spec frontmatter does not match its directory.");
  if (["draft", "shipped"].includes(fields.status)) throw new RuleError(`Cannot evaluate a spec in ${fields.status} state.`);
  return { dir, file, id: fields.id, key: fields.key };
}

/** Qualification needs green verification, or red verification at revision 3+ with its current report. */
function checkPriorVerification(spec, verification) {
  if (!verification) throw new RuleError("Qualification has no journaled verification evidence.");
  const file = path.join(spec.dir, REPORTS.verification);
  if (verification.status === "green") {
    if (fs.existsSync(file)) throw new RuleError("Green verification must have no report before qualification.");
    return;
  }
  if (verification.status !== "red" || Number(verification.revision) < 3) throw new RuleError("Qualification requires green verification or red verification at revision 3 or later.");
  if (!fs.existsSync(file)) throw new RuleError("Red verification at revision 3 or later requires its current findings report.");
  if (!reportEvidence(spec.dir, "verification", verification, spec.id).ok) throw new RuleError("Verification report does not match the latest red revision 3+ journal event.");
  validateFindings("verification", fs.readFileSync(file, "utf8"));
}

function nextState(kind, status, events) {
  if (kind === "verification") return status === "green" ? "verified" : "in-progress";
  if (status !== "red") return "qualified";
  return latest(events, "verify")?.status === "red" ? "in-progress" : "verified";
}

export default function evalRecord(argv) {
  const { kind, specDir, status, summary } = input(argv);
  const root = findRoot();
  const spec = loadSpec(root, specDir);
  const events = readEvaluations(root, spec.id);
  if (kind === "qualification") checkPriorVerification(spec, latest(events, "verify"));
  const revision = Number(latest(events, STAGES[kind])?.revision ?? 0) + 1;
  if (revision > 999) throw new RuleError("Evaluation revision exceeds the journal's three-character field.");
  const commit = git(root, ["rev-parse", "HEAD"], { quiet: true });
  const time = new Date().toISOString();
  const reportFile = path.join(spec.dir, REPORTS[kind]);
  if (status === "green") {
    if (fs.existsSync(reportFile) && !fs.statSync(reportFile).isFile()) throw new RuleError(`Report path is not a file: ${reportFile}`);
    fs.rmSync(reportFile, { force: true });
  } else {
    if (!fs.existsSync(reportFile)) throw new RuleError(`Write the ${status} findings report first: ${reportFile}`);
    let report = fs.readFileSync(reportFile, "utf8");
    validateFindings(kind, report);
    report = report.replaceAll("S0001-{slug}", spec.key);
    report = write(report, { spec: spec.id, status, revision, evaluated_commit: commit, updated_at: time }, { raw: true, strict: true, label: "Finding report" });
    fs.writeFileSync(reportFile, report, "utf8");
  }
  const updates = { status: nextState(kind, status, events), updated_at: time, last_process: STAGES[kind] };
  fs.writeFileSync(spec.file, write(fs.readFileSync(spec.file, "utf8"), updates, { label: "Spec" }), "utf8");
  appendEvent(root, { skill: SKILLS[kind], event: "evaluated", status, summary, agent: "Direct", spec: spec.id, revision: String(revision) });
  return { spec: spec.id, kind, status, revision, evaluated_at: time, evaluated_commit: commit };
}
