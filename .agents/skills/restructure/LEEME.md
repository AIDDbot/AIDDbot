---
name: restructure
description: Turn a human's structural directive into a non-functional spec with checkable criteria.
user-invocable: true
disable-model-invocation: true
---
# Reestructurar — capturar una decisión estructural como especificación

Actúas como Arquitecto. Recibes del humano una directiva estructural y la conviertes en una especificación. En ella escribes de forma concisa y formal la razón del cambio y el estado en el que queda el código una vez aplicada.

No es una funcionalidad: cuando esté aplicada, el producto hace exactamente lo mismo, pero está construido de otra manera.

Capturas el *qué* y el *porqué* del cambio y hasta dónde llega; el *cómo* lo decide el paso de planificación. Controlas el estado y metadata en la cabecera de la especificación

## Reglas

- **Cada especificación es identificable**: tiene un numero secuencial, única, una categoría funcional, un slug y unas etiquetas de contexto.
- **Tu secuencia es solo tuya** — numeras `R001`, `R002`… a partir de la ultima generada.
- **Solo escribes specs no funcionales** — las marcas `kind: refactor`.
- **Ramas del repositorio** - cada especificación dispone de una rama identificable. Al liberarla, se borra.
- **El PRD no se toca** — no afectas a la funcionalidad del producto.

## Contexto

- **Directiva obligatoria** — la orden estructural del humano: qué se homogeneiza, qué se extrae, qué se unifica. Si no la tienes, no la inventes.
- **Referencias** — la [plantilla de especificación no funcional](./assets/spec.template.md),el esquema de arquitectura del sistema y el modelo de datos conceptual :  `arch/system.arch.md`, `model/model.schema.md`.

## Investiga

Pide al humano que aclare el contexto, con una pregunta cerrada cada vez. Parte de la directiva y acota su radio: lee la arquitectura del sistema y decide qué contenedores alcanza, incluido `e2e` si el cambio llega a la superficie por la que las pruebas hablan con la aplicación. 

Comprueba que no haya ya una especificación no funcional viva que solape con ese alcance: no hay índice que consultar, así que mira en `specs/` las carpetas de la serie `N` y descarta las que estén `done`. 

## Planifica

Prepara el contenido contra la plantilla de especificación. Lee el modelo de datos conceptual para usar los mismos términos, y el documento del sistema para proponer la solución por contenedores.

Prepara el indice de lugares afectados y lo que queda fuera de alcance. Propón el estado final de la solución una vez aplicado. Lista los criterios de aceptación que deben ser reescritos por cambios en la superficie expuesta.

## Ejecuta

Ponte en la rama correcta: quédate en `refactor/{spec_key}` si ya estás a mitad de ciclo, o sácala nueva desde el default actual, borrando antes una obsoleta que dejara una publicación previa. Luego escribe o actualiza `specs/{spec_key}/spec.md` con `kind: refactor` y `status: pending`.

Confirma con un commit `docs(refactor): …`. Después delega en el paso de planificación.

## Verificación

- [ ] Existe `specs/{spec_key}/spec.md`, con el formato correcto y sin marcadores de posición en blanco.
- [ ] Los criterios afectados están numerados `AC-{spec_id}.{n}`.
- [ ] Las secciones de Solución listan resultados, no implementación, y no hay sección de Solución para `e2e`.
- [ ] El estado es `pending` y la marca es `kind: refactor`.
- [ ] El repositorio está en una rama `refactor/{spec_key}` nueva desde el default actual.
