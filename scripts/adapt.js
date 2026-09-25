#!/usr/bin/env node
// Deterministic harness-adapter generator. Agent prompts live in `.agents/`;
// `.aiddbot/agents.yaml` owns their metadata, harness settings, and destinations.
// This script renders managed adapters and wires the shared audit hook into
// harness hook configs. Run with --check to compare without writing.
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

const HARNESS_NAMES = ["claude-code", "codex", "copilot", "cursor"];

// The checked-in table uses a small nested YAML subset: mappings, quoted
// strings, booleans, and JSON-compatible inline arrays.
function parseAgentTable(text) {
  const document = {};
  const stack = [{ indent: -1, node: document }];
  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    const line = raw.replace(/\s+#.*$/, "").trimEnd();
    if (!line.trim() || /^\s*#/.test(line)) continue;
    const match = /^( *)([\w.-]+):\s*(.*)$/.exec(line);
    if (!match) throw new Error(`line ${index + 1}: expected a mapping key`);
    const [, spaces, key, rawValue] = match;
    const indent = spaces.length;
    if (indent % 2) throw new Error(`line ${index + 1}: indentation must use pairs of spaces`);
    while (stack.at(-1).indent >= indent) stack.pop();
    const parent = stack.at(-1)?.node;
    if (!parent || typeof parent !== "object" || Array.isArray(parent)) throw new Error(`line ${index + 1}: invalid nesting`);
    if (Object.hasOwn(parent, key)) throw new Error(`line ${index + 1}: duplicate key ${key}`);
    if (!rawValue) {
      const child = {};
      parent[key] = child;
      stack.push({ indent, node: child });
    } else {
      let value;
      if (rawValue.startsWith("[") || rawValue.startsWith('"')) value = JSON.parse(rawValue);
      else if (rawValue.startsWith("'")) value = rawValue.slice(1, -1);
      else if (rawValue === "true") value = true;
      else if (rawValue === "false") value = false;
      else value = rawValue;
      parent[key] = value;
    }
  }
  return document;
}

function loadAgentSettings() {
  let data;
  try {
    const text = read(path.join(root, ".aiddbot", "agents.yaml"));
    if (text === null) throw new Error("file is missing");
    data = parseAgentTable(text);
  } catch (error) { throw new Error(`.aiddbot/agents.yaml: ${error.message}`); }
  const harnesses = data.harnesses;
  const configured = data.agents;
  if (!harnesses || typeof harnesses !== "object" || Array.isArray(harnesses)) throw new Error(".aiddbot/agents.yaml: expected a harnesses mapping");
  if (!configured || typeof configured !== "object" || Array.isArray(configured)) throw new Error(".aiddbot/agents.yaml: expected an agents mapping");
  for (const harness of HARNESS_NAMES) {
    const entry = harnesses[harness];
    if (!entry || typeof entry.path !== "string") throw new Error(`.aiddbot/agents.yaml: missing harness path for ${harness}`);
    if ((entry.path.match(/\{id\}/g) ?? []).length !== 1) throw new Error(`.aiddbot/agents.yaml: ${harness}.path must contain exactly one {id}`);
    const sample = entry.path.replace("{id}", "agent-id");
    if (path.posix.isAbsolute(sample) || path.win32.isAbsolute(sample) || sample.replaceAll("\\", "/").split("/").includes("..")) throw new Error(`.aiddbot/agents.yaml: ${harness}.path must stay inside the repository`);
  }
  for (const harness of Object.keys(harnesses)) if (!HARNESS_NAMES.includes(harness)) throw new Error(`.aiddbot/agents.yaml: unsupported harness ${harness}`);

  const agentsRoot = path.join(root, ".agents", "agents");
  const canonicalIds = fs.readdirSync(agentsRoot).filter((entry) => entry.endsWith(".md")).map((entry) => entry.replace(/\.md$/, ""));
  for (const id of canonicalIds) {
    const agent = configured[id];
    if (!agent || typeof agent !== "object" || Array.isArray(agent)) throw new Error(`.aiddbot/agents.yaml: missing agent ${id}`);
    if (typeof agent.name !== "string" || !agent.name.trim()) throw new Error(`.aiddbot/agents.yaml: ${id}.name is required`);
    if (typeof agent.description !== "string" || !agent.description.trim() || /[\r\n]/.test(agent.description)) throw new Error(`.aiddbot/agents.yaml: ${id}.description must be a non-empty single line`);
    for (const harness of HARNESS_NAMES) {
      const row = agent[harness];
      if (!row || typeof row !== "object" || Array.isArray(row)) throw new Error(`.aiddbot/agents.yaml: missing ${id}.${harness}`);
      if (typeof row.model !== "string" && !(harness === "copilot" && Array.isArray(row.models) && row.models.length)) throw new Error(`.aiddbot/agents.yaml: ${id}.${harness} needs model or models`);
      if (harness !== "cursor" && !row.effort) throw new Error(`.aiddbot/agents.yaml: ${id}.${harness} needs effort`);
      if (row.effort && !["low", "medium", "high", "xhigh", "max"].includes(row.effort)) throw new Error(`.aiddbot/agents.yaml: invalid effort for ${id}.${harness}`);
      if (harness === "copilot" && row.models && (!Array.isArray(row.models) || row.models.length === 0 || row.models.some((model) => typeof model !== "string" || !model))) throw new Error(`.aiddbot/agents.yaml: copilot models for ${id} must be non-empty strings`);
    }
  }
  for (const id of Object.keys(configured)) if (!canonicalIds.includes(id)) throw new Error(`.aiddbot/agents.yaml: no canonical .agents/agents/${id}.md prompt exists`);
  return data;
}

function loadAgents(matrix) {
  const agentsRoot = path.join(root, ".agents", "agents");
  return fs.readdirSync(agentsRoot).filter((entry) => entry.endsWith(".md")).map((entry) => {
    const file = entry.replace(/\.md$/, "");
    const content = read(path.join(agentsRoot, entry));
    if (!content?.trim()) throw new Error(`.agents/agents/${entry}: prompt is empty`);
    if (/^---\r?\n/.test(content)) throw new Error(`.agents/agents/${entry}: remove metadata frontmatter; define name and description in .aiddbot/agents.yaml`);
    const { name, description } = matrix.agents[file];
    return { file, name, description, sourcePath: `.agents/agents/${entry}` };
  }).sort((a, b) => a.file.localeCompare(b.file));
}

function renderAgentAdapter(agent, harness, row) {
  if (harness === "claude-code") {
    return `---\nname: ${JSON.stringify(agent.name)}\ndescription: ${JSON.stringify(agent.description)}\nmodel: ${row.model}\neffort: ${row.effort}\n---\n${markerMd(agent.sourcePath)}\nAdopt the role, expertise, and instructions defined in @${agent.sourcePath} and follow them for this task.\n`;
  }
  if (harness === "cursor") {
    return `---\nname: ${JSON.stringify(agent.name)}\ndescription: ${JSON.stringify(agent.description)}\nmodel: ${row.model}\n---\n${markerMd(agent.sourcePath)}\nAdopt the role, expertise, and instructions defined in \`${agent.sourcePath}\` and follow them for this task.\n`;
  }
  if (harness === "copilot") {
    const models = row.models ?? [row.model];
    const config = `models: [${models.map((model) => JSON.stringify(model)).join(", ")}]\nreasoningEffort: ${row.effort}\n`;
    return `---\nname: ${JSON.stringify(agent.name)}\ndescription: ${JSON.stringify(agent.description)}\n${config}---\n${markerMd(agent.sourcePath)}\nAdopt the role and instructions defined in [${agent.sourcePath}](../../${agent.sourcePath}) for this task.\n`;
  }
  if (harness === "codex") {
    return `${markerToml(agent.sourcePath)}\nname = ${JSON.stringify(agent.name)}\ndescription = ${JSON.stringify(agent.description)}\nmodel = ${JSON.stringify(row.model)}\nmodel_reasoning_effort = ${JSON.stringify(row.effort)}\ndeveloper_instructions = """Adopt the role, expertise, and instructions defined in ${agent.sourcePath} and follow them for this task."""\n`;
  }
  throw new Error(`No adapter renderer for ${harness}`);
}

function syncAgents(agents, matrix) {
  const desiredByDirectory = new Map();
  for (const harness of HARNESS_NAMES) {
    const route = matrix.harnesses[harness].path;
    for (const agent of agents) {
      const relative = route.replace("{id}", agent.file).replaceAll("\\", "/");
      const destination = path.resolve(root, ...relative.split("/"));
      const directory = path.dirname(destination);
      if (!desiredByDirectory.has(directory)) desiredByDirectory.set(directory, new Map());
      const desired = desiredByDirectory.get(directory);
      const filename = path.basename(destination);
      if (desired.has(filename)) throw new Error(`.aiddbot/agents.yaml: duplicate adapter destination ${rel(destination)}`);
      desired.set(filename, renderAgentAdapter(agent, harness, matrix.agents[agent.file][harness]));
    }
  }
  for (const [directory, desired] of desiredByDirectory) syncFlatDir(directory, desired);
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

// ---------- run ----------

const skills = loadSkills();
let agentSettings;
try { agentSettings = loadAgentSettings(); }
catch (error) { process.stderr.write(`${error.message}\n`); process.exit(1); }
let agents;
try { agents = loadAgents(agentSettings); }
catch (error) { process.stderr.write(`${error.message}\n`); process.exit(1); }
const hookExists = fs.existsSync(path.join(root, ".agents", "hooks", "index.mjs"));

syncSkills(skills);
syncAgents(agents, agentSettings);
syncCodexHooks(hookExists);
syncClaudeSettings(hookExists);
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
