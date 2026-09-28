import fs from "node:fs";
import path from "node:path";
import { parseArgs, RuleError, UsageError } from "../lib/cli.mjs";
import { EVALUATION_KINDS, EVALUATION_STATUSES, latestEvaluation, readControl, transition, writeControl } from "../lib/control.mjs";
import { readConfig } from "../lib/config.mjs";
import { git } from "../lib/git.mjs";
import { noteQuietly } from "../lib/journal.mjs";
import { REPORTS, reportEvidence, validateFindings } from "../lib/reports.mjs";
import { findRoot } from "../lib/root.mjs";
import { resolveSpecDir } from "../lib/spec.mjs";
import { trace } from "../lib/trace.mjs";

function input(argv) {
  const args = parseArgs(argv, { positional: ["kind", "specDir", "status", "summary"] });
  if (!EVALUATION_KINDS.includes(args.kind)) throw new UsageError(`Unknown evaluation kind: ${args.kind}`);
  const status = args.status.toLowerCase();
  const summary = args.summary.trim();
  if (!EVALUATION_STATUSES.includes(status)) throw new UsageError(`Invalid evaluation status: ${args.status}`);
  if (!summary || /[\r\n]/.test(summary)) throw new UsageError("Summary must be one non-empty line.");
  return { kind: args.kind, specDir: args.specDir, status, summary };
}

/** Qualification needs green verification, or red verification at revision 3+ with its current report. */
function checkPriorVerification(dir, verification) {
  if (!verification) throw new RuleError("Qualification has no recorded verification.");
  if (verification.status === "green") {
    if (fs.existsSync(path.join(dir, REPORTS.verification))) throw new RuleError("Green verification must have no report before qualification.");
    return;
  }
  if (verification.status !== "red" || verification.revision < 3) throw new RuleError("Qualification requires green verification or red verification at revision 3 or later.");
  const evidence = reportEvidence(dir, "verification", verification);
  if (!evidence.ok) throw new RuleError(`Red verification at revision 3 or later needs its current report: ${evidence.reason}`);
}

function nextState(kind, status, control) {
  if (kind === "verification") return status === "green" ? "verified" : "in-progress";
  if (status !== "red") return "qualified";
  return latestEvaluation(control, "verification")?.status === "red" ? "in-progress" : "verified";
}

/** Write or remove the report the evaluation requires; true when it requires one. */
function settleReport(dir, kind, status, key) {
  const file = path.join(dir, REPORTS[kind]);
  if (status === "green") {
    if (fs.existsSync(file) && !fs.statSync(file).isFile()) throw new RuleError(`Report path is not a file: ${file}`);
    fs.rmSync(file, { force: true });
    return false;
  }
  if (!fs.existsSync(file)) throw new RuleError(`Write the ${status} findings report first: ${file}`);
  const report = fs.readFileSync(file, "utf8");
  validateFindings(kind, report);
  if (report.includes("S0001-{slug}")) fs.writeFileSync(file, report.replaceAll("S0001-{slug}", key), "utf8");
  return true;
}

export default function evalRecord(argv) {
  const { kind, specDir, status, summary } = input(argv);
  const root = findRoot();
  const { dir } = resolveSpecDir(root, specDir);
  const control = readControl(dir);
  if (["draft", "shipped"].includes(control.status)) throw new RuleError(`Cannot evaluate a spec in ${control.status} state.`);
  if (kind === "qualification") checkPriorVerification(dir, latestEvaluation(control, "verification"));
  if (kind === "verification" && status === "green") {
    const traced = trace(root, { id: control.id, text: fs.readFileSync(path.join(dir, "spec.md"), "utf8") });
    if (traced.status === "red") throw new RuleError(`Verification cannot be green while the trace is red (aidd trace ${control.id}): ${traced.problems.join(" ")}`);
    const unreported = Object.entries(readConfig(root).projects).filter(([, project]) => project.commands.acceptance && !project.acceptanceReport).map(([name]) => name);
    if (unreported.length) throw new RuleError(`Verification cannot be green without an acceptance report to assign failures; declare acceptanceReport for: ${unreported.join(", ")}`);
  }
  const revision = (latestEvaluation(control, kind)?.revision ?? 0) + 1;
  const entry = {
    kind, revision, status,
    commit: git(root, ["rev-parse", "HEAD"], { quiet: true }),
    at: new Date().toISOString(),
    report: settleReport(dir, kind, status, control.key) ? REPORTS[kind] : null,
  };
  const next = nextState(kind, status, control);
  control.evaluations.push(entry);
  writeControl(dir, transition(control, next));
  noteQuietly(root, { event: "evaluated", status, spec: control.id, summary: `${kind} revision ${revision} · ${control.status} · ${summary}` });
  return { spec: control.id, ...entry, state: control.status };
}
