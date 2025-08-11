#### 📋 Prompts

Use `/` to invoke predefined prompts. Outputs are deterministic file artifacts. 

#### Architect Prompts (Ab_Architect)

- 📋 **[PRD Generation](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/PRD.prompt.md)** `/PRD`
  - 📦 **docs/PRD.md**: Project goals, requirements, constraints.
- 📋 **[Domain Modeling](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/DOMAIN.prompt.md)** `/DOMAIN`
  - 📦 **docs/DOMAIN.md**: Entities, relationships, business rules.
- 📋 **[Systems Architecture](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/SYSTEMS.prompt.md)** `/SYSTEMS`
  - 📦 **docs/SYSTEMS.md**: System architecture, components, implementation details.

#### Builder Prompts (Ab_Builder)

- 📋 **[Backlog Management](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/BACKLOG.prompt.md)** `/BACKLOG`
  - 📦 **docs/BACKLOG.md**: Epics & features with priorities and status.
- 📋 **[Feature Specification](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.spec.prompt.md)** `/feature.spec`
  - 📦 **docs/feats/f_id.spec.md**: Behavioral specs for a feature.
- 📋 **[Feature Design](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.design.prompt.md)** `/feature.design`
  - 📦 **docs/feats/f_id.design.md**: Technical design for a feature.
- 📋 **[Implementation Plan](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.tasks.prompt.md)** `/feature.tasks`
  - 📦 **docs/feats/f_id.tasks.md**: Task plan.
- 📋 **[Feature Code](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.code.prompt.md)** `/feature.code`
  - 📦 **src/**: Implementation code.

#### Craftsman Prompts (Ab_Craftsman)

- 📋 **[Automated Testing](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.test.prompt.md)** `/feature.test`
  - 📦 **docs/feats/f_id.test.md**: Unit & integration test specs.
  - 📦 **src/**: Test implementation.
- 📋 **[Clean Code Review](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.clean.prompt.md)** `/feature.clean`
  - 📦 **src/**: Refined code.
- 📋 **[Documentation Generation](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/feature.doc.prompt.md)** `/feature.doc`
  - 📦 **src/**: Documented code.
  - 📦 **docs/STRUCTURE.md**: Folder & component overview.
