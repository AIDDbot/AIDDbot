// Agent adapters: `.aiddbot/agents.yaml` (defaults) + optional `.aiddbot/agents.local.yaml` (user overrides)
// + canonical prompts in `.agents/agents/{id}.md` -> one native profile per harness and agent.
// Shared by `scripts/adapt.js` (development defaults) and `bin/lib/overlay.js` (consumer install/update).
import fs from "node:fs";
import path from "node:path";

export const HARNESS_NAMES = ["claude-code", "codex", "copilot", "cursor"];
export const LOCAL_TABLE = ".aiddbot/agents.local.yaml";
const EFFORTS = ["low", "medium", "high", "xhigh", "max"];
const MARKER_TEXT = "managed by /adapt";
const markerMd = (source) => `<!-- ${MARKER_TEXT} — do not edit here, edit ${source} instead -->`;
const markerToml = (source) => `# ${MARKER_TEXT} — do not edit here, edit ${source} instead`;
const isMap = (value) => value && typeof value === "object" && !Array.isArray(value);

// The tables use a small nested YAML subset: mappings, quoted strings, booleans, and JSON-compatible inline arrays.
export function parseAgentTable(text) {
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
    if (!isMap(parent)) throw new Error(`line ${index + 1}: invalid nesting`);
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

// Later layers win. Setting `model` drops an inherited `models` (and vice versa) so a Copilot list never fights a single model.
function deepMerge(base, over) {
  const out = { ...base };
  for (const [key, value] of Object.entries(over)) out[key] = isMap(value) && isMap(base[key]) ? deepMerge(base[key], value) : value;
  if (over.model !== undefined && over.models === undefined) delete out.models;
  if (over.models !== undefined && over.model === undefined) delete out.model;
  return out;
}

/** Parse the defaults table, layer the optional local overrides on top, validate, and resolve every agent's per-harness row (tier + own fields). */
export function loadAgentTable(root, localText = null) {
  const readText = (file) => (fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null);
  const fail = (message) => { throw new Error(`.aiddbot/agents.yaml: ${message}`); };
  let data;
  const text = readText(path.join(root, ".aiddbot", "agents.yaml"));
  if (text === null) fail("file is missing");
  try { data = parseAgentTable(text); } catch (error) { fail(error.message); }
  if (localText !== null) {
    try { data = deepMerge(data, parseAgentTable(localText)); } catch (error) { throw new Error(`${LOCAL_TABLE}: ${error.message}`); }
  }
  const { harnesses, agents: configured } = data;
  if (!isMap(harnesses)) fail("expected a harnesses mapping");
  if (!isMap(configured)) fail("expected an agents mapping");
  for (const harness of HARNESS_NAMES) {
    const entry = harnesses[harness];
    if (!entry || typeof entry.path !== "string") fail(`missing harness path for ${harness}`);
    if ((entry.path.match(/\{id\}/g) ?? []).length !== 1) fail(`${harness}.path must contain exactly one {id}`);
    const sample = entry.path.replace("{id}", "agent-id");
    if (path.posix.isAbsolute(sample) || path.win32.isAbsolute(sample) || sample.replaceAll("\\", "/").split("/").includes("..")) fail(`${harness}.path must stay inside the repository`);
    if (!isMap(entry.tiers)) fail(`${harness}.tiers is required`);
  }
  for (const harness of Object.keys(harnesses)) if (!HARNESS_NAMES.includes(harness)) fail(`unsupported harness ${harness}`);

  const agentsRoot = path.join(root, ".agents", "agents");
  const canonicalIds = fs.readdirSync(agentsRoot).filter((entry) => entry.endsWith(".md")).map((entry) => entry.replace(/\.md$/, ""));
  const rows = {};
  for (const id of canonicalIds) {
    const agent = configured[id];
    if (!isMap(agent)) fail(`missing agent ${id}`);
    if (typeof agent.name !== "string" || !agent.name.trim()) fail(`${id}.name is required`);
    if (typeof agent.description !== "string" || !agent.description.trim() || /[\r\n]/.test(agent.description)) fail(`${id}.description must be a non-empty single line`);
    if (typeof agent.tier !== "string") fail(`${id}.tier is required`);
    rows[id] = {};
    for (const harness of HARNESS_NAMES) {
      const own = agent[harness];
      if (own !== undefined && !isMap(own)) fail(`${id}.${harness} must be a mapping`);
      const tier = harnesses[harness].tiers[own?.tier ?? agent.tier];
      if (!isMap(tier)) fail(`${id}.${harness} uses unknown tier ${own?.tier ?? agent.tier}`);
      const { tier: _tier, ...fields } = own ?? {};
      const row = deepMerge(tier, fields);
      if (typeof row.model !== "string" && !(harness === "copilot" && Array.isArray(row.models) && row.models.length)) fail(`${id}.${harness} needs model or models`);
      if (harness !== "cursor" && !row.effort) fail(`${id}.${harness} needs effort`);
      if (row.effort && !EFFORTS.includes(row.effort)) fail(`invalid effort for ${id}.${harness}`);
      if (harness === "copilot" && row.models && row.models.some((model) => typeof model !== "string" || !model)) fail(`copilot models for ${id} must be non-empty strings`);
      rows[id][harness] = row;
    }
  }
  for (const id of Object.keys(configured)) if (!canonicalIds.includes(id)) fail(`no canonical .agents/agents/${id}.md prompt exists`);
  return { harnesses, agents: configured, rows, ids: canonicalIds.sort() };
}

/** Canonical prompt sources plus their names/descriptions, sorted by id. */
export function loadAgents(root, table) {
  return table.ids.map((file) => {
    const entry = `${file}.md`;
    const content = fs.readFileSync(path.join(root, ".agents", "agents", entry), "utf8");
    if (!content.trim()) throw new Error(`.agents/agents/${entry}: prompt is empty`);
    if (/^---\r?\n/.test(content)) throw new Error(`.agents/agents/${entry}: remove metadata frontmatter; define name and description in .aiddbot/agents.yaml`);
    const { name, description } = table.agents[file];
    return { file, name, description, sourcePath: `.agents/agents/${entry}` };
  });
}

export function renderAgentAdapter(agent, harness, row) {
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

/** Every adapter as a repo-relative path -> content map. */
export function renderAllAdapters(root, table) {
  const out = new Map();
  for (const harness of HARNESS_NAMES) {
    for (const agent of loadAgents(root, table)) {
      const relative = table.harnesses[harness].path.replace("{id}", agent.file).replaceAll("\\", "/");
      if (out.has(relative)) throw new Error(`.aiddbot/agents.yaml: duplicate adapter destination ${relative}`);
      out.set(relative, renderAgentAdapter(agent, harness, table.rows[agent.file][harness]));
    }
  }
  return out;
}
