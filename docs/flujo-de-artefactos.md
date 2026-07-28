# Flujo de artefactos — negocio vs. arquitectura

Vista en español del proceso: los **tres escenarios** con los que un humano llega, qué skills
recorre cada uno, y dónde está el **negocio** frente a la **tecnología**. Complementa la doc
canónica del workflow ([AIDD.workflow.md](./AIDD.workflow.md)), que es la imagen completa en
inglés.

## Los tres escenarios

```mermaid
flowchart LR
  classDef neg fill:#dcfce7,stroke:#16a34a,color:#14532d
  classDef tec fill:#dbeafe,stroke:#2563eb,color:#1e3a8a
  classDef hum fill:#fef9c3,stroke:#ca8a04,color:#713f12

  HUM([HUMANO]):::hum

  EXP[explore]:::tec --> EXT[extract]:::tec
  HUM -->|"🛬 aterrizo en el proyecto"| EXP

  HUM -->|"✨ quiero crear algo"| SPC["specify<br/><i>spec funcional</i>"]:::neg
  HUM -->|"♻️ quiero cambiar cómo está construido"| REF["restructure<br/><i>spec de refactor</i>"]:::tec

  SPC --> PLN["planify<br/>×contenedor"]:::tec
  REF --> PLN
  PLN --> COD[codify]:::tec --> VER[verify]:::tec --> QLF[qualify]:::tec --> REL[release]:::neg

  VER -.->|"falla funcional"| COD
  QLF -.->|"falla una compuerta"| COD

  linkStyle 8,9 stroke:#dc2626,color:#dc2626,stroke-width:2px
```

**Leyenda:** 🟢 verde = **negocio** (el *qué* y el *porqué*: capturar y publicar) · 🔵 azul =
**tecnología** (el *cómo*: documentar, construir, juzgar) · 🔴 rojo punteado = **bucles** (un
fallo que reingresa a `codify` hasta quedar en verde).

## Lo que se lee de un vistazo

- **Tres puertas de entrada**, no una: *aterrizo* (preparar el terreno), *creo* (pedir una
  funcionalidad), *rehago* (cambiar cómo está construido lo que ya funciona).
- **La enmienda la decide `specify`**, no es una vuelta desde `release`: alguien pide algo y
  `specify` decide si es una spec nueva o la enmienda de una existente.
- **El negocio abre y cierra**: crear algo va de `specify` (negocio) → construir/juzgar
  (tecnología) → `release` (negocio). El humano solo habla negocio en los extremos; el centro es
  técnico.
- **Dos partos, una especificación**: `specify` la captura del negocio y `restructure` la destila
  de una directiva del arquitecto; convergen en `planify` y a partir de ahí el ciclo es el mismo,
  con el `kind` como única modulación.
- **Los dos bucles vuelven al mismo sitio**: `codify`. `verify` devuelve fallos **funcionales**;
  `qualify`, fallos de **calidad**. Ninguno de los dos edita: juzgan y devuelven.
- **Cada tipo tiene su oráculo**: `verify` dictamina los criterios de una spec funcional con la
  suite e2e; `qualify` dictamina los de una de refactor con sus compuertas.

## Detalle — qué consume y produce cada skill

| Skill | Producto / Negocio | Arquitectura / Tecnología |
|---|---|---|
| **explore** | ← pistas de problema/solución en los docs<br>→ armazón del **PRD** (párrafo de producto) | ← árbol del repo, archivos de guía<br>→ `AGENTS.md`, `system.arch.md`, `model.schema.md` |
| **extract** | — | ← `system.arch.md`, `AGENTS.md`, fuente del contenedor<br>→ `{container}.arch.md` / `db.schema.md`, `api.schema.md`, `{container}.rules.md`, enlace **Detail** |
| **specify** | ← requisito / descripción de funcionalidad<br>→ `spec.md` (problema, historias, reglas RuleSpeak, **criterios de aceptación**), línea en el PRD | ← `system.arch.md`, `model.schema.md`<br>→ resumen de **solución** (resultados por contenedor) dentro de la spec |
| **restructure** | — (un cambio de comportamiento se señala como feature para `specify`, no es un refactor) | ← directiva estructural del humano, `system.arch.md`, `{container}.rules.md`<br>→ `spec.md` con `kind: refactor` en `specs/R{nnn}-{slug}/` (lugares afectados + criterios `AC-R{nnn}.{n}`, cada uno con su juez); **fuera del PRD**, serie propia, sin enmienda |
| **planify** | ← criterios de aceptación de la spec<br>→ `e2e.plan.md` (un escenario por AC) | ← arquitectura/esquema del contenedor en alcance, formas API/DB<br>→ `{container}.plan.md`, uno por ejecución · spec → `planned` cuando no queda ninguno sin plan |
| **codify** | ← criterios de la spec (modo e2e)<br>→ spec → `in-progress` (señal de avance) | ← planes, `{container}.rules.md`, formas API/DB<br>→ **código** funcional, pruebas unitarias, suite e2e · pasos del plan marcados |
| **verify** | ← criterios de aceptación<br>→ veredicto por AC · spec → `verified`/`failed` · casillas | ← `e2e.plan.md`, suite e2e, formas API/DB<br>→ `e2e.report.md` (defectos triados por tipo) |
| **qualify** | → hallazgos de **comportamiento** se devuelven al humano como feature para `specify` | ← código en alcance, `{container}.rules.md`, definiciones de compuertas<br>→ `qualify.report.md` (veredicto por compuerta, hallazgos); en una spec de refactor, también veredicto y casilla por criterio |
| **release** | ← spec verificada<br>→ `CHANGELOG.md` (Added/Changed/Fixed/Removed) · spec → `done` + `released-version` | ← `qualify.report.md`, deriva de docs<br>→ bump de versión, docs de arquitectura/modelo reconciliados, merge + tag, poda de rama |

> **skillify** queda fuera: es meta (fuera de la tubería SDLC). No toca artefactos de producto ni
> de arquitectura — produce o arregla las propias skills.
