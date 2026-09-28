#!/usr/bin/env node
// The AIDDbot core: one dependency-free CLI that keeps the process state (D1).
// Usage: node .agents/aidd/aidd.mjs <group> [<command>] [arguments]
// Every command prints JSON on stdout and exits 0 (ok), 1 (rejected by a rule), 2 (usage), or 3 (nothing to run).
import { EXIT, run } from "./lib/cli.mjs";

// Each command lives in its own module under commands/, loaded only when invoked.
// A group with a single command uses the empty name.
const GROUPS = {
  spec: {
    summary: "Create, check, approve, block, resume, and show specs",
    commands: {
      new: { usage: "spec new <type> <slug> <title> --domain <domain>", summary: "Branch, reserve the spec ID, and create spec.md and control.json", load: () => import("./commands/spec-new.mjs") },
      check: { usage: "spec check <spec-directory> [--base <branch>]", summary: "Validate a spec's identity, domain, requirements, and acceptance rows", load: () => import("./commands/spec-check.mjs") },
      approve: { usage: "spec approve <spec-id-or-directory> [--base <branch>]", summary: "Check the spec and record human approval: draft to in-progress", load: () => import("./commands/spec-control.mjs").then((m) => ({ default: m.approve })) },
      block: { usage: "spec block <spec-id-or-directory> <reason>", summary: "Block a spec until a human resolves the reason", load: () => import("./commands/spec-control.mjs").then((m) => ({ default: m.block })) },
      resume: { usage: "spec resume <spec-id-or-directory> <resolution> [--base <branch>]", summary: "Check the spec and clear its block", load: () => import("./commands/spec-control.mjs").then((m) => ({ default: m.resume })) },
      show: { usage: "spec show <spec-id-or-directory> [--json]", summary: "Summarize control.json for humans", load: () => import("./commands/spec-control.mjs").then((m) => ({ default: m.show })) },
    },
  },
  eval: {
    summary: "Record and gate evaluations",
    commands: {
      record: { usage: "eval record <verification|qualification> <spec-directory> <green|amber|red> <summary>", summary: "Record one evaluation of a spec", load: () => import("./commands/eval-record.mjs") },
      gate: { usage: "eval gate <spec-id-or-directory>", summary: "Decide whether the evidence permits shipping", load: () => import("./commands/eval-gate.mjs") },
    },
  },
  release: {
    summary: "Commit, merge, and tag a spec release",
    commands: { "": { usage: "release <version> [--base <branch>]", summary: "Commit, merge, tag, and delete the spec branch", load: () => import("./commands/release.mjs") } },
  },
  git: {
    summary: "Git operations on task branches",
    commands: {
      integrate: { usage: "git integrate <commit-message> [--base <branch>]", summary: "Commit, merge into the default branch, and delete the task branch", load: () => import("./commands/git-integrate.mjs") },
    },
  },
  log: {
    summary: "Journal one judgment of the model",
    commands: { "": { usage: "log <verdict|select|blocked> <summary> [--spec <id>] [--project <name>]", summary: "Journal one judgment of the model", load: () => import("./commands/log.mjs") } },
  },
  config: {
    summary: "Read and write .aiddbot/config.json",
    commands: {
      get: { usage: "config get [<key>]", summary: "Read the configuration or one dotted key", load: () => import("./commands/config.mjs").then((m) => ({ default: m.get })) },
      set: { usage: "config set <key> <json-value>", summary: "Write one dotted key after validating it", load: () => import("./commands/config.mjs").then((m) => ({ default: m.set })) },
    },
  },
  debt: {
    summary: "Keep the open technical debt in .product/quality/debt.json",
    commands: {
      add: { usage: "debt add --title <t> --priority <high|medium|low> --scope <s> --evidence <e> --impact <i> --source <spec-report|quality:project>", summary: "Register an item with the next D ID", load: () => import("./commands/debt.mjs").then((m) => ({ default: m.add })) },
      update: { usage: "debt update <id> [--title|--scope|--evidence|--impact <text>] [--priority <p>] [--state <confirmed|not-revalidated>] [--source <s>]", summary: "Change an item; --source records a fresh confirmation", load: () => import("./commands/debt.mjs").then((m) => ({ default: m.update })) },
      resolve: { usage: "debt resolve <id> (--spec <spec> | --scan <project>)", summary: "Remove an item with a proof the core checks", load: () => import("./commands/debt.mjs").then((m) => ({ default: m.resolve })) },
      list: { usage: "debt list", summary: "Summarize the open debt, highest priority first", load: () => import("./commands/debt.mjs").then((m) => ({ default: m.list })) },
    },
  },
  trace: {
    summary: "Trace a spec's requirements to its tagged acceptance tests",
    commands: { "": { usage: "trace [<spec-id-or-directory>]", summary: "Report untested requirements, dangling or replaced tags, and untagged tests; exit 1 when red", load: () => import("./commands/trace.mjs") } },
  },
  run: {
    summary: "Execute one classified command kind",
    commands: { "": { usage: "run <lint|unit|acceptance|quality> [--project <name>]", summary: "Run the kind for one project, or every project that has it configured", load: () => import("./commands/run.mjs") } },
  },
};

function help(groupName) {
  const lines = ["Usage: node .agents/aidd/aidd.mjs <group> [<command>] [arguments]", ""];
  const groups = groupName ? { [groupName]: GROUPS[groupName] } : GROUPS;
  for (const [name, group] of Object.entries(groups)) {
    lines.push(`${name.padEnd(8)} ${group.summary}`);
    for (const command of Object.values(group.commands)) lines.push(`  ${command.usage}`);
  }
  lines.push("", "Output is JSON on stdout. Exit codes: 0 ok, 1 rejected by a rule, 2 incorrect usage, 3 nothing configured to run.");
  return `${lines.join("\n")}\n`;
}

function resolve(argv) {
  const [groupName, ...rest] = argv;
  const group = GROUPS[groupName];
  if (!group) return null;
  if (group.commands[""]) return { group: groupName, command: group.commands[""], args: rest };
  const command = group.commands[rest[0]];
  return command ? { group: groupName, command, args: rest.slice(1) } : { group: groupName };
}

async function main(argv) {
  if (!argv.length || ["--help", "-h", "help"].includes(argv[0])) {
    process.stdout.write(help());
    return argv.length ? EXIT.ok : EXIT.usage;
  }
  const target = resolve(argv);
  if (!target?.command) {
    process.stderr.write(`Unknown ${target ? "command" : "group"}: ${argv.slice(0, target ? 2 : 1).join(" ")}\n\n${help(target?.group)}`);
    return EXIT.usage;
  }
  if (target.args.includes("--help")) {
    process.stdout.write(`Usage: node .agents/aidd/aidd.mjs ${target.command.usage}\n${target.command.summary}\n`);
    return EXIT.ok;
  }
  const module = await target.command.load();
  return run(module.default, target.args, target.command.usage);
}

process.exitCode = await main(process.argv.slice(2));
