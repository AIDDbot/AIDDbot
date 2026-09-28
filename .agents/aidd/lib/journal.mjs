// The daily journal `.aiddbot/journals/YYYY-MM-DD.log`: plain narrative for humans (D3).
// This module only writes it; no code reads it or decides anything from it.
// Each line holds complete fields separated by a space. The short columns are padded to a
// minimum width so the log reads as a table; a longer value simply overflows its column.
// Only the summary is capped, at MAX_SUMMARY characters, so one line stays one glance.
//   HH:MM:SS <status> <actor> <spec>  <event>      <summary>
import fs from "node:fs";
import path from "node:path";
import { UsageError } from "./cli.mjs";
import { aiddbotPath } from "./paths.mjs";

export const STATUSES = ["green", "amber", "red"];

// The only events a model logs (D5), each with its fixed status. `blocked` is for a block
// outside any spec; a spec's block and resume are journaled by `aidd spec block|resume` (D23).
// `init` is reserved for the single genesis line `aiddbot init` writes.
export const MODEL_EVENTS = { verdict: "green", select: "green", blocked: "red", init: "green" };

const SEPARATOR = " ";
export const MAX_SUMMARY = 128;
const cap = (text) => (text.length <= MAX_SUMMARY ? text : `${text.slice(0, MAX_SUMMARY - 1)}…`);
const pad = (value) => String(value).padStart(2, "0");
// Minimum widths of the columns before the summary: time, status, actor, spec, event.
const WIDTHS = [8, 6, 6, 6, 10];
const row = (cells) => [...cells.slice(0, WIDTHS.length).map((cell, index) => cell.padEnd(WIDTHS[index])), ...cells.slice(WIDTHS.length)].join(SEPARATOR);

export const detectHarness = () => (process.env.CLAUDECODE === "1" ? "claude-code" : null);

/** One field: trimmed, on one line; "-" when empty. */
function field(name, value) {
  const text = value === undefined || value === null ? "" : String(value).trim();
  if (/[\r\n]/.test(text)) throw new UsageError(`${name} cannot contain a line break.`);
  return text || "-";
}

/**
 * Append one event and return the written line.
 * `actor` is `aidd` for the core's own entries and `model` for `aidd log`.
 */
export function note(root, { actor = "aidd", event, status = "green", spec, project, summary }) {
  if (!STATUSES.includes(status)) throw new UsageError(`Invalid status: ${status}; valid values: ${STATUSES.join(", ")}`);
  const now = new Date();
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const subject = project ? `${field("summary", summary)} (${field("project", project)})` : field("summary", summary);
  const line = row([time, status, actor, field("spec", spec), field("event", event), cap(subject)]);
  const directory = aiddbotPath(root, "journals");
  const file = path.join(directory, `${date}.log`);
  fs.mkdirSync(directory, { recursive: true });
  let header = "";
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) {
    const harness = detectHarness();
    header = `# AIDDbot journal${SEPARATOR}${date}${harness ? `${SEPARATOR}${harness}` : ""}\n${row(["# time", "status", "actor", "spec", "event", "summary"])}\n`;
  }
  fs.appendFileSync(file, `${header}${line}\n`, "utf8");
  return line;
}

/** Journal an entry from the core, never letting a journal failure undo a state change. */
export function noteQuietly(root, entry) {
  try { return note(root, entry); } catch (error) {
    process.stderr.write(`Journal entry skipped: ${error.message}\n`);
    return null;
  }
}
