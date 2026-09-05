#!/usr/bin/env node
import path from "node:path";
import { sourceRoot, refuseOrigin, runOverlay } from "./lib/overlay.js";
import { ensureGit, commitFiles } from "./lib/git.js";
import { ensureSeedFiles } from "./lib/seed.js";

function help() { process.stderr.write("Usage: npx --allow-git=all github:AIDDbot/AIDDbot [init|update] [--dry-run] [--force]\ninit (the default) initializes Git, seed files, and the overlay. update reconciles only owned overlay files. Existing differing files are preserved unless --force is supplied.\n"); }
function parse(argv) { const opts = { dryRun: false, force: false }, words = []; for (const arg of argv) { if (arg === "--dry-run") opts.dryRun = true; else if (arg === "--force") opts.force = true; else if (arg.startsWith("-")) return { error: `Unknown flag: ${arg}` }; else words.push(arg); } if (words.length > 1 || (words[0] && !["init", "update"].includes(words[0]))) return { error: `Unknown argument: ${words.join(" ")}` }; return { opts, command: words[0] || "init" }; }
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
process.exit(result.conflicts ? 2 : 0);
