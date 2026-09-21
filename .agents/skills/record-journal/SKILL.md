---
name: record-journal
description: Append one human-readable process event without disturbing journal order.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# record-journal

Your goal is to append one event to the process journal `.aiddbot/journal.log`.

Run `node .agents/skills/record-journal/scripts/append.mjs` from the repository root with `--flow`, `--stage`, `--event`, `--status`, and `--summary`. Pass `--spec`, `--project`, or `--revision` only when the event has that value. Do not construct the line, timestamp, or path yourself.

Use the flow the orchestrator supplied: `arch` for `architect-system-foundation`, `build` for `build-requested-spec`, or `craft` for `craft-lasting-quality`. When a primitive runs without an orchestrator, use `direct`. Pass the spec ID, such as `S0012`, not its key.

The script creates `.aiddbot/` and keeps `journal.log` out of Git. On the first event it writes the date header and a comment line naming the columns. It reads the system clock immediately before appending and writes one complete event line with the status immediately after the timestamp, rendering `green` as `Info`, `amber` as `Warn`, and `red` as `Error`. Status is exactly six characters; flow, spec, stage, event, project, and revision are exactly eight. Longer values are truncated and shorter values are padded on the right with spaces. Keep the status spellings and capitalization exact so IDE log coloring recognizes them. The final summary remains untruncated and single-line.

Physical line order is canonical. Never edit, delete, reorder, or backdate existing journal content.

The result is one appended process event.

Do not stage or commit the journal.
