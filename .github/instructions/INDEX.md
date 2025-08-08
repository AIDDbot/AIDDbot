# Instructions Index

This index lists the instruction and prompt files, their scope, and precedence.

## Precedence
- Specific over general (tests > language > general)
- Year/versioned over generic when both exist (e.g., frm-node_2025 over frm-node)

## Language
- lng-typescript.instructions.md — TypeScript guidance
- lng-node-fetch.instructions.md — Node global Fetch API

## Frameworks & Libraries
- frm-node_2025.instructions.md — Node 2025 patterns (preferred)
- frm-node.instructions.md — Legacy/general Node patterns (fallback)
- lib-commander.instructions.md — CLI parsing
- lib-chalk.instructions.md — Terminal styling
- lib-zod.instructions.md — Validation schemas
- pck-node-env-file.instructions.md — Node CLI --env-file usage

## Testing
- tst-node_2025.instructions.md — Node native test runner and mocks (preferred)

## Process & Architecture
- architecture.instructions.md — Overall architecture guidelines
- PRD.instructions.md — How to write PRD
- DOMAIN.instructions.md — How to write DOMAIN
- SYSTEMS.instructions.md — How to write SYSTEMS
- BACKLOG.instructions.md — Backlog conventions

## Notes
- Prompts live in `.github/prompts/` (single source of truth)
- Do not duplicate prompts in `.github/instructions/`
