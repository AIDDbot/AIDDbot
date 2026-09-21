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

Run `node .agents/skills/record-journal/scripts/append.mjs` from the repository root with `--agent`, `--stage`, `--event`, `--status`, and `--summary`. Pass `--spec`, `--project`, or `--revision` only when the event has that value. On the first event, also pass the known `--harness` and `--model`; omit either only when the session does not identify it. Do not construct the line, timestamp, or path yourself.

Pass the active agent: `Architect`, `Builder`, or `Craftsman`. When no named agent owns a direct primitive invocation, pass `Direct`. Pass the spec ID, such as `S0012`, not its key.

The script creates `.aiddbot/` and keeps `journal.log` out of Git. On the first event it writes the date, known harness and model, and the column names. It reads the system clock immediately before appending and writes one complete event line with the status immediately after the timestamp, rendering `green` as `Info`, `amber` as `Warn`, and `red` as `Error`. Status, agent, spec, stage, event, and project are exactly six characters; revision is exactly three. Longer values are truncated and shorter values are padded on the right, with spaces as the only column separator. Agents render as `Arch.`, `Build.`, `Craft.`, or `Direct`. Keep the status spellings and capitalization exact so IDE log coloring recognizes them. The final summary remains untruncated and single-line.

Physical line order is canonical. Never edit, delete, reorder, or backdate existing journal content.

The result is one appended process event.

Do not stage or commit the journal.
