#!/usr/bin/env node
// Deterministic harness-adapter generator. `.agents/` is the only canonical
// source; this script renders thin, marked pointers for Claude Code, Cursor,
// GitHub Copilot, and Codex, and wires the shared audit hook into each
// harness's own hook config. Run with --check to compare without writing;
// release.js runs that mode and aborts the release on drift.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const MARKER_TEXT = "managed by /adapt";
const markerMd = (source) => `<!-- managed by /adapt — do not edit here, edit ${source} instead -->`;
const markerToml = (source) => `# managed by /adapt — do not edit here, edit ${source} instead`;
const HOOK_EVENTS = ["SessionStart", "SessionEnd", "SubagentStart", "SubagentStop", "UserPromptSubmit", "Stop"];

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

function loadAgents() {
  const agentsRoot = path.join(root, ".agents", "agents");
  const valid = [];
  if (!fs.existsSync(agentsRoot)) return valid;
  for (const entry of fs.readdirSync(agentsRoot)) {
    if (!entry.endsWith(".md")) continue;
    const file = path.join(agentsRoot, entry);
    const data = parseFrontmatter(read(file)) ?? {};
    if (!data.name || !data.description) { report.skippedSources.push(`agent ${entry}: missing name or description`); continue; }
    valid.push({ file: entry.replace(/\.md$/, ""), name: data.name, description: data.description, sourcePath: `.agents/agents/${entry}` });
  }
  return valid.sort((a, b) => a.file.localeCompare(b.file));
}

function syncAgents(agents) {
  syncFlatDir(path.join(root, ".claude", "agents"), new Map(agents.map((agent) => [`${agent.file}.md`,
    `---\nname: ${agent.name}\ndescription: ${agent.description}\nmodel: inherit\n---\n${markerMd(agent.sourcePath)}\nAdopt the role, expertise, and instructions defined in @${agent.sourcePath} and follow them for this task.\n`])));
  syncFlatDir(path.join(root, ".cursor", "agents"), new Map(agents.map((agent) => [`${agent.file}.md`,
    `---\nname: ${agent.name}\ndescription: ${agent.description}\nmodel: inherit\n---\n${markerMd(agent.sourcePath)}\nAdopt the role, expertise, and instructions defined in \`${agent.sourcePath}\` and follow them for this task.\n`])));
  syncFlatDir(path.join(root, ".github", "agents"), new Map(agents.map((agent) => [`${agent.file}.agent.md`,
    `---\nname: ${agent.name}\ndescription: ${agent.description}\n---\n${markerMd(agent.sourcePath)}\nAdopt the role and instructions defined in [${agent.sourcePath}](../../${agent.sourcePath}) for this task.\n`])));
  syncFlatDir(path.join(root, ".codex", "agents"), new Map(agents.map((agent) => [`${agent.file}.toml`,
    `${markerToml(agent.sourcePath)}\nname = "${agent.name}"\ndescription = "${agent.description}"\ndeveloper_instructions = """Adopt the role, expertise, and instructions defined in ${agent.sourcePath} and follow them for this task."""\n`])));
}

// ---------- audit hook ----------

const CODEX_HOOKS_DESCRIPTION = "managed by /adapt — do not edit here, edit .agents/hooks/index.mjs instead";

function renderCodexHooks() {
  const events = HOOK_EVENTS.map((event) => `    "${event}": [{ "matcher": "*", "hooks": [{ "type": "command", "command": "node .agents/hooks/index.mjs ingest codex ${event}" }] }]`).join(",\n");
  return `{\n  "description": "${CODEX_HOOKS_DESCRIPTION}",\n  "hooks": {\n${events}\n  }\n}\n`;
}

function syncCodexHooks(hookExists) {
  const file = path.join(root, ".codex", "hooks.json");
  const current = read(file);
  const currentlyOwned = current !== null && (() => { try { return JSON.parse(current).description === CODEX_HOOKS_DESCRIPTION; } catch { return false; } })();
  if (current !== null && !currentlyOwned) { report.collisions.push(rel(file)); return; }
  if (!hookExists) { if (current !== null) deleteIfStale(file); return; }
  reconcile(file, renderCodexHooks());
}

function isOwnedClaudeHandler(handler, event) {
  return handler?.type === "command" && handler?.command === "node" && Array.isArray(handler?.args)
    && handler.args[0] === "${CLAUDE_PROJECT_DIR}/.agents/hooks/index.mjs" && handler.args[1] === "ingest" && handler.args[2] === "claude-code" && handler.args[3] === event;
}

function ownedClaudeArgs(event) {
  return ["${CLAUDE_PROJECT_DIR}/.agents/hooks/index.mjs", "ingest", "claude-code", event];
}

function syncClaudeSettings(hookExists) {
  const file = path.join(root, ".claude", "settings.json");
  const current = read(file);
  let settings;
  try { settings = current === null ? {} : JSON.parse(current); }
  catch { report.collisions.push(rel(file)); return; }
  if (typeof settings.hooks !== "object" || settings.hooks === null || Array.isArray(settings.hooks)) {
    if (current !== null && settings.hooks !== undefined) { report.collisions.push(rel(file)); return; }
    settings.hooks = {};
  }
  for (const event of HOOK_EVENTS) {
    const groups = Array.isArray(settings.hooks[event]) ? settings.hooks[event] : [];
    const matcherless = groups.filter((group) => group && group.matcher === undefined && Array.isArray(group.hooks));
    const others = groups.filter((group) => !matcherless.includes(group));
    for (const group of matcherless) group.hooks = group.hooks.filter((handler) => !isOwnedClaudeHandler(handler, event));
    const target = hookExists ? (matcherless.find((group) => group.hooks.length === 0) ?? matcherless[0] ?? { hooks: [] }) : null;
    if (hookExists) {
      if (!matcherless.includes(target)) matcherless.push(target);
      target.hooks.push({ type: "command", command: "node", args: ownedClaudeArgs(event) });
    }
    const kept = matcherless.filter((group) => group.hooks.length > 0);
    settings.hooks[event] = [...others, ...kept];
    if (settings.hooks[event].length === 0) delete settings.hooks[event];
  }
  // Ownership here is structural (the specific handler shape), never a
  // marker: JSON cannot carry the "managed by /adapt" comment, and this file
  // is explicitly a shared settings file, not an owned adapter (see the
  // source contract). Write straight through instead of going via
  // reconcile()'s marker-collision gate, which would misfire on every file
  // that isn't byte-identical yet.
  const rendered = `${JSON.stringify(settings, null, 2)}\n`;
  if (current === rendered) { report.unchanged.push(rel(file)); return; }
  const action = current === null ? "created" : "updated";
  if (!check) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, rendered, "utf8"); }
  report[action].push(rel(file));
}

function checkThirdPartyHook(file, harness) {
  const current = read(path.join(root, ...file.split("/")));
  const wired = current !== null && current.includes(`index.mjs ingest ${harness}`);
  report.skippedSources.push(`${file}: ${current === null ? "absent, not synthesized" : wired ? "wired to the shared audit source" : "present but not wired to .agents/hooks/index.mjs"}`);
}

// ---------- shared AGENTS.md sections ----------

// This repository's own AGENTS.md carries sections whose only source is the
// consumer template, so they are copied, never edited by hand.
const SHARED_SECTIONS = ["## Delegation"];
const AGENTS_TEMPLATE = path.join(root, ".agents", "skills", "document-system", "assets", "AGENTS.template.md");

function sectionBody(text, heading) {
  const start = text.indexOf(`${heading}\n`);
  if (start < 0) return null;
  const from = start + heading.length + 1;
  const next = text.indexOf("\n## ", from);
  return { from, to: next < 0 ? text.length : next + 1, body: text.slice(from, next < 0 ? text.length : next + 1) };
}

function syncSharedSections() {
  const file = path.join(root, "AGENTS.md");
  const current = read(file)?.replace(/\r\n/g, "\n");
  const template = read(AGENTS_TEMPLATE)?.replace(/\r\n/g, "\n");
  if (!current || !template) return;
  let next = current;
  for (const heading of SHARED_SECTIONS) {
    const source = sectionBody(template, heading);
    const target = sectionBody(next, heading);
    if (!source || !target) { report.collisions.push(`${rel(file)} (${heading} missing)`); continue; }
    const isLast = target.to === next.length;
    next = next.slice(0, target.from) + source.body.trimEnd() + (isLast ? "\n" : "\n\n") + next.slice(target.to);
  }
  if (next === current) { report.unchanged.push(rel(file)); return; }
  if (!check) fs.writeFileSync(file, next, "utf8");
  report.updated.push(rel(file));
}

// ---------- run ----------

const skills = loadSkills();
const agents = loadAgents();
const hookExists = fs.existsSync(path.join(root, ".agents", "hooks", "index.mjs"));

syncSkills(skills);
syncAgents(agents);
syncCodexHooks(hookExists);
syncClaudeSettings(hookExists);
syncSharedSections();
checkThirdPartyHook(".cursor/hooks.json", "cursor");
checkThirdPartyHook(".github/hooks/ingest.json", "copilot");

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
