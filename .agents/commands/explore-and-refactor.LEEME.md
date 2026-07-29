---
name: explore-and-refactor
description: Document an existing codebase to find architecture drift and refactor it
---
# explore-and-refactor

Documenta una base de código existente de arriba abajo en busca de desajustes de arquitectura y refactoriza la base de código para que sea más consistente.

Ejecuta cada skill en su propio subagente fresco, en una sesión de trabajo nueva, pasándole como
contexto el estado del que quieres que parta.

Primero ejecuta `/explore` para preparar el proyecto y mapear sus contenedores. Luego ejecuta
`/extract` una vez por cada contenedor, documentándolos de uno en uno, comparando el estado actual con el estado esperado y teniendo en cuenta las anotaciones previas de contradicciones, y fallas observadas.

Como resultado genera un documento de trabajo llamado `arch/drift.report.md` que sirva para refactorizar la base de código. Escoge junto al humano la tarea más importante a refactorizar y ejecuta el comando `/spec-refactor` pasándole su contenido.

Marca el resultado de la refactorización en el documento de trabajo y propón el siguiente defecto a refactorizar.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef hum fill:#fef9c3,stroke:#ca8a04,color:#713f12
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef end fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  S([inicio]):::start --> EXP["/explore"]:::nd --> EXT["/extract × contenedor<br/>vs esperado · fallos previos"]:::nd --> RPT["arch/drift.report.md"]:::nd

  RPT --> PICK{"elige el defecto principal"}:::hum
  PICK --> REF["/spec-refactor"]:::nd --> MARK["marca el resultado en el informe"]:::nd --> NEXT{"¿más defectos?"}:::hum
  NEXT -->|fin| E([listo]):::end

  NEXT -.->|sí| PICK
```
