---
name: reversify
description: Reverse-engineers an existing (brownfield) project to extract its architecture and key decisions into agent-consumable documentation. Use this skill when onboarding a legacy project into the AIDD workflow, before running planify or codify on an unfamiliar codebase. Trigger on phrases like "reversify this project", "document the architecture", "extract ADRs", or "I need arch docs before planning".
---

# Reversify skill

## Role
Act as a senior software architect.

## Task
Analyze an existing codebase and produce architecture documentation under `{Product_Folder}/arch/`, structured for agent consumption during planning and coding phases.

## Context

### Prerequisites
- `AGENTS.md` exists at the project root (run `/initialize` first if not).

### References
- `AGENTS.md` — provides `{Product_Folder}`, `{Source_Folders}`, and detected tiers.

### Output folder
```
{Product_Folder}/
└── arch/
    ├── system.arch.md   # Always generated
    ├── front.arch.md    # If frontend tier detected
    ├── back.arch.md     # If backend tier detected
    ├── db.arch.md       # If data tier detected
    └── ADR.md           # Always generated
```

### Agent consumption targets
| File | Consumed by |
|------|-------------|
| `system.arch.md` | `planify` — before any cross-tier planning |
| `{tier}.arch.md` | `planify` + `codify` — when working on that tier |
| `ADR.md` | `planify` — to avoid contradicting past decisions |

## Steps

### Step 1: Read AGENTS.md
- [ ] Extract `{Product_Folder}`, `{Source_Folders}`, and tier definitions.
- [ ] Identify which tiers are present (front, back, db, or others).

### Step 2: Explore the codebase
- [ ] Read entry points, configuration files, and dependency manifests per tier.
- [ ] Map top-level module/folder structure per tier — do not read every file.
- [ ] Detect the **code organization pattern** per tier:
  - **Layer-based**: folders named by technical role (`controllers/`, `services/`, `repositories/`, `models/`...)
  - **Feature-based**: folders named by domain concept (`users/`, `orders/`, `invoices/`...)
  - **Hybrid**: feature folders containing internal layers
- [ ] Locate **shared artifact zones**: folders intended for cross-cutting reuse (`shared/`, `common/`, `utils/`, `lib/`, `core/`, or equivalent). Record their paths — do not catalogue their contents.
- [ ] Identify external integrations: databases, third-party APIs, auth providers, message queues, etc.
- [ ] Detect cross-cutting patterns: auth strategy, error handling, logging, API contracts.
- [ ] Identify decisions that are expensive to reverse: ORM choice, DB engine, API style (REST/GraphQL), monorepo vs polyrepo, SSR vs SPA, etc.

### Step 3: Generate system.arch.md
- [ ] Write a C4 System Context diagram (Mermaid) showing the system and its external actors/systems.
- [ ] Write a C4 Container diagram (Mermaid) showing the main deployable units and their interactions.
- [ ] Add a prose section per container: responsibility, technology, and key constraints.
- [ ] Keep it tier-agnostic — no implementation detail.

### Step 4: Generate tier arch files
For each detected tier, generate `{tier}.arch.md` without business logic or product details, focusing on architectural structure and constraints:
- [ ] **Overview**: role of this tier in the system.
- [ ] **C4 Component diagram** (Mermaid): main internal components and their relationships.
  - Limit diagrams to architecturally significant components.
  - Ignore utility/helper/internal-only modules.
  - Prefer readability over completeness.
- [ ] **Code organization**: state the detected pattern (layer-based / feature-based / hybrid) and list the top-level structure with one-line responsibility per module. New code must follow this pattern.
- [ ] **Shared artifacts**: list the paths of shared/common/utils zones. New code must reuse from these locations before creating new abstractions.
- [ ] **Key contracts**: public interfaces, API routes, event schemas, or DB access patterns exposed to other tiers.
- [ ] **Constraints**: what this tier must never do (e.g., "no business logic in controllers", "no direct DB access from front").

For `db.arch.md` specifically, also include:
- [ ] **E-R diagram** (Mermaid) inferred from schema files, migrations, or ORM models.
- [ ] **Migration strategy**: how schema changes are managed.

### Step 5: Generate ADR.md
- [ ] List one ADR per significant decision found. Use this structure per entry:

```markdown
## ADR-{n}: {Short title}
- **Status**: Inferred
- **Decision**: {What was decided}
- **Rationale**: {Why, inferred from code or config evidence}
- **Consequences**: {What this constrains going forward}
```

- [ ] Focus on decisions that constrain planning: framework choices, architectural patterns, API styles, auth mechanisms, data access strategies, and **code organization pattern** (layer-based vs feature-based).
- [ ] Do not document trivial or easily reversible choices.

### Step 6: Confirm with user
- [ ] Present a summary of detected tiers and planned output files.
- [ ] Flag any ambiguities or low-confidence inferences for user confirmation before writing files.

## Output
- [ ] `{Product_Folder}/arch/system.arch.md`
- [ ] `{Product_Folder}/arch/{tier}.arch.md` for each detected tier
- [ ] `{Product_Folder}/arch/ADR.md`

## Verification
- [ ] All Mermaid diagrams render without errors.
- [ ] No placeholder text remains in any file.
- [ ] Every ADR entry has decision + rationale + consequences.
- [ ] A new agent reading only `arch/` can answer: what does this system do, how is it structured, and what must not be changed?