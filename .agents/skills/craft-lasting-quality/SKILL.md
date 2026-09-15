---
name: craft-lasting-quality
description: Reduce existing quality debt.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# craft-lasting-quality

**Craft Lasting Quality**

Your goal is to **reduce existing quality debt** using evidence-backed specifications.

First, spawn a **Craftsman** agent to analyze `{Product_Folder}/quality/findings.md`, qualification reports from shipped specs, and `{Product_Folder}/quality/review.md`, normalizing all findings against the finding contract.

Then, spawn another **Craftsman** agent to inspect each project's quality configurations and run the strictest configured linters, complexity analyzers, and test coverage checks against the shipped revision.

Record all commands, results, and threshold violations in `quality/review.md` using the review template—distinguishing unconfigured checks from failed attempts without inventing tools or thresholds. Ensure results are actionable, evidence is documented, and the index is deduplicated (noting that missing tools do not count as findings or blockers).

Next, spawn an **Architect** agent to review the findings, eliminate invalid or duplicate entries with clear evidence, and select one coherent group for repair. Have the **Architect** express that group as a natural-language repair request with its supporting evidence, without defining a spec, editing the PRD, reserving IDs, or creating a branch.

If no eligible findings remain, return the quality review directly. Otherwise, execute the `build-requested-change` skill with the natural-language repair request. That flow creates the **Architect** responsible for executing `specify` and formally defining the delivery.

Finally, return the shipped repair spec or any concrete blocker.

- The fix specification
- `CHANGELOG.md`
