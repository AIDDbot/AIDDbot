import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { git } from "./git.mjs";
import { RuleError } from "./cli.mjs";
import { AIDDBOT } from "./paths.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));

/**
 * The repository root, with one criterion: the git root that contains `.aiddbot/`.
 * It is resolved from the core's own location, so every caller inside the project
 * gets the same root regardless of its working directory.
 */
export function findRoot() {
  const top = git(HERE, ["rev-parse", "--show-toplevel"], { quiet: true, allowFailure: true });
  const root = top && path.resolve(top);
  if (!root || !fs.existsSync(path.join(root, AIDDBOT))) throw new RuleError(`Could not find the project root: a git repository containing ${AIDDBOT}/. Run aiddbot init.`);
  return root;
}
