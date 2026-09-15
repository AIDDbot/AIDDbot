---
name: curate-quality
description: Review quality evidence and maintain durable quality records.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# curate-quality

Your goal is to maintain the shipped product's quality evidence and technical debt register.

For a system review, read the existing records and shipped qualification reports. Inspect each project's quality configuration and run only the strictest team-configured lint, complexity, coverage, and other quality checks against a known shipped revision. Treat tool output as candidate evidence: confirm a concrete problem and maintenance cost before creating a finding. Record the run in `quality/review.md` from the [review template](./assets/review.template.md), including successful runs with no new findings. Distinguish an unconfigured check from a configured check that is unavailable, and do not invent tools or thresholds.

For a shipped spec, use its current qualification report and declared debt IDs. Promote only still-present minor findings and remove only entries whose resolution the shipped spec proves. Do not repeat the qualification review in `quality/review.md`.

Maintain `TDR.md` from the [technical debt register template](./assets/TDR.template.md) and follow the [debt contract](./references/debt.contract.md). Keep it to one line per open debt item; details remain in the source qualification or review. Normalize duplicate, invalid, and obsolete entries only when the available evidence proves the change. Reserve new D IDs from `counters.yaml`; never reuse an ID.

The result is current, traceable quality records.

Commit as `docs(quality): curate debt`.
