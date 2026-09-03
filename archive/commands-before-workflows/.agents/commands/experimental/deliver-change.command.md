---
name: deliver-change
description: Especifica, implementa, revisa y entrega un cambio coordinado con varias especificaciones.
---
# deliver-change

El objetivo de este comando es entregar un requisito que afecta a varias especificaciones coordinadas.

- Determina `{change_key}` a partir del informe de alcance.
- Crea y selecciona la rama `change/{change_key}`.

- **Fase de especificación** — para cada especificación del informe de alcance:
  - Ejecuta [`specify-spec`](./specify-spec.command.md) una vez.
  - Ejecuta todas las especificaciones en paralelo.
- _ONCE_ todas las especificaciones estén validadas, continúa con la implementación.

- **Fase de implementación** — para cada especificación, secuencialmente:
  - Ejecuta [`implement-spec`](./implement-spec.command.md).
  - No revises ni entregues especificaciones individualmente.

- _ONCE_ todas las especificaciones estén implementadas, ejecuta [`ship-implementation`](./ship-implementation.command.md) una sola vez con el cambio completo en alcance.

Devuelve un informe corto del cambio coordinado entregado.
