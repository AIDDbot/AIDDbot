// Development server: builds the site, serves it, and builds it again when a document or a site file changes.
// `bun --watch` restarts it when the builder code changes, so the data file never comes from old builder code.
// `bun src/dev.ts [--root <repo>] [--port 4173]`
import { existsSync, watch } from "node:fs";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { ContractError } from "./builder/chapters.ts";
import { build } from "./builder/build.ts";

const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: { root: { type: "string" }, port: { type: "string" } },
});
const root = resolve(values.root ?? resolve(import.meta.dir, "..", "..", ".."));
const out = resolve(import.meta.dir, "..", "dist");
const port = Number(values.port ?? 4173);

async function rebuild(reason: string) {
  const started = performance.now();
  try {
    const { data } = await build(root, out);
    const ms = Math.round(performance.now() - started);
    console.log(
      `[explorer] built (${reason}) in ${ms} ms, ${data.problems.length} problem(s)`,
    );
    for (const p of data.problems) console.warn(`  - ${p.file}: ${p.message}`);
  } catch (error) {
    if (error instanceof ContractError) {
      console.error("[explorer] the wiki breaks the explorer contract:");
      for (const p of error.problems)
        console.error(`  - ${p.file}: ${p.message}`);
    } else {
      console.error("[explorer] build failed:", error);
    }
  }
}

await rebuild("start");

let timer: ReturnType<typeof setTimeout> | undefined;
const schedule = (reason: string) => {
  clearTimeout(timer);
  timer = setTimeout(() => void rebuild(reason), 150);
};
const watched = [join(root, "docs"), join(import.meta.dir)];
for (const folder of watched) {
  watch(folder, { recursive: true }, (_event, file) =>
    schedule(String(file ?? folder)),
  );
}
watch(root, (_event, file) => {
  if (file && /\.md$/i.test(String(file))) schedule(String(file));
});

Bun.serve({
  port,
  async fetch(request) {
    const path = decodeURIComponent(new URL(request.url).pathname);
    const file = join(out, path.endsWith("/") ? `${path}index.html` : path);
    if (!file.startsWith(out) || !existsSync(file))
      return new Response("Not found", { status: 404 });
    return new Response(Bun.file(file), {
      headers: { "Cache-Control": "no-store" },
    });
  },
});
console.log(
  `[explorer] http://localhost:${port}/ (rebuilds on change; reload the page to see it)`,
);
