// The daily journal `.aiddbot/journals/YYYY-MM-DD.log`: the only writer and the
// only reader of its fixed-width format. Phase 2 of the deterministic core
// replaces this format and removes the reader.
import fs from "node:fs";
import path from "node:path";
import { UsageError } from "./cli.mjs";
import { aiddbotPath } from "./paths.mjs";

// Single source of truth for stage names: adding a skill that journals means
// adding its row here, nowhere else.
export const STAGE_BY_SKILL = {
  // Not a skill: `aiddbot init` writes exactly one genesis event through
  // `aidd log`, so the journal's first line never duplicates its format.
  init: "init",
  "architect-system-foundation": "setup",
  "build-requested-spec": "deliver",
  "craft-lasting-quality": "craft",
  "scaffold-system": "scaffold",
  "outline-system": "outline",
  "rule-project": "rule",
  "define-spec": "define",
  "implement-project": "build",
  "verify-behavior": "verify",
  "review-implementation": "qualify",
  "ship-spec": "ship",
  "scan-quality": "scan",
};

export const AGENT_LABELS = { Architect: "Arch", Builder: "Build", Craftsman: "Craft", Direct: "Direct" };
const STATUS_LEVELS = { green: "Info", amber: "Warn", red: "Error" };
const LEVEL_STATUS = { Info: "green", Warn: "amber", Error: "red" };

export const journalsDir = (root) => aiddbotPath(root, "journals");

export const detectHarness = () => (process.env.CLAUDECODE === "1" ? "claude-code" : "-");

const pad = (value) => String(value).padStart(2, "0");

function field(value, width = 6) {
  if (value.length > width) process.stderr.write(`Note: "${value}" is longer than ${width} chars and will be truncated in the table.\n`);
  return value.trim().slice(0, width).padEnd(width, " ");
}

/** Trim a value, rejecting line breaks and `|`; "-" when empty and optional. */
export function clean(name, value, required = false) {
  const cleaned = value?.trim();
  if (!cleaned) {
    if (required) throw new UsageError(`Missing or empty ${name}`);
    return "-";
  }
  if (/\r|\n|\|/.test(cleaned)) throw new UsageError(`${name} cannot contain a line break or |`);
  return cleaned;
}

/**
 * Append one event. `event` holds already-cleaned fields:
 * { skill, event, status, summary, agent, spec, project, revision, harness, model }.
 * Returns the written line without its newline.
 */
export function appendEvent(root, event) {
  const stage = STAGE_BY_SKILL[event.skill];
  if (!stage) throw new UsageError(`Unknown skill: ${event.skill}\nKnown skills: ${Object.keys(STAGE_BY_SKILL).join(", ")}`);
  const level = STATUS_LEVELS[event.status];
  if (!level) throw new UsageError(`Invalid status: ${event.status}\nValid values: ${Object.keys(STATUS_LEVELS).join(", ")}`);
  const agent = AGENT_LABELS[event.agent ?? "Direct"];
  if (!agent) throw new UsageError(`Invalid agent: ${event.agent}\nValid values: ${Object.keys(AGENT_LABELS).join(", ")}`);
  const now = new Date();
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const row = (cells) => cells.join(" ");
  const summary = event.summary.padEnd(128).substring(0, 128);
  const line = row([field(time, 8), field(level), field(agent), field(event.spec ?? "-"), field(stage, 8), field(event.event, 8), field(event.project ?? "-"), field(event.revision ?? "-", 3), summary]);
  const directory = journalsDir(root);
  const journal = path.join(directory, `${date}.log`);
  let prefix = "";
  if (!fs.existsSync(journal) || fs.statSync(journal).size === 0) {
    const runtime = [["Harness", event.harness ?? detectHarness()], ["Model", event.model ?? "-"]].filter(([, value]) => value !== "-").map(([name, value]) => `${name} · ${value}`).join(" | ");
    const names = [field("Agent"), field("Spec"), field("Stage", 8), field("Event", 8)];
    prefix = `# AIDDbot Journal · ${date} ${time}\n${runtime ? `# ${runtime}\n` : ""}\n${row([field("Time", 8), field("Status"), ...names, field("Proj."), field("Rev", 3), "Summary"])}\n`;
  }
  fs.mkdirSync(directory, { recursive: true });
  fs.appendFileSync(journal, `${prefix}${line}\n`, { encoding: "utf8", flag: "a" });
  return line;
}

/** Every `evaluated` verify or qualify event of one spec, oldest first. */
export function readEvaluations(root, specId) {
  const directory = journalsDir(root);
  if (!fs.existsSync(directory)) throw new Error("Journal directory is missing; run aiddbot init.");
  const files = fs.readdirSync(directory).filter((name) => /^\d{4}-\d{2}-\d{2}\.log$/.test(name)).sort();
  const events = [];
  for (const name of files) {
    for (const line of fs.readFileSync(path.join(directory, name), "utf8").split(/\r?\n/)) {
      if (!line || line.startsWith("#")) continue;
      const level = line.slice(9, 15).trim();
      const event = {
        date: name.slice(0, 10), time: line.slice(0, 8).trim(), status: LEVEL_STATUS[level],
        spec: line.slice(23, 29).trim(), stage: line.slice(30, 38).trim(),
        name: line.slice(39, 47).trim().toLowerCase(), revision: line.slice(55, 58).trim(),
      };
      // The 8-character event column stores "evaluated" as "evaluate".
      if (event.spec !== specId || event.name !== "evaluated".slice(0, 8) || !["verify", "qualify"].includes(event.stage)) continue;
      if (!event.status || !/^\d+$/.test(event.revision)) throw new Error(`Invalid evaluation entry in ${name}: ${line}`);
      events.push(event);
    }
  }
  return events;
}

export function latest(events, stage) {
  return events.filter((event) => event.stage === stage).at(-1) ?? null;
}
