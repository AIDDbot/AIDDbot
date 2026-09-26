import fs from "node:fs";
import path from "node:path";

const STAGES = new Set(["verify", "qualify"]);
const LEVELS = new Set(["Info", "Warn", "Error"]);

export function readEvaluations(root, specId) {
  const directory = path.join(root, ".aiddbot", "journals");
  if (!fs.existsSync(directory)) throw new Error("Journal directory is missing; run aiddbot init.");
  const files = fs.readdirSync(directory).filter((file) => /^\d{4}-\d{2}-\d{2}\.log$/.test(file)).sort();
  return files.flatMap((file) => readDay(path.join(directory, file), file, specId));
}

function readDay(file, name, specId) {
  return fs.readFileSync(file, "utf8").split(/\r?\n/)
    .map((line) => parseEvent(line, name, specId)).filter(Boolean);
}

function parseEvent(line, file, specId) {
  if (!line || line.startsWith("#")) return null;
  const event = {
    status: line.slice(9, 15).trim(),
    spec: line.slice(23, 29).trim(),
    stage: line.slice(30, 38).trim(),
    name: line.slice(39, 47).trim().toLowerCase(),
    revision: line.slice(55, 58).trim(),
  };
  if (event.spec !== specId || event.name !== "evaluated" || !STAGES.has(event.stage)) return null;
  if (!/^\d+$/.test(event.revision) || !LEVELS.has(event.status)) throw new Error(`Invalid evaluation entry in ${file}: ${line}`);
  return event;
}

export function latest(events, stage) {
  return events.filter((event) => event.stage === stage).at(-1) ?? null;
}
