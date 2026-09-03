---
name: ship-implementation
description: Verifica, cualifica y entrega una especificación o un cambio implementado.
---
# ship-implementation

El objetivo de este comando es revisar y entregar todo el alcance implementado.

- Crea un nuevo subagente **Craftsman** para ejecutar la skill [`verify`](../../skills/verify/SKILL.md) con la especificación o el cambio completo en alcance.

- _TRIAGE_ del informe funcional:
  - _IF_ `verify` encuentra defectos funcionales o E2E, ejecuta [`fix-defects`](./fix-defects.command.md) con su informe y reinicia este comando desde `verify`.
  - _IF_ `verify` no encuentra defectos, continúa con la evaluación técnica.

- Crea un nuevo subagente **Craftsman** para ejecutar la skill [`qualify`](../../skills/qualify/SKILL.md) con el mismo alcance.

- _TRIAGE_ del informe técnico:
  - _IF_ `qualify` encuentra defectos técnicos o de calidad, ejecuta [`fix-defects`](./fix-defects.command.md) con su informe y reinicia este comando desde `verify`.
  - _IF_ `qualify` no encuentra defectos, continúa con la entrega.

- Crea un nuevo subagente **Craftsman** para ejecutar la skill [`shipify`](../../skills/shipify/SKILL.md) con el mismo alcance.

Devuelve un informe corto con el resultado de la entrega.
