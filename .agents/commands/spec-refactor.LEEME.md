---
name: spec-refactor
description: Define a new refactor spec, get it validated, then take it to release.
---
# spec-refactor

Define una nueva especificación de refactor —un cambio estructural que no toca el comportamiento—
con las entradas que te pasen.

Llama a `/restructure` para crearla, y pide al humano que compruebe el resultado antes de avanzar.

Cuando te la haya validado, llama a `/build-spec` para llevar la especificación hasta su
publicación.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef hum fill:#fef9c3,stroke:#ca8a04,color:#713f12
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef end fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  S([inicio]):::start --> RES["/restructure · tipo: refactor"]:::nd --> CHK{"el humano valida"}:::hum
  CHK -->|ok| BLD["/build-spec"]:::nd --> E([publicada]):::end

  CHK -.->|revisar| RES
```
