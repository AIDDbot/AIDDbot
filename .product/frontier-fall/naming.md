# Naming — fase 6

Fichero de trabajo para los nombres, aparte de `frontier.notes.md` porque esto va a necesitar varias vueltas. Edítalo directamente: cambia la columna **Final**, añade filas, tacha lo que no sirva. Cuando quede una tabla estable la paso a `decisions.md` (D20) y de ahí a `plan.md` 6.1.

## El ABC

Los tres orquestadores son el mnemónico: **A**rquitectura, **B**uild, **C**raft (calidad). `build-requested-spec` conserva "build" a propósito — es la B — aunque el skill entrega mucho más que código (define, construye, verifica, revisa, publica). No toco esa palabra en el orquestador.

```
A  architect-system-foundation   scaffold-system, document-system, document-project
B  build-requested-spec          define-spec, implement-project, verify-acceptance,
                                  review-implementation, ship-spec
C  craft-lasting-quality         inspect-quality
—  (sin pipeline propio)         record-journal, maintain-skills
```

## Tabla completa (14 skills)

| # | Skill actual | Tipo | Qué hace hoy | Nota | Propuesta Claude | Final (tú) |
| --- | --- | --- | --- | --- | --- | --- |
| A0 | `architect-system-foundation` | orq. | Set up the foundation architecture for the system. | Es la A. | Dejar | |
| A1 | `scaffold-system` | prim. | Build only the initial scaffold for a system. | Usa "Build" en su propia descripción aunque vive bajo la A — no es una colisión con la B, es solo inglés; lo anoto para que no despiste. | Dejar | |
| A2 | `document-system` | prim. | Set the system documentation from repository evidence. | Tu propuesta `stablish-system` se solapa con "foundation" del orquestador padre. Hace pareja con A3 (mismo verbo, dos alcances). | Dejar | |
| A3 | `document-project` | prim. | Document one project or subdomain folder. | Tu propuesta `guide-project` deja fuera media función: también escribe esquemas (hechos), no solo reglas ("guía"). | Dejar | |
| B0 | `build-requested-spec` | orq. | Turn a natural-language request into a shipped spec. | Es la B — se queda, según tu corrección. | Dejar | |
| B1 | `define-spec` | prim. | Turn one natural-language request into an approved spec and its proposed PRD edits. | Sin problema. | Dejar | |
| B2 | `implement-project` | prim. | Implement supplied spec scope or repair findings. | Tu propuesta `implement-spec`: el skill itera por proyecto afectado, no por spec entera — `build-requested-spec` ya es "la spec"; este es un paso por proyecto. Alternativa real: `build-project`, mismo patrón que A2/A3 (el verbo de la B baja un nivel, con "project" como objeto). Lo dejo abierto, no lo empujo. | `build-project` o dejar | |
| B3 | `verify-acceptance` | prim. | Execute acceptance tests for one spec and write a verification report. | Tu propuesta `verify-criteria` es más genérica, no más clara. | Dejar | |
| B4 | `review-implementation` | prim. | Review technical quality for one spec implementation. | Sin problema; si B2 cambia a `build-project`, este sigue teniendo sentido igual (revisa "la implementación", como sustantivo, no como nombre de otro skill). | Dejar | |
| B5 | `ship-spec` | prim. | Integrate and close an evidenced spec. | Sin problema; hace pareja con B1. | Dejar | |
| C0 | `craft-lasting-quality` | orq. | Reduce existing quality debt. | Es la C. | Dejar | |
| C1 | `inspect-quality` | prim. | Inspect quality evidence and maintain durable quality records. | Sin problema. | Dejar | |
| M1 | `record-journal` | prim. | Append one human-readable process event without disturbing journal order. | Sin problema. | Dejar | |
| M2 | `maintain-skills` | prim. | Create or maintain a skill under .agents/skills/. | Sin problema; solo desarrollo de AIDDbot (D3). | Dejar | |

## Honestidad

Con el ABC entendido, mi revisión no encuentra más choques reales que los cuatro que tú ya habías anotado. Mi único candidato propio es B2 (`implement-project` → `build-project`), y lo dejo como opción, no como recomendación fuerte — las dos formas son defendibles. Si tienes en la cabeza otro nombre que no encaja y no está en la tabla, añádelo como fila nueva con el mismo formato.

## Preguntas abiertas

🟡 **P25.** ¿B2: `build-project`, `implement-project` (dejar), u otra?
> **R:**

🟡 **P26.** ¿Algo más que quieras meter en la tabla — algún nombre que te sigue sin encajar y que yo no haya tocado?
> **R:**
