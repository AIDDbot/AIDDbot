#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import { repositoryRoot, readSpec } from "./preflight/spec.mjs";
import { readJournalEvents, latest } from "./preflight/journal.mjs";
import { reportEvidence } from "./preflight/reports.mjs";
import { evaluateEvidence } from "./preflight/result.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));

function main(argv) {
  if (argv.length !== 1) throw new Error("Expected exactly one spec ID or spec directory.");
  const root = repositoryRoot(HERE) ?? repositoryRoot(process.cwd());
  if (!root) throw new Error("Could not find repository root (.aiddbot and .product).");
  const spec = readSpec(root, argv[0]);
  const events = readJournalEvents(root, spec.id);
  const verification = latest(events, "verify");
  const qualification = latest(events, "qualify");
  const result = evaluateEvidence(root, spec, verification, qualification,
    reportEvidence(spec.dir, "verify", verification, spec.signatures.verification),
    reportEvidence(spec.dir, "qualify", qualification, spec.signatures.qualification));
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exitCode = result.eligible ? 0 : 1;
}

try { main(process.argv.slice(2)); }
catch (error) {
  process.stderr.write(`${error.message}\nUsage: node preflight.mjs <spec-id-or-spec-directory>\n`);
  process.exitCode = 2;
}
