# Fase 2 · Inventario: qué sale al Archetype Builder

> Fuente: `.agents/skills/` en v0.3.12 (2026-10-13). Decisiones D4 y D5.
> Criterio: **Queda** = lo usa la fundación con una biblioteca, o el brownfield. **Sale** = solo sirve para fabricar un arquetipo. **Cambia** = el fichero queda, pero pierde su parte de arquetipo bajo demanda.

## `architect-system-foundation` (2131 líneas)

| Fichero | Líneas | Destino | Motivo |
| --- | ---: | --- | --- |
| `SKILL.md` | 56 | Cambia | Sin `Craftsman` (solo trabajaba sin biblioteca). Greenfield = solo con biblioteca. |
| `references/propose.md` | 18 | Cambia | Fuera: preguntas de tecnología, `ecosystems.md`, `select … on demand`, arquetipo bajo demanda. Dentro: «si ninguna biblioteca encaja, dilo y para». |
| `references/scaffold.md` | 66 | Cambia | Queda la sección «Library». Salen «Step 2» (generador oficial, reorganizar) y casi todo «Step 3» (`upgrade`, pins, prueba de fronteras, config de `format`): son trabajo del Builder. |
| `references/deliver.md` | 33 | Cambia | Sale la tabla de 8 specs y su entrega una a una. Quedan «With a library» y «The close». |
| `assets/archetypes.md` | 34 | Cambia | Fuera: «Other projects» y «or an archetype made on demand». |
| `assets/system.template.md` | 43 | Cambia | Fuera: «on demand: {technology}» y la sección «Archetypes made on demand». |
| `assets/foundation/*.spec.md` (8) | 679 | **Sale** | Specs genéricas. Las bibliotecas traen sus instancias en `foundation/`. |
| `assets/project.AGENTS.template.md` | 142 | **Sale** | Plantilla del `AGENTS.md` de un arquetipo. Las bibliotecas traen su `AGENTS.md`. |
| `assets/ecosystems.md` | 123 | **Sale** | Guía de tooling por ecosistema para rellenar la plantilla anterior. |
| `assets/oxlint.boundaries.json` | 366 | **Sale** | Configuración de fronteras para un arquetipo nuevo. Base ya la trae. |
| `assets/oxlint.boundaries.e2e.json` | 73 | **Sale** | Igual, para `e2e`. |
| `assets/oxlint.complexity.json` | 76 | **Sale** | Igual, límites de complejidad. |
| `assets/theme/*.css` (3) | 422 | **Sale** | Tema de marca. Base ya lo trae en `front/`. |

**Resultado estimado:** salen ~1880 líneas (88 %). La skill queda en ~200 líneas.

## Otras skills y docs

| Fichero | Destino | Motivo |
| --- | --- | --- |
| `outline-system/assets/AGENTS.template.md` | Queda | Lleva el Blueprint (principios) del `AGENTS.md` raíz. El Blueprint es de AIDDbot (D5). |
| `rule-project/assets/project.AGENTS.template.md` | Queda | Es otra plantilla (brownfield). No es la del Builder. |
| `define-spec/references/foundation-spec.md` | Cambia (D10) | Queda con un nombre genérico: «spec desde un fichero dado». El Builder lo usa para entregar cada spec genérica. |
| `docs/AIDD.workflow.md` (líneas 41, 76) | Cambia | Quita «or one made on demand» y la frase del Architect que rellena el Blueprint. |
| `docs/principles/README.md` (línea 20) | Cambia | Enlaza `project.AGENTS.template.md` y `ecosystems.md`: pasan a enlazar el repo del Builder. |
| `docs/how-it-works.md` (línea 38) | Cambia | «Each project starts from an archetype» → «from a library»; qué pasa si ninguna encaja. |

## Repo `AIDDbot/archetype-builder` (primer contenido)

```
README.md                      ← qué es, para quién (el humano, D4), cómo se usa hoy
blueprint/
  project.AGENTS.template.md
  ecosystems.md
  foundation/*.spec.md         ← las 8 specs genéricas (+ `usage` en la fase 3)
  oxlint/*.json
  theme/*.css
procedure.md                   ← lo que sale de scaffold.md (Step 2, Step 3) y deliver.md (tabla de specs)
```

Sin herramienta todavía (plan, fase 2). `procedure.md` guarda el saber de cómo se fabricó Base y CLI, para no perderlo.

## Dudas

✅ **P10 → D10. ¿Cómo fabrica el Builder un arquetipo, si AIDDbot ya no tiene el camino bajo demanda?** Base y CLI se fabricaron con AIDDbot: fundación bajo demanda y entrega de las specs genéricas con `build-requested-spec`. Opciones:
- **a.** El Builder usa AIDDbot tal cual: cada spec genérica se entrega como una petición normal («Deliver the spec from this file»). Para eso, `define-spec` conserva `foundation-spec.md`, pero con un nombre genérico: «spec desde un fichero dado». Y `procedure.md` del Builder dice cómo hacer el scaffold sin AIDDbot.
- **b.** El Builder tiene sus propias skills, que se instalan en el repo del arquetipo. Más trabajo, y duplica parte de AIDDbot.

Recomendación: **a**. Es lo mínimo, y deja la decisión de una herramienta real para cuando hagas otra biblioteca.
> **R:** Opción a. El Builder usa AIDDbot tal cual.

✅ **P11 → D11. ¿Qué pasa con la marca (tema) si un usuario quiere otro aspecto?** Hoy el tema vive en `front/` de Base, y el dueño lo cambia en su proyecto (`ecosystems.md`). Al salir el tema, nada cambia para el usuario: lo sigue teniendo en su copia de Base. ¿Conforme?
> **R:** Por ahora, la marca es la del humano (el autor de AIDDbot). Más adelante veremos cómo facilitar que un usuario la cambie.
