// Builds the static site: data file, theme, and bundled site files.
import { mkdirSync, rmSync } from "node:fs";
import { join, posix } from "node:path";
import type { ExplorerData } from "../shared/types.ts";
import { readData } from "./read.ts";
import { themeCss } from "./theme.ts";

const SITE = join(import.meta.dir, "..", "site");

export interface BuildResult {
  data: ExplorerData;
  outDir: string;
}

/** Reads the documents of `root` and writes the site to `outDir`. */
export async function build(root: string, outDir: string): Promise<BuildResult> {
  const data = await readData(root);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const bundle = await Bun.build({
    entrypoints: [join(SITE, "main.ts"), join(SITE, "styles.css")],
    outdir: outDir,
    target: "browser",
    format: "esm",
    splitting: true,
    minify: true,
    naming: { entry: "[name].[ext]", chunk: "chunks/[name]-[hash].[ext]", asset: "assets/[name]-[hash].[ext]" },
  });
  if (!bundle.success) {
    throw new AggregateError(bundle.logs, "The site bundle failed");
  }
  await Bun.write(join(outDir, "theme.css"), themeCss(await Bun.file(posix.join(root, "DESIGN.md")).text()));
  await Bun.write(join(outDir, "index.html"), Bun.file(join(SITE, "index.html")));
  await Bun.write(join(outDir, "data.json"), JSON.stringify(data));
  return { data, outDir };
}
