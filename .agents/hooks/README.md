# Hook ingest artifact

Generated. Do not edit `index.mjs` by hand.

Rebuild from the CLI container:

```bash
cd cli
bun run build
```

That writes this folder’s `index.mjs` (`bun build src/index.ts --target=node --format=esm --outfile=../.agents/hooks/index.mjs`).

Harness configs invoke it:

```text
node .agents/hooks/index.mjs ingest {cursor|claude|copilot} [hookEventHint]
```

Do not emit to `cli/dist`. Do not use `tsc -p tsconfig.build.json` as the product build (`.js`). Track `index.mjs`; this folder gitignores `*.js` and `*.map`.
