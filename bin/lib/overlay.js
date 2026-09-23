import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadManifest, manifestText, payloadDigest, writeManifestAtomic } from "./manifest.js";

const here = path.dirname(fileURLToPath(import.meta.url));
export const sourceRoot = path.resolve(here, "../..");
export const TREES = [".agents/agents", ".agents/hooks", ".agents/rules", ".agents/skills", ".aiddbot/efforts.yaml", ".claude/agents", ".claude/settings.json", ".claude/skills", ".cursor/agents", ".cursor/hooks.json", ".codex/agents", ".codex/hooks.json", ".github/agents", ".github/hooks"];
export const ACTION_ORDER = ["create", "update", "remove", "skip-same", "conflict", "overwritten"];
const WRITE_ACTIONS = new Set(["create", "update", "overwritten"]);
export const MUTATING_ACTIONS = new Set(["create", "update", "remove", "overwritten"]);
const CLAUDE_SETTINGS = ".claude/settings.json";
const CLAUDE_HOOK_ARGS = ["${CLAUDE_PROJECT_DIR}/.agents/hooks/index.mjs", "ingest", "claude-code"];

const sha = (data) => `sha256:${crypto.createHash("sha256").update(data).digest("hex")}`;
function skip(rel) { return rel === ".claude/agents/runs" || rel.startsWith(".claude/agents/runs/") || rel.split("/").some((p) => p === ".git" || p === "node_modules"); }
function inside(child, parent) { const rel = path.relative(path.resolve(parent), path.resolve(child)); return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel)); }
function abs(root, rel) { return path.resolve(root, ...rel.split("/")); }
function safeFile(root, rel) { const target = abs(root, rel); if (!inside(target, root)) throw new Error(`Unsafe overlay path: ${rel}`); return target; }
function hasUnsafeAncestor(root, target) {
  const rootPath = path.resolve(root);
  const relative = path.relative(rootPath, target);
  let current = rootPath;
  try {
    const stat = fs.lstatSync(current);
    if (!stat.isDirectory() || stat.isSymbolicLink()) return true;
  } catch {
    return true;
  }
  for (const part of relative.split(path.sep).slice(0, -1)) {
    current = path.join(current, part);
    try {
      const stat = fs.lstatSync(current);
      if (!stat.isDirectory() || stat.isSymbolicLink()) return true;
    } catch (error) {
      if (error.code === "ENOENT") return false;
      return true;
    }
  }
  return false;
}

export function refuseOrigin(destRoot, command) {
  let same = false;
  try { same = fs.realpathSync(destRoot) === fs.realpathSync(sourceRoot); } catch { same = path.resolve(destRoot) === sourceRoot; }
  if (!inside(destRoot, sourceRoot) && !same) return false;
  process.stderr.write(`Refusing to ${command} inside the AIDDbot origin. Run it from the target project directory.\n`);
  return true;
}

export function sourceInventory(root = sourceRoot) {
  const files = {};
  const walk = (base, rel) => {
    if (skip(rel)) return;
    let stat; try { stat = fs.lstatSync(base); } catch { return; }
    if (stat.isFile()) { files[rel] = { digest: sha(fs.readFileSync(base)), source: base }; return; }
    if (!stat.isDirectory() || stat.isSymbolicLink()) return;
    for (const ent of fs.readdirSync(base, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const child = rel ? `${rel}/${ent.name}` : ent.name;
      if (ent.isFile() || ent.isDirectory()) walk(path.join(base, ent.name), child);
    }
  };
  for (const tree of TREES) walk(path.join(root, ...tree.split("/")), tree);
  return Object.fromEntries(Object.entries(files).sort(([a], [b]) => a.localeCompare(b)));
}

function destination(root, rel) {
  const target = safeFile(root, rel);
  if (hasUnsafeAncestor(root, target)) return { target, unsafe: true, stat: null, digest: null };
  try { const stat = fs.lstatSync(target); return { target, stat, digest: stat.isFile() && !stat.isSymbolicLink() ? sha(fs.readFileSync(target)) : null }; }
  catch (error) { if (error.code === "ENOENT") return { target, stat: null, digest: null }; throw error; }
}

function plainObject(value) { return value !== null && typeof value === "object" && !Array.isArray(value); }
function ownedClaudeHandler(value) {
  return plainObject(value) && value.command === "node" && Array.isArray(value.args) && value.args.length === 4 && typeof value.args[3] === "string" && CLAUDE_HOOK_ARGS.every((part, index) => value.args[index] === part);
}
function desiredClaudeHandlers(source) {
  if (!source) return {};
  const parsed = JSON.parse(fs.readFileSync(source, "utf8"));
  const desired = {};
  for (const [event, groups] of Object.entries(parsed.hooks ?? {})) {
    for (const group of groups) for (const handler of group.hooks ?? []) if (ownedClaudeHandler(handler)) desired[event] = handler;
  }
  return desired;
}
function removeOwnedClaudeHandlers(hooks) {
  for (const [event, groups] of Object.entries(hooks)) {
    if (!Array.isArray(groups)) continue;
    const kept = [];
    for (const group of groups) {
      if (!plainObject(group) || !Array.isArray(group.hooks)) { kept.push(group); continue; }
      const handlers = group.hooks.filter((handler) => !ownedClaudeHandler(handler));
      if (handlers.length || handlers.length === group.hooks.length) kept.push({ ...group, hooks: handlers });
    }
    if (kept.length) hooks[event] = kept;
    else delete hooks[event];
  }
}
function addClaudeHandler(hooks, event, handler) {
  if (!Array.isArray(hooks[event])) hooks[event] = [];
  let group = hooks[event].find((candidate) => plainObject(candidate) && !("matcher" in candidate) && Array.isArray(candidate.hooks));
  if (!group) { group = { hooks: [] }; hooks[event].push(group); }
  group.hooks.push(handler);
}
function reconcileClaudeSettings(destRoot, source, dryRun) {
  const target = safeFile(destRoot, CLAUDE_SETTINGS);
  if (hasUnsafeAncestor(destRoot, target)) return { row: { action: "conflict", file: CLAUDE_SETTINGS, source }, written: false };
  let current = {}, exists = false;
  try {
    const stat = fs.lstatSync(target);
    if (!stat.isFile() || stat.isSymbolicLink()) return { row: { action: "conflict", file: CLAUDE_SETTINGS, source }, written: false };
    current = JSON.parse(fs.readFileSync(target, "utf8")); exists = true;
  } catch (error) {
    if (error.code !== "ENOENT") return { row: { action: "conflict", file: CLAUDE_SETTINGS, source }, written: false };
  }
  if (!source && !exists) return { row: { action: "skip-same", file: CLAUDE_SETTINGS, source }, written: false };
  if (!plainObject(current) || (current.hooks !== undefined && !plainObject(current.hooks))) return { row: { action: "conflict", file: CLAUDE_SETTINGS, source }, written: false };
  const next = structuredClone(current);
  const hooks = next.hooks ?? {};
  removeOwnedClaudeHandlers(hooks);
  for (const [event, handler] of Object.entries(desiredClaudeHandlers(source))) addClaudeHandler(hooks, event, handler);
  if (Object.keys(hooks).length || next.hooks !== undefined || source) next.hooks = hooks;
  const rendered = `${JSON.stringify(next, null, 2)}\n`;
  const previous = exists ? fs.readFileSync(target, "utf8") : null;
  if (previous === rendered) return { row: { action: "skip-same", file: CLAUDE_SETTINGS, source }, written: false };
  const action = exists ? "update" : "create";
  if (!dryRun) { fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, rendered, "utf8"); }
  return { row: { action, file: CLAUDE_SETTINGS, source }, written: true };
}

export function reconcile(destRoot, inventory, oldManifest, force = false) {
  const old = oldManifest?.files ?? {};
  const paths = [...new Set([...Object.keys(old), ...Object.keys(inventory)])].sort();
  const rows = [], files = {};
  for (const file of paths) {
    const next = inventory[file]?.digest, prior = old[file], current = destination(destRoot, file);
    let action;
    if (current.unsafe) {
      action = "conflict";
      if (prior) files[file] = prior;
    } else if (!next) {
      if (!current.stat) action = "skip-same";
      else if (!current.stat.isFile() || current.stat.isSymbolicLink()) { action = "conflict"; files[file] = prior; }
      else if (current.digest === prior || force) action = "remove";
      else { action = "conflict"; files[file] = prior; }
    } else if (!current.stat) { action = "create"; files[file] = next; }
    else if (!current.stat.isFile() || current.stat.isSymbolicLink()) { action = "conflict"; if (prior) files[file] = prior; }
    else if (current.digest === next) { action = "skip-same"; files[file] = next; }
    else if (prior && current.digest === prior) { action = "update"; files[file] = next; }
    else if (force) { action = "overwritten"; files[file] = next; }
    else { action = "conflict"; if (prior) files[file] = prior; }
    rows.push({ action, file, source: inventory[file]?.source });
  }
  return { rows, manifest: { schemaVersion: 1, packageVersion: "0.0.0", payloadDigest: payloadDigest(inventory), files: Object.fromEntries(Object.entries(files).sort(([a], [b]) => a.localeCompare(b))) } };
}

function printInventory(rows) {
  const counts = Object.fromEntries(ACTION_ORDER.map((key) => [key, 0]));
  for (const row of rows) { counts[row.action]++; process.stdout.write(`${row.action.padEnd(11)} ${row.file}\n`); }
  process.stdout.write(`# ${Object.entries(counts).map(([key, count]) => `${key} ${count}`).join("  ")}\n`);
  return counts;
}
function removeEmptyParents(root, target) { for (let dir = path.dirname(target); inside(dir, root) && dir !== path.resolve(root); dir = path.dirname(dir)) { try { fs.rmdirSync(dir); } catch { break; } } }
function apply(root, plan) { for (const row of plan.rows) { if (row.file === CLAUDE_SETTINGS) continue; const target = safeFile(root, row.file); if (WRITE_ACTIONS.has(row.action)) { fs.mkdirSync(path.dirname(target), { recursive: true }); fs.copyFileSync(row.source, target); } else if (row.action === "remove") { fs.unlinkSync(target); removeEmptyParents(root, target); } } }

export function runOverlay(destRoot, { dryRun = false, force = false, inventory = sourceInventory() } = {}) {
  let oldManifest;
  try { oldManifest = loadManifest(destRoot); } catch (error) { process.stderr.write(`Invalid AIDDbot manifest: ${error.message}\n`); return { conflicts: true, fatal: true, written: [], rows: [] }; }
  const claudeSettings = inventory[CLAUDE_SETTINGS];
  const { [CLAUDE_SETTINGS]: _claudeSettings, ...managedInventory } = inventory;
  const plan = reconcile(destRoot, managedInventory, oldManifest, force);
  const settings = reconcileClaudeSettings(destRoot, claudeSettings?.source, dryRun);
  plan.rows.push(settings.row);
  plan.rows.sort((a, b) => a.file.localeCompare(b.file));
  const counts = printInventory(plan.rows);
  const metadata = ".aiddbot/manifest.json", manifestPath = safeFile(destRoot, metadata), desired = manifestText(plan.manifest);
  if (fs.existsSync(manifestPath)) { const stat = fs.lstatSync(manifestPath); if (!stat.isFile() || stat.isSymbolicLink()) { process.stderr.write("Invalid AIDDbot manifest: manifest target is unsafe\n"); return { conflicts: true, fatal: true, written: [], rows: plan.rows }; } }
  const metadataChanged = !fs.existsSync(manifestPath) || !fs.lstatSync(manifestPath).isFile() || fs.readFileSync(manifestPath, "utf8") !== desired;
  try { if (!dryRun) { apply(destRoot, plan); if (metadataChanged) writeManifestAtomic(destRoot, plan.manifest); } } catch (error) { process.stderr.write(`AIDDbot reconciliation warning: ${error.message}\n`); return { conflicts: true, fatal: true, written: [], rows: plan.rows }; }
  const written = plan.rows.filter((r) => MUTATING_ACTIONS.has(r.action)).map((r) => r.file);
  if (metadataChanged) written.push(metadata);
  return { conflicts: counts.conflict, written, rows: plan.rows };
}
