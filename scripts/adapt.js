#!/usr/bin/env node
// Deterministic harness-adapter generator. Agent prompts live in `.agents/`;
// `.aiddbot/agents.yaml` owns their metadata, model tiers, and destinations (see bin/lib/agents.js).
// This script renders managed adapters. Run with --check to compare without writing.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadAgentTable, loadAgents, renderAllAdapters } from "../bin/lib/agents.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const MARKER_TEXT = "managed by /adapt";
const markerMd = (source) => `<!-- managed by /adapt — do not edit here, edit ${source} instead -->`;
const markerToml = (source) => `# managed by /adapt — do not edit here, edit ${source} instead`;
const report = { created: [], updated: [], unchanged: [], deleted: [], collisions: [], skippedSources: [] };
const rel = (file) => path.relative(root, file).split(path.sep).join("/");

// ---------- generic file IO ----------

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

function isManaged(content) {
  return typeof content === "string" && content.includes(MARKER_TEXT);
}

/** Write a managed file only when content differs; report the action. Never touch an unmarked collision. */
function reconcile(file, content) {
  const current = read(file);
  if (current === content) { report.unchanged.push(rel(file)); return; }
  if (current !== null && !isManaged(current)) { report.collisions.push(rel(file)); return; }
  const action = current === null ? "created" : "updated";
  if (!check) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content, "utf8"); }
  report[action].push(rel(file));
}

/** Delete a managed file whose source disappeared; report unmarked survivors as collisions instead. */
function deleteIfStale(file) {
  const current = read(file);
  if (current === null) return;
  if (!isManaged(current)) { report.collisions.push(rel(file)); return; }
  if (!check) fs.rmSync(file);
  report.deleted.push(rel(file));
  const dir = path.dirname(file);
  if (!check && fs.existsSync(dir) && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
}

/** Reconcile every file in `dir` against `desired` (Map filename -> content): write what's wanted, delete managed leftovers. */
function syncFlatDir(dir, desired) {
  for (const [name, content] of desired) reconcile(path.join(dir, name), content);
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    if (desired.has(entry)) continue;
    deleteIfStale(path.join(dir, entry));
  }
}

// ---------- minimal frontmatter parsing (flat keys + one nested map) ----------

function unquote(value) {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^".*"$/.test(trimmed) || /^'.*'$/.test(trimmed)) return trimmed.slice(1, -1);
  return trimmed;
}

function parseFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return null;
  const data = {};
  let mapKey = null;
  for (const line of match[1].split(/\r?\n/)) {
    if (line === "") continue;
    const nested = /^ {2}([\w.-]+):\s*(.*)$/.exec(line);
    const top = /^([\w.-]+):\s*(.*)$/.exec(line);
    if (nested && mapKey) { data[mapKey] ??= {}; data[mapKey][nested[1]] = unquote(nested[2]); }
    else if (top) { const [, key, value] = top; if (value === "") { data[key] = {}; mapKey = key; } else { data[key] = unquote(value); mapKey = null; } }
  }
  return data;
}

// ---------- skills ----------

function loadSkills() {
  const skillsRoot = path.join(root, ".agents", "skills");
  const valid = [];
  for (const entry of fs.readdirSync(skillsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(skillsRoot, entry.name, "SKILL.md");
    if (!fs.existsSync(file)) continue;
    const data = parseFrontmatter(read(file)) ?? {};
    const kind = data.metadata?.["aiddbot-kind"];
    const problems = [];
    if (data.name !== entry.name) problems.push(`name (${data.name}) must match directory (${entry.name})`);
    if (!data.description) problems.push("missing description");
    if (kind !== "orchestrator" && kind !== "primitive") problems.push(`metadata.aiddbot-kind must be orchestrator or primitive, got ${kind}`);
    if (data["user-invocable"] !== true) problems.push("user-invocable must be true");
    if (problems.length) { report.skippedSources.push(`skill ${entry.name}: ${problems.join("; ")}`); continue; }
    valid.push({ name: entry.name, kind, description: data.description, argumentHint: data["argument-hint"], allowedTools: data["allowed-tools"], sourcePath: `.agents/skills/${entry.name}/SKILL.md` });
  }
  return valid.sort((a, b) => a.name.localeCompare(b.name));
}

function renderClaudeSkillPointer(skill) {
  const lines = ["---", `name: ${skill.name}`, `description: ${skill.description}`, "metadata:", `  aiddbot-kind: ${skill.kind}`, "user-invocable: true"];
  if (skill.argumentHint) lines.push(`argument-hint: ${skill.argumentHint}`);
  if (skill.allowedTools) lines.push(`allowed-tools: ${skill.allowedTools}`);
  lines.push("---", markerMd(skill.sourcePath), "", `Read and follow [the canonical ${skill.name} skill](../../../${skill.sourcePath}).`);
  return `${lines.join("\n")}\n`;
}

function syncSkills(skills) {
  const dir = path.join(root, ".claude", "skills");
  // Each skill owns its own directory; desired keys are "{name}/SKILL.md" so
  // syncFlatDir's readdir-based cleanup still needs a directory-aware pass.
  for (const skill of skills) reconcile(path.join(dir, skill.name, "SKILL.md"), renderClaudeSkillPointer(skill));
  if (!fs.existsSync(dir)) return;
  const wanted = new Set(skills.map((skill) => skill.name));
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || wanted.has(entry.name)) continue;
    deleteIfStale(path.join(dir, entry.name, "SKILL.md"));
  }
}

// ---------- agents ----------

function syncAgents(table) {
  const desiredByDirectory = new Map();
  for (const [relative, content] of renderAllAdapters(root, table)) {
    const destination = path.resolve(root, ...relative.split("/"));
    const directory = path.dirname(destination);
    if (!desiredByDirectory.has(directory)) desiredByDirectory.set(directory, new Map());
    desiredByDirectory.get(directory).set(path.basename(destination), content);
  }
  for (const [directory, desired] of desiredByDirectory) syncFlatDir(directory, desired);
}
// ---------- run ----------

const skills = loadSkills();
let table, agents;
try { table = loadAgentTable(root); agents = loadAgents(root, table); }
catch (error) { process.stderr.write(`${error.message}
`); process.exit(1); }

syncSkills(skills);
syncAgents(table);

const publicSkills = skills.filter((skill) => skill.kind === "orchestrator" || skill.kind === "primitive").length;
process.stdout.write([
  `${check ? "check" : "apply"}  skills ${skills.length} (public ${publicSkills})  agents ${agents.length}`,
  `created ${report.created.length}  updated ${report.updated.length}  unchanged ${report.unchanged.length}  deleted ${report.deleted.length}  collisions ${report.collisions.length}`,
  ...report.created.map((file) => `  + ${file}`),
  ...report.updated.map((file) => `  ~ ${file}`),
  ...report.deleted.map((file) => `  - ${file}`),
  ...report.collisions.map((file) => `  ! collision, left untouched: ${file}`),
  ...report.skippedSources.map((line) => `  · ${line}`),
].join("\n") + "\n");

if (report.collisions.length > 0) process.exit(1);
if (check && (report.created.length || report.updated.length || report.deleted.length)) process.exit(1);
process.exit(0);
