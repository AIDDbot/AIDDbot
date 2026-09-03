---
name: scope-feature
description: Decide si un requisito necesita una o varias especificaciones coordinadas.
---
# scope-feature

El objetivo de este comando es determinar el alcance de especificación de un requisito.

- Crea un nuevo subagente **Architect** para ejecutar la skill [`scope-change`](../../skills/scope-change/SKILL.md) con el requisito en mano.
- Determina si el requisito afecta a una sola especificación o requiere varias especificaciones coordinadas.

Devuelve un informe corto con la decisión, las especificaciones afectadas y sus acciones de creación o modificación.
