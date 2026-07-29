---
name: explore-and-extract
description: Document an existing codebase top to bottom — /explore once, then /extract per container.
---
# explore-and-extract

Documenta una base de código existente de arriba abajo.

Ejecuta cada skill en su propio subagente fresco, en una sesión de trabajo nueva, pasándole como
contexto el estado del que quieres que parta.

Primero ejecuta `/explore` para preparar el proyecto y mapear sus contenedores. Luego ejecuta
`/extract` una vez por cada contenedor, documentándolos de uno en uno.

El resultado es la documentación de la base de código, creada o puesta al día.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef end fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  S([inicio]):::start --> EXP["/explore"]:::nd --> EXT["/extract × contenedor"]:::nd --> E([docs de arch listas]):::end
```
