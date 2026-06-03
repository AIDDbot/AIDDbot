# Extract — Greenfield mode

Extract conventions from the ecosystem (prescribe); no existing code to read.

## Convention sources

- Official/community style guides (Google/Airbnb, PEP 8, Effective Go, framework docs).
- Public rule/skill directories ([skills.sh](https://www.skills.sh/), [awesome-copilot](https://awesome-copilot.github.com/)).
- Prefer authoritative, stack-matching sources; adapt, don't copy verbatim.

## `{tier}.rules.md`

- [ ] extract naming, artifact roles, wiring, error handling, and testing conventions from the sources above; reconcile conflicts with ADRs + stack choices (ADRs win). Capture per-role rules in the roles table and write **one** illustrative canonical example for the tier; cite the source guides that drove the rules. Under **Known Deviations**: no deviations yet — greenfield baseline.
