import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readSpec, updateReport, updateSpec } from "./frontmatter.mjs";
import { latest, readEvaluations } from "./journal.mjs";
import { checkPriorVerification, REPORTS, validateFindings } from "./reports.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SKILLS = { verification: "verify-behavior", qualification: "review-implementation" };
const STAGES = { verification: "verify", qualification: "qualify" };
const STATUSES = new Set(["green", "amber", "red"]);

function rootFrom(start) {
  let current = path.resolve(start);
  while (true) {
    if (fs.existsSync(path.join(current, ".aiddbot")) && fs.existsSync(path.join(current, ".git"))) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

function git(root, args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
}

function validateArgs(kind, args) {
  if (!Object.hasOwn(SKILLS, kind)) throw new Error(`Unknown evaluation kind: ${kind}`);
  if (args.length !== 3) throw new Error("Expected a spec directory, status, and one-line summary.");
  const [directory, rawStatus, rawSummary] = args;
  const status = rawStatus.toLowerCase();
  const summary = rawSummary.trim();
  if (!STATUSES.has(status)) throw new Error(`Invalid evaluation status: ${rawStatus}`);
  if (!summary || /[\r\n|]/.test(summary)) throw new Error("Summary must be one line without |.");
  return { directory, status, summary };
}

function loadSpec(root, directory) {
  const dir = path.resolve(root, directory);
  const file = path.join(dir, "spec.md");
  const data = readSpec(fs.readFileSync(file, "utf8"));
  const key = `${data.fields.id}-${path.basename(dir).slice(6)}`;
  if (data.fields.key !== key) throw new Error("Spec frontmatter does not match its directory.");
  if (["draft", "shipped"].includes(data.fields.status)) throw new Error(`Cannot evaluate a spec in ${data.fields.status} state.`);
  return { dir, file, data };
}

function nextRevision(events, stage) {
  const revision = Number(latest(events, stage)?.revision ?? 0) + 1;
  if (revision > 999) throw new Error("Evaluation revision exceeds the journal's three-character field.");
  return revision;
}

function checkGate(kind, spec, events) {
  if (kind === "qualification") checkPriorVerification(spec.dir, spec.data.fields.id, latest(events, "verify"));
}

function buildReport(kind, status, file, spec, revision, commit, time) {
  if (status === "green") {
    if (fs.existsSync(file) && !fs.statSync(file).isFile()) throw new Error(`Report path is not a file: ${file}`);
    return null;
  }
  let report = fs.readFileSync(file, "utf8");
  validateFindings(kind, report);
  report = report.replaceAll("S0001-{slug}", spec.data.fields.key);
  return updateReport(report, { spec: spec.data.fields.id, status, revision, evaluated_commit: commit, updated_at: time });
}

function nextState(kind, status, events) {
  if (kind === "verification") return status === "green" ? "verified" : "in-progress";
  if (status !== "red") return "qualified";
  return latest(events, "verify")?.status === "Error" ? "in-progress" : "verified";
}

function persist(root, spec, kind, input, evaluation, report) {
  const updates = {
    status: nextState(kind, input.status, evaluation.events),
    updated_at: evaluation.time,
    last_process: kind === "verification" ? "verify" : "qualify",
  };
  if (input.status === "green") fs.rmSync(path.join(spec.dir, REPORTS[kind]), { force: true });
  else fs.writeFileSync(path.join(spec.dir, REPORTS[kind]), report, "utf8");
  fs.writeFileSync(spec.file, updateSpec(fs.readFileSync(spec.file, "utf8"), updates), "utf8");
}

function appendJournal(root, kind, specId, input, revision) {
  const script = path.join(root, ".agents", "skills", "record-journal", "scripts", "append.mjs");
  execFileSync(process.execPath, [script, SKILLS[kind], "evaluated", input.status, input.summary, "--spec", specId, "--revision", String(revision)], { cwd: root, stdio: "inherit" });
}

export function finalizeEvaluation(kind, argv) {
  const input = validateArgs(kind, argv);
  const root = rootFrom(HERE);
  if (!root) throw new Error("Could not find the project root (.aiddbot and .git).");
  const spec = loadSpec(root, input.directory);
  const events = readEvaluations(root, spec.data.fields.id);
  checkGate(kind, spec, events);
  const revision = nextRevision(events, STAGES[kind]);
  const commit = git(root, ["rev-parse", "HEAD"]);
  const time = new Date().toISOString();
  const reportPath = path.join(spec.dir, REPORTS[kind]);
  const report = buildReport(kind, input.status, reportPath, spec, revision, commit, time);
  persist(root, spec, kind, input, { events, revision, commit, time }, report);
  appendJournal(root, kind, spec.data.fields.id, input, revision);
  process.stdout.write(`${JSON.stringify({ spec: spec.data.fields.id, kind, status: input.status, revision, evaluated_at: time, evaluated_commit: commit }, null, 2)}\n`);
}
