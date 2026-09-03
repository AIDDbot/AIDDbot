---
name: specify-spec
description: Produce y valida una especificación para una parte del requisito.
---
# specify-spec

El objetivo de este comando es producir una especificación validada.

- Crea un nuevo subagente **Architect** para ejecutar la skill [`specify`](../../skills/specify/SKILL.md) con el requisito, el informe de alcance y la especificación afectada en mano.
- _IF_ YOLO no está presente en el prompt, presenta la especificación resultante y detente para su aprobación humana.

Devuelve la especificación resultante.
