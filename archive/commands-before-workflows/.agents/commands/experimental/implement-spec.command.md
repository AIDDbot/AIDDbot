---
name: implement-spec
description: Planifica e implementa una especificación validada.
---
# implement-spec

El objetivo de este comando es implementar una especificación ya validada.

- Lee la especificación y mantén la rama de trabajo activa creada por el comando de entrega.

- **Fase de planificación** — para cada contenedor afectado:
  - Crea un nuevo subagente **Builder** para ejecutar la skill [`planify`](../../skills/planify/SKILL.md).
  - Ejecuta todos los contenedores en paralelo.

- _ONCE_ todos los planes estén disponibles, inicia la fase de implementación.

- **Fase de implementación** — para cada plan:
  - Crea un nuevo subagente **Builder** para ejecutar la skill [`codify`](../../skills/codify/SKILL.md).
  - Ejecuta todos los planes en paralelo.

Devuelve un informe corto de la especificación implementada.
