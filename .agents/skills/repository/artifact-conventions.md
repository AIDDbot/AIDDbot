# Artifact conventions

Shared naming and paths for all AIDD skills. Paths use `{Product_Folder}` (default `.product/`) from `AGENTS.md`.

## Slug rules

- Short, lowercase, hyphenated when needed; **under 20 characters** when possible.
- Derived from, in order of precedence:
  1. Existing artifact filename (`checkout.spec.md` → `checkout`)
  2. Feature branch (`feat/checkout` → `checkout`)
  3. Requirement title (user confirms if ambiguous)

## Product artifacts

| Artifact | Pattern | Example |
|----------|---------|---------|
| Spec | `specs/{slug}.spec.md` | `specs/checkout.spec.md` |
| Plan (tiered) | `plans/{slug}.{source}.{tier}.plan.md` | `plans/checkout.spec.back.plan.md` |
| Plan (fullstack) | `plans/{slug}.{source}.plan.md` | `plans/checkout.spec.plan.md` |
| Report | `reports/{slug}.{type}.report.md` | `reports/checkout.verify.report.md` |
| Arch | `arch/{name}.md` or `arch/{tier}.arch.md` | `arch/system.arch.md` |
| Rules | `rules/{name}.rules.md` | `rules/back.rules.md` |
| Design | `design/{slug}/DESIGN.md` | `design/checkout/DESIGN.md` |

`{source}`: `spec` | `report` | omitted for simple requirements.  
`{type}` (reports): `quality` | `compliance` | `accessibility` | `verify`.

## Spec status

See [spec-status.md](../specify/spec-status.md). Only `/release` sets `released`.

## Severity (reports)

Use one value per finding:

| Severity | When to use |
|----------|-------------|
| `critical` | Blocks release or breaks production path |
| `high` | Defect or major standard violation |
| `medium` | Should fix before merge |
| `low` | Minor improvement |
| `info` | Suggestion, no blocking impact |

## Git

Every skill that writes artifacts must **read** [repository SKILL](./SKILL.md) and follow [skill-integrations.md](./skill-integrations.md) before finishing.
