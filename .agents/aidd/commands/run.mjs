// Execute one classified command kind for one project or every project that
// has it configured (D6). Classification itself is rule-project's job, done
// once and written to config.json; this command only runs what is recorded
// there, and never invents a command for a kind nothing declared.
import { EXIT, parseArgs, UnavailableError, UsageError } from "../lib/cli.mjs";
import { readConfig, RUN_KINDS } from "../lib/config.mjs";
import { execCommand } from "../lib/exec.mjs";
import { findRoot } from "../lib/root.mjs";
import { freeConfiguredPorts } from "../lib/ports.mjs";
import path from "node:path";

function targetProjects(config, requested) {
  if (!requested) return Object.keys(config.projects);
  if (!Object.hasOwn(config.projects, requested)) throw new UsageError(`Unknown project: ${requested}`);
  return [requested];
}

function runProject(root, config, kind, name) {
  const project = config.projects[name];
  const cwd = path.join(root, project.path);
  if (kind === "quality") {
    const commands = project.commands.quality ?? [];
    if (!commands.length) return { project: name, available: false };
    const runs = commands.map((command) => execCommand(cwd, command));
    return { project: name, available: true, ok: runs.every((entry) => entry.ok), runs };
  }
  const command = project.commands[kind];
  if (!command) return { project: name, available: false };
  if (kind === "acceptance") freeConfiguredPorts(project.ports);
  return { project: name, available: true, ...execCommand(cwd, command) };
}

export default function run(argv) {
  const { kind, project: requested } = parseArgs(argv, { positional: ["kind"], flags: { project: "string" } });
  if (!RUN_KINDS.includes(kind)) throw new UsageError(`Unknown kind: ${kind}; valid values: ${RUN_KINDS.join(", ")}`);
  const root = findRoot();
  const config = readConfig(root);
  const names = targetProjects(config, requested);
  const results = names.map((name) => runProject(root, config, kind, name));
  const ran = results.filter((entry) => entry.available);
  if (!ran.length) {
    throw new UnavailableError(requested
      ? `Project '${requested}' has no '${kind}' command configured.`
      : `No project has a '${kind}' command configured.`);
  }
  const ok = ran.every((entry) => entry.ok);
  return { body: { kind, projects: results, ok }, exitCode: ok ? EXIT.ok : EXIT.rule };
}
