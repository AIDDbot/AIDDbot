---
name: spec-feature
description: Capture or amend a functional spec, get it validated, then take it to release.
---
# spec-feature

Resuelve una especificación funcional con las entradas que te pasen —una nueva, o la enmienda de
una que ya existe. Tú no decides cuál de las dos: lo decide `/specify`.

Llama a `/specify` para escribirla, y pide al humano que compruebe el resultado antes de avanzar.

Cuando te la haya validado, llama a `/build-spec` para llevar la especificación hasta su
publicación.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef hum fill:#fef9c3,stroke:#ca8a04,color:#713f12
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef end fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  S([inicio]):::start --> SPEC["/specify · crear o enmendar"]:::nd --> CHK{"el humano valida"}:::hum
  CHK -->|ok| BLD["/build-spec"]:::nd --> E([publicada]):::end

  CHK -.->|revisar| SPEC
```
