#!/usr/bin/env node
// Validate the journaled verification and qualification evidence before shipping.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));

function fail(message) {
  process.stderr.write(`${message}\nUsage: node preflight.mjs <spec-id-or-spec-directory>\n`);
  process.exit(2);
}

function repositoryRoot(start) {
  let current = path.resolve(start);
  while (true) {
    if (fs.existsSync(path.join(current, ".aiddbot")) && fs.existsSync(path.join(current, ".product"))) return current;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

function readSpec(root, input) {
  const specsRoot = path.join(root, ".product", "specs");
  let specDir = path.isAbsolute(input) || fs.existsSync(path.resolve(input))
    ? path.resolve(input)
    : path.join(specsRoot, input);
  if (!path.isAbsolute(input) && /^S\d{4}$/.test(input) && fs.existsSync(specsRoot)) {
    const match = fs.readdirSync(specsRoot, { withFileTypes: true })
      .find((entry) => entry.isDirectory() && entry.name.startsWith(`${input}-`));
    if (match) specDir = path.join(specsRoot, match.name);
  }
  if (!fs.existsSync(specDir)) fail(`Spec directory not found: ${specDir}`);
  const specFile = fs.statSync(specDir).isDirectory() ? path.join(specDir, "spec.md") : specDir;
  if (!fs.existsSync(specFile)) fail(`Spec file not found: ${specFile}`);
  const content = fs.readFileSync(specFile, "utf8");
  const id = /^id:\s*(S\d{4})\s*$/m.exec(content)?.[1]
    ?? /\b(S\d{4})\b/.exec(path.basename(path.dirname(specFile)))?.[1];
  if (!id) fail(`Could not determine spec ID from ${specFile}`);
  return { id, dir: path.dirname(specFile), file: specFile };
}

function journalFiles(root) {
  const directory = path.join(root, ".aiddbot", "journals");
  if (!fs.existsSync(directory)) fail(`Journal directory missing: ${directory}`);
  return fs.readdirSync(directory)
    .filter((name) => /^\d{4}-\d{2}-\d{2}\.log$/.test(name))
    .sort()
    .map((name) => ({ date: name.slice(0, 10), file: path.join(directory, name) }));
}

function readJournalEvents(root, specId) {
  const events = [];
  // The journal uses fixed-width cells; these offsets are owned by record-journal/scripts/append.mjs.
  for (const { date, file } of journalFiles(root)) {
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
    for (const line of lines) {
      if (!line || line.startsWith("#")) continue;
      const event = {
        date,
        time: line.slice(0, 8).trim(),
        status: line.slice(9, 15).trim().toLowerCase(),
        spec: line.slice(23, 29).trim(),
        stage: line.slice(30, 38).trim(),
        name: line.slice(39, 47).trim().toLowerCase(),
        revision: line.slice(55, 58).trim(),
        summary: line.slice(59).trim(),
      };
      if (event.spec === specId && event.name === "evaluated" && ["verify", "qualify"].includes(event.stage)) {
        if (!["green", "amber", "red"].includes(event.status)) fail(`Invalid status in ${file}: ${line}`);
        if (!/^\d+$/.test(event.revision)) fail(`Evaluation has no numeric revision in ${file}: ${line}`);
        events.push(event);
      }
    }
  }
  return events;
}

function latest(events, stage) {
  // Files are read in date order and lines in append order; journal order is canonical.
  return events.filter((event) => event.stage === stage).at(-1) ?? null;
}

function reportEvidence(specDir, kind, evaluation) {
  const file = path.join(specDir, `${kind === "verify" ? "verification" : "qualification"}.md`);
  if (!evaluation) return { ok: false, file, reason: `No journaled ${kind} evaluation` };
  if (evaluation.status === "green") {
    return fs.existsSync(file)
      ? { ok: false, file, reason: `Green ${kind} requires the report to be absent` }
      : { ok: true, file, reason: "green evaluation; report absent" };
  }
  if (!fs.existsSync(file)) return { ok: false, file, reason: `${evaluation.status} ${kind} requires a finding-only report` };
  const report = fs.readFileSync(file, "utf8");
  const reportId = /^spec:\s*(S\d{4})\s*$/m.exec(report)?.[1];
  const status = /^status:\s*(green|amber|red)\s*$/m.exec(report)?.[1];
  const revision = /^revision:\s*(\d+)\s*$/m.exec(report)?.[1];
  if (reportId !== evaluation.spec || status !== evaluation.status || revision !== evaluation.revision) {
    return { ok: false, file, reason: `Report metadata (${reportId ?? "missing"}/${status ?? "missing"}/${revision ?? "missing"}) does not match journal (${evaluation.spec}/${evaluation.status}/${evaluation.revision})` };
  }
  return { ok: true, file, reason: `report matches ${evaluation.status} revision ${evaluation.revision}` };
}

function main(argv) {
  if (argv.length !== 1) fail("Expected exactly one spec ID or spec directory.");
  const root = repositoryRoot(SCRIPT_DIR) ?? repositoryRoot(process.cwd());
  if (!root) fail("Could not find repository root (.aiddbot and .product) from the script or current directory.");
  const spec = readSpec(root, argv[0]);
  const events = readJournalEvents(root, spec.id);
  const verification = latest(events, "verify");
  const qualification = latest(events, "qualify");
  const verificationEvidence = reportEvidence(spec.dir, "verify", verification);
  const qualificationEvidence = reportEvidence(spec.dir, "qualify", qualification);
  const reportsValid = verificationEvidence.ok && qualificationEvidence.ok;
  const eligible = reportsValid && (
    verification.status === "green" && ["green", "amber"].includes(qualification.status)
    || verification.status === "red" && Number(verification.revision) >= 3
  );
  const result = {
    spec: spec.id,
    specFile: path.relative(root, spec.file),
    verification: verification && { status: verification.status, revision: Number(verification.revision), date: verification.date, time: verification.time },
    qualification: qualification && { status: qualification.status, revision: Number(qualification.revision), date: qualification.date, time: qualification.time },
    evidence: { verification: verificationEvidence, qualification: qualificationEvidence },
    eligible,
    blockers: [
      ...(!verificationEvidence.ok ? [`Verification: ${verificationEvidence.reason}`] : []),
      ...(!qualificationEvidence.ok ? [`Qualification: ${qualificationEvidence.reason}`] : []),
      ...(reportsValid && !eligible ? ["Shipping requires green verification with green or amber qualification, or red verification at revision 3 or later with completed qualification evidence."] : []),
    ],
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exitCode = eligible ? 0 : 1;
}

main(process.argv.slice(2));
