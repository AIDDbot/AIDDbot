#!/usr/bin/env node
// The AIDD core: every state change of the process goes through these commands.
// Output is JSON on stdout. Exit codes: 0 ok, 1 rejected by a rule, 2 usage, 3 nothing configured.
import evaluate from "./commands/eval.mjs";
import { integrate, release } from "./commands/release.mjs";
import spec from "./commands/spec.mjs";
import { commit, config, debt, log, run } from "./commands/work.mjs";
import { findRoot, parseArgs, RuleError, UnavailableError, UsageError } from "./lib/core.mjs";

const COMMANDS = {
  spec: [spec, "spec new <type> <slug> <title> [--domain <d>] | spec show [<id>]"],
  eval: [evaluate, "eval <verification|qualification> <green|amber|red> <summary> [--spec <id>] [--preexisting <D IDs>]"],
  run: [run, "run <lint|unit|acceptance|quality> [--project <name>] [--spec]"],
  config: [config, "config get [<key>] | config set <key> <json>"],
  debt: [debt, 'debt add "<title>" <high|medium|low> ["<evidence>"] | debt list | debt remove <id>'],
  commit: [commit, 'commit "<message>" [<path>...]'],
  release: [release, "release [--major]"],
  integrate: [integrate, 'integrate "<commit message>"'],
  log: [log, 'log <verdict|select|approved|scaffolded|blocked> "<summary>" [--spec <id>]'],
};

const HELP = [
  "Usage: node .agents/aidd/aidd.mjs <command>",
  ...Object.values(COMMANDS).map(([, usage]) => `  ${usage}`),
  "Never edit .aiddbot/, control.json, or debt.json by hand: use these commands.",
].join("\n");

function main([name, ...argv]) {
  const entry = COMMANDS[name];
  if (!entry) {
    process.stdout.write(`${HELP}\n`);
    return name && name !== "help" ? 2 : 0;
  }
  try {
    const { args, flags } = parseArgs(argv);
    const result = entry[0](findRoot(), args, flags);
    const { body, exitCode } = result?.exitCode === undefined ? { body: result, exitCode: 0 } : result;
    process.stdout.write(`${JSON.stringify(body, null, 2)}\n`);
    return exitCode;
  } catch (error) {
    process.stdout.write(`${JSON.stringify({ error: error.message, usage: entry[1] }, null, 2)}\n`);
    if (error instanceof UsageError) return 2;
    if (error instanceof UnavailableError) return 3;
    if (error instanceof RuleError) return 1;
    throw error;
  }
}

process.exitCode = main(process.argv.slice(2));
