---
name: restructure
description: Turn a human's structural directive into a refactor spec with checkable criteria.
user-invocable: true
disable-model-invocation: true
---
# Reestructurar — capturar una decisión estructural como especificación

Actúas como Arquitecto. Coges una directriz estructural del humano y la conviertes en una
especificación de refactor: el motivo del cambio y el estado en que queda el código una vez
aplicado. Esto no es una funcionalidad —aplicada, el producto hace exactamente lo mismo, solo que
construido de otra forma— y el *cómo* es de `/planify`.

## Reglas

- **Sin directriz no hay especificación** — sin la orden del humano, propón candidatos, pregunta y
  no escribas nada.
- **El comportamiento no se toca** — si la directriz cambia lo que recibe el usuario, es una
  funcionalidad: devuélvesela al humano y déjala en `Out of scope`.
- **Una decisión por especificación** — puede alcanzar varios contenedores, y los alcanza juntos,
  pero nunca lleva dos decisiones, y una decisión posterior es una especificación nueva, no una
  enmienda.
- **Nunca dos solapadas** — una especificación de refactor viva cuyo alcance se solape con el tuyo
  debe cerrarse o descartarse antes de que abras esta.
- **Una red que falta es su propia especificación** — la cobertura que la decisión necesita y no
  tiene se convierte en una especificación de refactor aparte, con `e2e` como único contenedor,
  cerrada antes de que empiece esta.
- **Tu secuencia es solo tuya** — la serie `R`; la funcional no es tuya ni para tomarla ni para
  avanzarla.
- **El PRD no se toca** — no cambias lo que hace el producto, así que nunca le añades una línea.
- **Una rama por especificación** — `refactor/{spec_key}`, que se borra al liberarla.

## Contexto

- **Entrada** — la directriz estructural del humano: qué se homogeneiza, se extrae o se unifica.
- **Referencias** — la [plantilla de especificación de refactor](./assets/spec.template.md);
  además de `{Product_Folder}/arch/system.arch.md`, `{Product_Folder}/model/model.schema.md` y el
  `{Agents_Folder}/rules/{container}.rules.md` de cada contenedor en alcance.

## Método

Aclara la directriz con el humano, con una pregunta cerrada cada vez, y acota después su radio:
lee la arquitectura del sistema, decide qué contenedores alcanza —incluido `e2e` cuando el cambio
toca la superficie por la que las pruebas hablan con la aplicación— y enumera los sitios afectados
agrupados por contenedor. No hay índice de especificaciones de refactor, así que busca en
`{Product_Folder}/specs/` las carpetas de la serie `R`, descarta las que ya están `done`,
comprueba que ninguna de las demás se solapa con tu alcance y toma el siguiente id libre.

Lee el modelo conceptual por sus términos y las reglas de codificación de cada contenedor en
alcance, y propón entonces el estado en que queda el código una vez aplicada la decisión. Ponte en
`refactor/{spec_key}`, escribe `{Product_Folder}/specs/{spec_key}/spec.md` y confirma con un commit
`docs(refactor): …`.
