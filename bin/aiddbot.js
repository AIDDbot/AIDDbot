#!/usr/bin/env node
"use strict";

const path = require("node:path");
const { sourceRoot, refuseOrigin, runOverlay } = require("./lib/overlay");
const { ensureGit, commitFiles } = require("./lib/git");
const { ensureSeedFiles } = require("./lib/seed");

function help() {
  process.stderr.write(
    "Usage: npx --allow-git=all github:AIDDbot/AIDDbot init [--dry-run] [--force]\nCopies AIDDbot skills and harness adapters into the current directory. Existing files are left alone unless they match (skipped) or you pass --force. Runs git init if needed, writes a basic .gitignore (temp and secrets) and README.md when missing, and commits the overlay.\n"
  );
}

function parseArgs(argv) {
  const opts = { dryRun: false, force: false };
  const positionals = [];
  for (const arg of argv) {
    if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--force") opts.force = true;
    else if (arg.startsWith("-")) return { error: `Unknown flag: ${arg}` };
    else positionals.push(arg);
  }
  if (positionals.length && positionals[0] !== "init") {
    return { error: `Unknown argument: ${positionals.join(" ")}` };
  }
  if (positionals.length > 1) return { error: `Unexpected extra arguments: ${positionals.slice(1).join(" ")}` };
  return { opts };
}

const parsed = parseArgs(process.argv.slice(2));
if (parsed.error) {
  process.stderr.write(`${parsed.error}\n`);
  help();
  process.exit(1);
}

const destRoot = path.resolve(process.cwd());
if (refuseOrigin(destRoot, "init")) process.exit(1);

process.stdout.write(`source     ${sourceRoot}\n`);
process.stdout.write(`dest       ${destRoot}\n`);
ensureGit(destRoot, parsed.opts.dryRun);
const seeded = ensureSeedFiles(destRoot, parsed.opts.dryRun);
const { conflicts, written } = runOverlay(destRoot, parsed.opts);
commitFiles(destRoot, [...seeded, ...written], "chore: add AIDDbot overlay", parsed.opts.dryRun);
process.exit(conflicts ? 2 : 0);
