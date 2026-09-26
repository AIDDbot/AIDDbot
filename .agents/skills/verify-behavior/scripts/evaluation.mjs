#!/usr/bin/env node
// Shared finalizer for verification and qualification evaluations.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const STATUS_LEVELS = new Set(["green", "amber", "red"]);
const SKILL_BY_KIND = { verification: "verify-behavior", qualification: "review-implementation" };
const STAGE_BY_KIND = { verification: "verify", qualification: "qualify" };
const REPORT_BY_KIND = { verification: "verification.md", qualification: "qualification.md" };

function fail(message) {
  process.stderr.write(`${message}\nUsage: node finalize.mjs <spec-directory> <green|amber|red> <summary>\n`);
  process.exit(2);
}

function git(root, args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
}

function repositoryRoot() {
  let current = path.resolve(SCRIPT_DIR);
  while (true) {
    if (fs.existsSync(path.join(current, ".aiddbot")) && fs.existsSync(path.join(current, ".git"))) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

function parseSpecFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) throw new Error("Spec frontmatter is missing.");
  const values = {};
  for (const key of ["id", "key", "status"]) {
    values[key] = new RegExp(`^${key}:\\s*([^#\\s]+)`, "m").exec(match[1])?.[1];
    if (!values[key]) throw new Error(`Spec frontmatter is missing ${key}.`);
  }
  for (const key of ["verification_status", "verification_revision", "verification_at", "verification_commit"]) {
    values[key] = new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m").exec(match[1])?.[1];
  }
  return { body: text.slice(match[0].length), fields: values, frontmatter: match[1], newline: match[0].includes("\r\n") ? "\r\n" : "\n" };
}

function setFields(text, updates) {
  const parsed = parseSpecFrontmatter(text);
  let frontmatter = parsed.frontmatter;
  for (const [key, value] of Object.entries(updates)) {
    const line = new RegExp(`^${key}:.*$`, "m");
    if (line.test(frontmatter)) frontmatter = frontmatter.replace(line, `${key}: ${value}`);
    else frontmatter += `${parsed.newline}${key}: ${value}`;
  }
  return `---${parsed.newline}${frontmatter}${parsed.newline}---${parsed.newline}${parsed.body}`;
}

function setReportMetadata(text, metadata) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) throw new Error("Finding report frontmatter is missing.");
  const newline = match[0].includes("\r\n") ? "\r\n" : "\n";
  let frontmatter = match[1];
  for (const [key, value] of Object.entries(metadata)) {
    const line = new RegExp(`^${key}:.*$`, "m");
    if (!line.test(frontmatter)) throw new Error(`Finding report frontmatter is missing ${key}.`);
    frontmatter = frontmatter.replace(line, `${key}: ${value}`);
  }
  const body = text.slice(match[0].length);
  return `---${newline}${frontmatter}${newline}---${newline}${body}`;
}

function validateFindingReport(kind, report) {
  const placeholders = kind === "verification"
    ? ["{ID or technical outcome}", "{Test or check}", "{Fail or blocked}", "{Observed output or link}"]
    : ["{failed blocking gate or technical criterion}", "{Observed violation}", "{Observed facts or link}", "{short title}", "{paths or projects}", "{gate, technical criterion, or none}", "{blocking | debt}"];
  for (const placeholder of placeholders) if (report.includes(placeholder)) throw new Error(`Replace report template placeholder: ${placeholder}`);

  const section = (heading) => {
    const match = new RegExp(`^${heading}\\s*$`, "m").exec(report);
    if (!match) return "";
    const tail = report.slice(match.index + match[0].length);
    const next = /^## /m.exec(tail);
    return next ? tail.slice(0, next.index) : tail;
  };
  if (kind === "verification") {
    const rows = section("## Failures").split(/\r?\n/).filter((line) => line.startsWith("|") && !/^\|\s*:?-{2,}/.test(line) && !line.includes("Requirement / outcome"));
    if (!rows.length) throw new Error("Verification report must contain at least one failed or blocked acceptance row.");
  } else {
    const controlRows = section("## Failed controls").split(/\r?\n/).filter((line) => line.startsWith("|") && !/^\|\s*:?-{2,}/.test(line) && !line.includes("| Control |"));
    const finding = /^### .+$/m.test(report);
    if (!controlRows.length && !finding) throw new Error("Qualification report must contain a failed control or a finding.");
  }
}

function readEvaluations(root, specId) {
  const directory = path.join(root, ".aiddbot", "journals");
  if (!fs.existsSync(directory)) throw new Error("Journal directory is missing; run aiddbot init.");
  const events = [];
  for (const name of fs.readdirSync(directory).filter((entry) => /^\d{4}-\d{2}-\d{2}\.log$/.test(entry)).sort()) {
    for (const line of fs.readFileSync(path.join(directory, name), "utf8").split(/\r?\n/)) {
      if (!line || line.startsWith("#")) continue;
      const event = {
        date: name.slice(0, 10),
        time: line.slice(0, 8).trim(),
        status: line.slice(9, 15).trim(),
        spec: line.slice(23, 29).trim(),
        stage: line.slice(30, 38).trim(),
        event: line.slice(39, 47).trim().toLowerCase(),
        revision: line.slice(55, 58).trim(),
      };
      if (event.spec === specId && event.event === "evaluated" && ["verify", "qualify"].includes(event.stage)) {
        if (!/^\d+$/.test(event.revision) || !["Info", "Warn", "Error"].includes(event.status)) {
          throw new Error(`Invalid evaluation entry in ${name}: ${line}`);
        }
        events.push(event);
      }
    }
  }
  return events;
}

function latest(events, stage) {
  return events.filter((event) => event.stage === stage).at(-1) ?? null;
}

function requireQualificationEvidence(specDir, spec, verification) {
  const reportFile = path.join(specDir, REPORT_BY_KIND.verification);
  if (!verification) throw new Error("Qualification has no journaled verification evidence.");
  if (verification.status === "Info") {
    if (fs.existsSync(reportFile)) throw new Error("Green verification must have no report before qualification.");
  } else if (verification.status === "Error" && Number(verification.revision) >= 3) {
    if (!fs.existsSync(reportFile)) throw new Error("Red verification at revision 3 or later requires its current findings report.");
    const report = fs.readFileSync(reportFile, "utf8");
    const id = /^spec:\s*(S\d{4})\s*$/m.exec(report)?.[1];
    const status = /^status:\s*(green|amber|red)\s*$/m.exec(report)?.[1];
    const revision = /^revision:\s*(\d+)\s*$/m.exec(report)?.[1];
    if (id !== spec.fields.id || status !== "red" || revision !== verification.revision) {
      throw new Error("Red verification report does not match the latest revision 3+ journal event.");
    }
    validateFindingReport("verification", report);
  } else {
    throw new Error("Qualification requires green verification or red verification at revision 3 or later.");
  }

  if (spec.fields.verification_status !== undefined
      && (spec.fields.verification_status !== ({ Info: "green", Warn: "amber", Error: "red" })[verification.status]
        || spec.fields.verification_revision !== verification.revision)) {
    throw new Error("Spec verification signature does not match the latest journal event.");
  }
}

function atomicWrite(file, contents) {
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, contents, "utf8");
  fs.renameSync(temporary, file);
}

export function finalizeEvaluation(kind, argv) {
  if (!Object.hasOwn(SKILL_BY_KIND, kind)) fail(`Unknown evaluation kind: ${kind}`);
  if (argv.length !== 3) fail("Expected a spec directory, status, and one-line summary.");
  const [specInput, rawStatus, rawSummary] = argv;
  const status = rawStatus.toLowerCase();
  const summary = rawSummary.trim();
  if (!STATUS_LEVELS.has(status)) fail(`Invalid status: ${rawStatus}`);
  if (!summary || /[\r\n|]/.test(summary)) fail("Summary must be non-empty and contain no line breaks or |.");

  const root = repositoryRoot();
  if (!root) fail("Could not find the project root (.aiddbot and .git).");
  const specDir = path.resolve(root, specInput);
  const specFile = path.join(specDir, "spec.md");
  if (!fs.existsSync(specFile)) fail(`Spec file not found: ${specFile}`);
  const specText = fs.readFileSync(specFile, "utf8");
  const spec = parseSpecFrontmatter(specText);
  if (!/^S\d{4}$/.test(spec.fields.id) || spec.fields.key !== `${spec.fields.id}-${path.basename(specDir).slice(6)}`) {
    throw new Error("Spec ID, key, and directory do not agree.");
  }
  if (["draft", "shipped"].includes(spec.fields.status)) throw new Error(`Cannot evaluate a spec in ${spec.fields.status} state.`);

  const reportFile = path.join(specDir, REPORT_BY_KIND[kind]);
  const events = readEvaluations(root, spec.fields.id);
  const stage = STAGE_BY_KIND[kind];
  const prior = latest(events, stage);
  const revision = Number(prior?.revision ?? 0) + 1;
  if (revision > 999) throw new Error("Evaluation revision exceeds the journal's three-character revision field.");
  if (kind === "qualification") {
    const verification = latest(events, "verify");
    requireQualificationEvidence(specDir, spec, verification);
  }

  let report = null;
  if (status === "green") {
    if (fs.existsSync(reportFile) && !fs.statSync(reportFile).isFile()) throw new Error(`Report path is not a file: ${reportFile}`);
  } else {
    if (!fs.existsSync(reportFile)) throw new Error(`${status} evaluation requires a findings report at ${reportFile}`);
    report = fs.readFileSync(reportFile, "utf8");
    validateFindingReport(kind, report);
  }

  const at = new Date();
  const isoTime = at.toISOString();
  const commit = git(root, ["rev-parse", "HEAD"]);
  const prefix = kind === "verification" ? "verification" : "qualification";
  const overallStatus = kind === "verification"
    ? status === "green" ? "verified" : "in-progress"
    : status === "red" ? (latest(events, "verify")?.status === "Error" ? "in-progress" : "verified") : "qualified";
  const updates = {
    status: overallStatus,
    [`${prefix}_status`]: status,
    [`${prefix}_revision`]: revision,
    [`${prefix}_at`]: isoTime,
    [`${prefix}_commit`]: commit,
  };
  let nextSpec = setFields(specText, updates);
  nextSpec = nextSpec.replace(/^> last updated:.*$/m, `> last updated: ${isoTime}`);
  if (status !== "green") {
    const metadata = { spec: spec.fields.id, status, revision, evaluated_commit: commit, updated_at: isoTime };
    report = report.replaceAll("S0001-{slug}", spec.fields.key);
    report = setReportMetadata(report, metadata);
  }

  if (status === "green" && fs.existsSync(reportFile)) fs.rmSync(reportFile);
  else if (report !== null) atomicWrite(reportFile, report);
  atomicWrite(specFile, nextSpec);
  const journalScript = path.join(root, ".agents", "skills", "record-journal", "scripts", "append.mjs");
  execFileSync(process.execPath, [journalScript, SKILL_BY_KIND[kind], "evaluated", status, summary, "--spec", spec.fields.id, "--revision", String(revision)], { cwd: root, stdio: "inherit" });
  process.stdout.write(`${JSON.stringify({ spec: spec.fields.id, kind, status, revision, evaluated_at: isoTime, evaluated_commit: commit, overall_status: overallStatus }, null, 2)}\n`);
}
