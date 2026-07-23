# Flujo de artefactos — negocio vs. arquitectura

Vista en español del proceso: los **tres escenarios** con los que un humano llega, qué skills
recorre cada uno, y dónde está el **negocio** frente a la **tecnología**. Complementa la doc
canónica del workflow ([AIDD.workflow.md](./AIDD.workflow.md)), que es la imagen completa en
inglés.

## Los tres escenarios

```mermaid
flowchart TB
  classDef neg fill:#dcfce7,stroke:#16a34a,color:#14532d
  classDef tec fill:#dbeafe,stroke:#2563eb,color:#1e3a8a
  classDef hum fill:#fef9c3,stroke:#ca8a04,color:#713f12

  HUM([HUMANO]):::hum

  subgraph S1["🛬 Aterrizo en el proyecto"]
    direction LR
    EXP[explore]:::tec --> EXT[extract]:::tec
  end

  subgraph S2["✨ Quiero crear algo"]
    direction LR
    SPC["specify<br/><i>crea o enmienda</i>"]:::neg --> PLN[planify]:::tec --> COD[codify]:::tec --> VER[verify]:::tec --> REV[review]:::tec --> REL[release]:::neg
  end

  subgraph S3["♻️ Quiero rehacer algo"]
    direction LR
    REF[refactor]:::tec
  end

  HUM --> S1
  HUM --> S2
  HUM --> S3

  VER -.->|falla funcional| COD
  REV -.->|falla calidad| COD
  REF -.->|fallo estructural| PLN

  linkStyle 9,10,11 stroke:#dc2626,color:#dc2626,stroke-width:2px
```

**Leyenda:** 🟢 verde = **negocio** (el *qué* y el *porqué*: capturar y publicar) · 🔵 azul =
**tecnología** (el *cómo*: documentar, construir, juzgar) · 🔴 rojo punteado = **bucles** (un
fallo o una auditoría que reingresa al pipeline).

## Lo que se lee de un vistazo

- **Tres puertas de entrada**, no una: *aterrizo* (preparar el terreno), *creo* (pedir una
  funcionalidad), *rehago* (auditar y limpiar lo acumulado).
- **La enmienda la decide `specify`**, no es una vuelta desde `release`: alguien pide algo y
  `specify` decide si es una spec nueva o la enmienda de una existente.
- **El negocio abre y cierra**: crear algo va de `specify` (negocio) → construir/juzgar
  (tecnología) → `release` (negocio). El humano solo habla negocio en los extremos; el centro es
  técnico.
- **Los bucles contrastan por tipo de fallo**: `verify` detecta fallos **funcionales** y los
  devuelve a `codify`; `review` devuelve fallos de **calidad** a `codify`; `refactor` detecta
  deriva **estructural** y la devuelve a `planify`.

## Detalle — qué consume y produce cada skill

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
| **refactor** | — (un cambio de comportamiento se señala como feature para `/specify`, no es un refactor) | ← código de toda la app, `{container}.rules.md`, lentes<br>→ `refactor.report.md`; **todo hallazgo va a `/planify`** |

> **skillify** queda fuera: es meta (fuera de la tubería SDLC). No toca artefactos de producto ni
> de arquitectura — produce o arregla las propias skills.
