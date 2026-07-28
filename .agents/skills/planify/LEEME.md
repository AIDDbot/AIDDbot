---
name: planify
description: Turn a spec into one plan per container (e2e included), grounded in the arch.
user-invocable: true
disable-model-invocation: true
---
# Planificar — convertir una especificación en planes para construir software

Actúas como Ingeniero de Software Senior. Conviertes una especificación —funcional o no funcional, da igual de dónde venga— en planes para construir software. Haces un plan para cada pieza de software ejecutable o desplegable de forma independiente.

Decides el *cómo* se hará el trabajo, antes de hacerlo. Los planes se componen de pasos ordenados con tareas concretas para la escritura de código de producción y sus tests unitarios. Las pruebas e2e necesitan un plan propio sin tests unitarios.

## Reglas

- **Basado en la arquitectura** — los documentos de arquitectura deben guiar la redacción de los planes.
- **Expón los contratos** — detalla el modelo de los datos que publicas o consumes en un API o una base de datos.
- **Un plan por contenedor afectado** — e2e incluido cuando el cambio lo alcanza. El `kind` decide qué contiene ese plan, nunca si existe: sin plan nadie tiene mandato para tocar el suite, y tocarlo sin mandato es como se afloja una aserción.
- **Presta atención a las enmiendas** — ante un cambio de especificación clasifica cada paso previo `keep`, `redo` o `drop`.
- **Un criterio deprecado descarta su escenario** — marca `drop` su escenario e2e, para borrar su prueba.

## Contexto

- **Entrada obligatoria** — una especificación en `status: pending`, funcional o no.
- **Un contenedor** — trabajas en un contenedor de cada vez; si no te lo dan, escoge uno.
- **Carpeta de trabajo** — siempre `specs/{spec_key}/`; ahí se leen y escriben los planes, junto a la especificación que los origina.
- **Referencias** — la [plantilla de plan por contenedor](./assets/plan.template.md) y la [plantilla de plan específico e2e](./assets/e2e.plan.template.md); y, según lo que toques, `model/api.schema.md` o `model/db.schema.md`.

## Investiga

Deriva la clave `{spec_key}` de la especificación y con ella la carpeta de trabajo. Lee su cabecera: el `kind` te dice qué contendrá el plan e2e, y la categoría y el contenedor acotan lo que vas a tocar. Lee después la arquitectura del sistema y la del contenedor en curso.

Si es necesario lee también el modelo de datos de la base de datos, `model/db.schema.md`, o del API, `model/api.schema.md`. Si existen planes previos en la carpeta de trabajo, léelos todos, incluido el e2e. Donde haya ambigüedad, documenta tus supuestos y avanza escogiendo la opción más sencilla que resuelva el problema.

## Planifica

Prepara los planes contra la plantilla del contenedor de producción o de pruebas e2e. Si expone o consume un contrato de datos, haz que sea idéntico en ambos extremos. Ordena los pasos, detalla las tareas, pero no caigas en micro-management ni ejemplos de código.

Necesitamos un sistema de control para el caso de rehacer un plan por una enmienda a una especificación. Crea una lista de los pasos del plan previo y clasifica cada uno como `keep`, `redo` o `drop`. Deja marcadas las tareas que no deban tocarse y especifica claramente lo que debe ser eliminado con este cambio.

## Ejecuta

Escribe un `{container}.plan.md` por cada contenedor de software afectado en `specs/{spec_key}/`, y el `e2e.plan.md` si el contenedor e2e está afectado: en una funcional siempre, porque cada criterio necesita su escenario; en una no funcional solo si la decisión alcanza la superficie por la que las pruebas hablan con la aplicación. Actualiza su estado a `status: planned`.

Confirma con un commit `docs(planify): …`. Después delega en el paso de escritura de código.

## Verificación

- [ ] Un plan por cada contenedor de software afectado en `specs/{spec_key}/`.
- [ ] Cada plan está basado en su arquitectura y respeta los modelos de datos.
- [ ] Si el plan es de una enmienda, dispone de puntos de control para mantener, rehacer o eliminar código.
- [ ] Si la especificación es funcional, su plan e2e mapea cada id de AC activo a un escenario, y los AC deprecados están marcados `drop`.
- [ ] Si es no funcional y alcanza a e2e, su plan dice qué adaptador cambia y afirma que ningún escenario cambia de veredicto; si no la alcanza, no hay plan e2e.
- [ ] El estado de la especificación es `planned`.
