# Flujo de artefactos — negocio vs. arquitectura

Vista en español del proceso desde sus artefactos: qué **consume** (←) y qué **produce** (→) cada
skill, separado en dos dimensiones —lo que toca del **producto/negocio** y lo que toca de la
**arquitectura/tecnología**—. Complementa la doc canónica del workflow
([AIDD.workflow.md](./AIDD.workflow.md)), que es la imagen completa en inglés.

## Qué consume y produce cada skill

| Skill | Producto / Negocio | Arquitectura / Tecnología |
|---|---|---|
| **explore** | ← pistas de problema/solución en los docs<br>→ armazón del **PRD** (párrafo de producto) | ← árbol del repo, archivos de guía<br>→ `AGENTS.md`, `system.arch.md`, `model.schema.md` |
| **extract** | — | ← `system.arch.md`, `AGENTS.md`, fuente del contenedor<br>→ `{container}.arch.md` / `db.schema.md`, `api.schema.md`, `{container}.rules.md`, enlace **Detail** |
| **specify** | ← requisito / descripción de funcionalidad<br>→ `spec.md` (problema, historias, reglas RuleSpeak, **criterios de aceptación**), línea en el PRD | ← `system.arch.md`, `model.schema.md`<br>→ resumen de **solución** (resultados por contenedor) dentro de la spec |
| **planify** | ← criterios de aceptación de la spec<br>→ `e2e.plan.md` (un escenario por AC) | ← arquitectura/esquema de contenedor, formas API/DB<br>→ `{container}.plan.md` por contenedor · spec → `planned` |
| **codify** | ← criterios de la spec (modo e2e)<br>→ spec → `in-progress` (señal de avance) | ← planes, `{container}.rules.md`, formas API/DB<br>→ **código** funcional, pruebas unitarias, suite e2e · pasos del plan marcados |
| **verify** | ← criterios de aceptación<br>→ veredicto por AC · spec → `verified`/`failed` · casillas | ← `e2e.plan.md`, suite e2e, formas API/DB<br>→ `e2e.report.md` (defectos triados por tipo) |
| **review** | → hallazgos de **comportamiento** reingresan a `/specify` | ← código en alcance, `{container}.rules.md`, definiciones de compuertas<br>→ `review.report.md` (veredicto por compuerta, hallazgos) |
| **release** | ← spec verificada<br>→ `CHANGELOG.md` (Added/Changed/Fixed/Removed) · spec → `done` + `released-version` | ← informe de revisión, deriva de docs<br>→ bump de versión, docs de arquitectura/modelo reconciliados, merge + tag, poda de rama |
| **refactor** | → hallazgos de **comportamiento** reingresan a `/specify` | ← código de toda la app, `{container}.rules.md`, lentes<br>→ `refactor.report.md` (hallazgos triados) |

> **skillify** queda fuera: es meta (fuera de la tubería SDLC). No toca artefactos de producto ni
> de arquitectura — produce o arregla las propias skills.

## Diagrama de flujo de artefactos

Colores por dimensión: **verde = producto/negocio**, **azul = arquitectura/tecnología**,
**ámbar = la cadena e2e**, que es la bisagra por donde el negocio (criterios) cruza a la técnica
(pruebas) y vuelve (veredicto). Línea continua = produce; línea punteada = consume/informa.

```mermaid
flowchart TD
  classDef neg fill:#f0fdf4,stroke:#16a34a,color:#166534
  classDef arq fill:#eff6ff,stroke:#2563eb,color:#1e40af
  classDef pnt fill:#fffbeb,stroke:#d97706,color:#92400e
  classDef hum fill:#f8fafc,stroke:#94a3b8,color:#475569

  HUM[HUMANO]:::hum

  PRD["specs/PRD.md<br/>log funcional"]:::neg
  SPEC["spec.md<br/>problema · criterios AC"]:::neg
  CHL["CHANGELOG.md"]:::neg

  AGT["AGENTS.md"]:::arq
  SAR["system.arch.md"]:::arq
  MOD["model.schema.md"]:::arq
  CAR["{container}.arch.md · db.schema<br/>api.schema · {container}.rules.md"]:::arq
  PLN["{container}.plan.md"]:::arq
  COD["código + pruebas unitarias"]:::arq
  RRP["review.report.md"]:::arq
  FRP["refactor.report.md"]:::arq

  EPL["e2e.plan.md"]:::pnt
  E2E["suite e2e"]:::pnt
  ERP["e2e.report.md"]:::pnt

  HUM -->|/explore| AGT
  HUM -->|/explore| SAR
  HUM -->|/explore| MOD
  HUM -->|/explore| PRD
  SAR -->|/extract ×contenedor| CAR

  HUM -->|/specify| SPEC
  SPEC -->|añade línea| PRD
  SAR -.-> SPEC
  MOD -.-> SPEC

  SPEC -->|/planify| PLN
  SPEC -->|/planify| EPL
  CAR -.-> PLN

  PLN -->|/codify| COD
  EPL -->|/codify| E2E
  CAR -.reglas.-> COD

  E2E -->|/verify| ERP
  SPEC -.criterios.-> ERP
  ERP -->|/codify fix| COD

  COD -->|/review| RRP
  RRP -->|/codify fix| COD
  COD -->|/refactor| FRP

  SPEC -->|/release| CHL
  SPEC -->|/release reconcilia| SAR
```

## Lo que se lee de un vistazo

- **explore → specify → release** cargan el peso de **producto/negocio** (PRD, spec, criterios,
  CHANGELOG). El hilo de negocio es la spec y sus `AC-{spec_id}.{n}`.
- **extract, planify, codify, review, refactor** son casi puramente **arquitectura/tecnología**.
- La **cadena e2e** (criterios → `e2e.plan.md` → suite → `e2e.report.md` → veredicto) es la
  bisagra entre ambas dimensiones; **verify** es quien la cruza: consume negocio y produce un
  juicio técnico que actualiza el estado de negocio de la spec.
- Los dos **informes de auditoría** (review, refactor) solo tocan negocio cuando detectan un
  cambio de comportamiento → lo devuelven a `/specify`.
