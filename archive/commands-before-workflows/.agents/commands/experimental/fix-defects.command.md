---
name: fix-defects
description: Corrige los defectos descritos por un informe de verificación o cualificación.
---
# fix-defects

El objetivo de este comando es corregir los defectos encontrados durante la revisión.

- Mantén la rama de trabajo activa de `deliver-spec` o `deliver-change`.
- Crea un nuevo subagente **Builder** para ejecutar la skill [`codify`](../../skills/codify/SKILL.md) con el informe de defectos en mano.
- Limita los cambios a los defectos descritos por el informe y sus pruebas necesarias.

Devuelve un informe corto de los defectos corregidos.
