import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "./args.mjs";
import { checkBranch, checkRecords, commitPendingChanges, findRoot, git } from "./repository.mjs";
import { makeId, parseCounters, reserveCounters, writeCounters, writeSpec } from "./records.mjs";

function identityFor(options, counters) {
  const number = counters.spec + 1;
  const id = makeId("S", number);
  const key = `${id}-${options.slug}`;
  return { number, id, key, branch: `${options.type}/${key}` };
}

function output(root, file, options, identity, counters) {
  const ids = (kind, start, count) => Array.from({ length: count }, (_, index) => makeId(kind, start + index + 1));
  const result = {
    branch: identity.branch, spec: identity.id, file: path.relative(root, file),
    functional: ids("F", counters.functional, options.functional),
    technical: ids("T", counters.technical, options.technical), status: "draft",
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

export function prepareSpec(argv) {
  const options = parseArgs(argv);
  const root = findRoot();
  if (!root) throw new Error("Run this command from an AIDDbot project repository.");
  const records = checkRecords(root, options);
  const currentCountersText = fs.readFileSync(records.countersFile, "utf8");
  const counters = parseCounters(currentCountersText);
  const identity = identityFor(options, counters);
  const specDir = path.join(records.product, "specs", identity.key);
  checkBranch(root, identity.branch, specDir);
  commitPendingChanges(root);
  git(root, ["switch", "-c", identity.branch]);
  const updatedCounters = reserveCounters(currentCountersText, counters, options, identity.number);
  writeCounters(records.countersFile, updatedCounters);
  output(root, writeSpec(records.product, options, identity), options, identity, counters);
}
