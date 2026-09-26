import fs from "node:fs";
import path from "node:path";

function journalFiles(root) {
  const directory = path.join(root, ".aiddbot", "journals");
  if (!fs.existsSync(directory)) throw new Error(`Journal directory missing: ${directory}`);
  return fs.readdirSync(directory).filter((name) => /^\d{4}-\d{2}-\d{2}\.log$/.test(name)).sort()
    .map((name) => ({ date: name.slice(0, 10), file: path.join(directory, name) }));
}

function parseEvent(line, date) {
  const rawStatus = line.slice(9, 15).trim().toLowerCase();
  return {
    date, time: line.slice(0, 8).trim(),
    status: ({ info: "green", warn: "amber", error: "red" })[rawStatus] ?? rawStatus,
    spec: line.slice(23, 29).trim(), stage: line.slice(30, 38).trim(),
    name: line.slice(39, 47).trim().toLowerCase(), revision: line.slice(55, 58).trim(),
  };
}

export function readJournalEvents(root, specId) {
  const events = [];
  for (const { date, file } of journalFiles(root)) {
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      if (!line || line.startsWith("#")) continue;
      const event = parseEvent(line, date);
      if (event.spec !== specId || event.name !== "evaluated" || !["verify", "qualify"].includes(event.stage)) continue;
      if (!("green amber red").split(" ").includes(event.status) || !/^\d+$/.test(event.revision)) throw new Error(`Invalid evaluation in ${file}: ${line}`);
      events.push(event);
    }
  }
  return events;
}

export function latest(events, stage) {
  return events.filter((event) => event.stage === stage).at(-1) ?? null;
}
