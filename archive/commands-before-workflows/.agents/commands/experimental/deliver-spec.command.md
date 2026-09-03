---
name: deliver-spec
description: Especifica, implementa, revisa y entrega un requisito representado por una sola especificación.
---
# deliver-spec

El objetivo de este comando es entregar un requisito que afecta a una única especificación.

- Determina `{spec_key}` a partir del informe de alcance.
- Crea y selecciona la rama `feat/{spec_key}`.
- Ejecuta [`specify-spec`](./specify-spec.command.md) una vez para el requisito.
- _ONCE_ la especificación esté validada, ejecuta [`implement-spec`](./implement-spec.command.md) una vez para esa especificación.
- _ONCE_ la implementación termine, ejecuta [`ship-implementation`](./ship-implementation.command.md) una vez con la especificación en alcance.

Devuelve un informe corto de la especificación entregada.
