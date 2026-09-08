#!/usr/bin/env node
import path from "node:path";
import { commitFiles, ensureGit } from "./lib/git.js";
import { refuseOrigin, runOverlay, sourceRoot } from "./lib/overlay.js";
import { ensureSeedFiles } from "./lib/seed.js";

function help() { process.stderr.write("Usage: npx --allow-git=all github:AIDDbot/AIDDbot [init|update] [--dry-run] [--force]\ninit (the default) initializes Git, seed files, and the overlay. update reconciles only owned overlay files. Existing differing files are preserved unless --force is supplied.\n"); }
function parse(argv) { const opts = { dryRun: false, force: false }, words = []; for (const arg of argv) { if (arg === "--dry-run") opts.dryRun = true; else if (arg === "--force") opts.force = true; else if (arg.startsWith("-")) return { error: `Unknown flag: ${arg}` }; else words.push(arg); } if (words.length > 1 || (words[0] && !["init", "update"].includes(words[0]))) return { error: `Unknown argument: ${words.join(" ")}` }; return { opts, command: words[0] || "init" }; }
function countActions(rows) {
  const counts = { create: 0, update: 0, remove: 0, overwritten: 0, "skip-same": 0, conflict: 0 };
  for (const row of rows) if (counts[row.action] !== undefined) counts[row.action]++;
  return counts;
}
function printFinalSummary({ command, dryRun, force, destRoot, seeded, result }) {
  const counts = countActions(result.rows || []);
  const mode = dryRun ? "DRY-RUN" : "APPLY";
  const platform = `${process.platform}/${process.arch}`;
  const runtime = `node ${process.versions.node}`;
  const changed = (seeded?.length || 0) + (result?.written?.length || 0);
  process.stdout.write("\n=== AIDDbot summary ===\n");
  process.stdout.write(`command    ${command}\n`);
  process.stdout.write(`mode       ${mode}${force ? " (force)" : ""}\n`);
  process.stdout.write(`platform   ${platform}\n`);
  process.stdout.write(`runtime    ${runtime}\n`);
  process.stdout.write(`project    ${destRoot}\n`);
  process.stdout.write(`overlay    create ${counts.create}  update ${counts.update}  remove ${counts.remove}  overwrite ${counts.overwritten}  conflict ${counts.conflict}\n`);
  process.stdout.write(`seed       ${seeded?.length || 0}\n`);
  process.stdout.write(`changed    ${changed}\n`);
  process.stdout.write(`status     ${counts.conflict ? "completed with conflicts" : "completed"}\n`);
  process.stdout.write("next       run /architect-solution-foundation\n");
}
const parsed = parse(process.argv.slice(2));
if (parsed.error) { process.stderr.write(`${parsed.error}\n`); help(); process.exit(1); }
const destRoot = path.resolve(process.cwd());
if (refuseOrigin(destRoot, parsed.command)) process.exit(1);
process.stdout.write(`source     ${sourceRoot}\ndest       ${destRoot}\n`);
let seeded = [];
if (parsed.command === "init") { ensureGit(destRoot, parsed.opts.dryRun); seeded = ensureSeedFiles(destRoot, parsed.opts.dryRun); }
const result = runOverlay(destRoot, parsed.opts);
if (result.fatal) process.exit(1);
const changed = [...seeded, ...result.written];
commitFiles(destRoot, changed, parsed.command === "init" ? "chore: add AIDDbot overlay" : "chore: update AIDDbot overlay", parsed.opts.dryRun);
printFinalSummary({ command: parsed.command, dryRun: parsed.opts.dryRun, force: parsed.opts.force, destRoot, seeded, result });
process.exit(result.conflicts ? 2 : 0);
