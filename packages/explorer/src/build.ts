// Entry point: `bun src/build.ts [--root <repo>] [--out <folder>]`.
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { ContractError } from "./builder/chapters.ts";
import { build } from "./builder/build.ts";

const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: { root: { type: "string" }, out: { type: "string" } },
});
const root = resolve(values.root ?? resolve(import.meta.dir, "..", "..", ".."));
const out = resolve(values.out ?? resolve(import.meta.dir, "..", "dist"));

try {
  const { data } = await build(root, out);
  const { phases, steps, blocks, types } = data.chapters;
  console.log(
    `Explorer built in ${out}: ${phases.length} phases, ${steps.length} steps, ${blocks.length} blocks, ${types.length} document types, ${data.docs.length} documents.`,
  );
  if (data.problems.length > 0) {
    console.warn(`\n${data.problems.length} problem(s):`);
    for (const p of data.problems) console.warn(`- ${p.file}: ${p.message}`);
  }
} catch (error) {
  if (error instanceof ContractError) {
    console.error(
      "The wiki breaks the explorer contract. See docs/wiki/explorer-development.md#wiki-contract",
    );
    for (const p of error.problems) console.error(`- ${p.file}: ${p.message}`);
    process.exit(1);
  }
  throw error;
}
