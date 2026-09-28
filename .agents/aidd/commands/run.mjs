// Execute one classified command kind for one project or every project that
// has it configured (D6). Classification itself is rule-project's job, done
// once and written to config.json; this command only runs what is recorded
// there, and never invents a command for a kind nothing declared. For `acceptance`
// it also reads the declared Playwright JSON report and triages each failure (D20–D22).
import fs from "node:fs";
import path from "node:path";
import { outcomes, REPORT_ENV, reportFile, triage } from "../lib/acceptance.mjs";
import { EXIT, parseArgs, UnavailableError, UsageError } from "../lib/cli.mjs";
import { readConfig, RUN_KINDS } from "../lib/config.mjs";
import { execCommand } from "../lib/exec.mjs";
import { specFromBranch } from "../lib/git.mjs";
import { relative } from "../lib/paths.mjs";
import { findRoot } from "../lib/root.mjs";
import { freeConfiguredPorts } from "../lib/ports.mjs";
import { resolveSpecDir } from "../lib/spec.mjs";

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
  if (kind !== "acceptance") return { project: name, available: true, ...execCommand(cwd, command) };
  freeConfiguredPorts(project.ports);
  if (!project.acceptanceReport) {
    return { project: name, available: true, ...execCommand(cwd, command), report: null, note: "No acceptanceReport declared: failures cannot be assigned to requirements, so verification cannot be green." };
  }
  const file = reportFile(root, project);
  fs.rmSync(file, { force: true });
  const result = execCommand(cwd, command, { [REPORT_ENV]: file });
  if (!fs.existsSync(file)) return { project: name, available: true, ...result, report: { file: relative(root, file), found: false, note: "The run wrote no JSON report; enable Playwright's json reporter." } };
  const all = outcomes(JSON.parse(fs.readFileSync(file, "utf8")));
  const spec = branchSpec(root);
  return {
    project: name, available: true, ...result,
    report: {
      file: relative(root, file), found: true,
      counts: Object.fromEntries(["expected", "unexpected", "flaky", "skipped"].map((status) => [status, all.filter((entry) => entry.status === status).length])),
      spec: spec?.id ?? null,
      failures: triage(root, spec, all.filter((entry) => entry.status === "unexpected")),
      flaky: all.filter((entry) => entry.status === "flaky").map((entry) => `${relative(root, entry.file)}:${entry.line} ${entry.test}`),
    },
  };
}

/** The spec of the current branch, as triage needs it, or null off a spec branch. */
function branchSpec(root) {
  const id = specFromBranch(root);
  if (!id) return null;
  const { file } = resolveSpecDir(root, id);
  return { id, text: fs.readFileSync(file, "utf8") };
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
