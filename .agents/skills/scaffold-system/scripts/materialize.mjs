#!/usr/bin/env node
// Native ESM; requires the Node version declared by the AIDDbot launcher.
import { CHECKS, listCatalog, parse, usage } from "./materialize.helpers.mjs";
import { materialize } from "./materialize.operations.mjs";

function main(argv) {
  const { error, options } = parse(argv);
  if (options?.list) {
    listCatalog();
    return 0;
  }
  const problem = error ?? CHECKS.reduce((found, check) => found || check(options), null);
  if (!problem) return materialize(options);
  usage(problem);
  return 1;
}

process.exitCode = main(process.argv.slice(2));
