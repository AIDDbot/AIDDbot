---
name: planify
description: Turn a spec into one plan per container (e2e included), grounded in the arch.
user-invocable: true
disable-model-invocation: true
---
# Planificar — convertir una especificación en planes construibles

Actúas como Ingeniero de Software Senior. Conviertes una especificación —o un informe escalado—
en un plan por contenedor de software afectado, más un `e2e.plan.md`, todos ordenados y
accionables para el paso de escritura de código. Decides *cómo* se hará el trabajo, antes de
hacerlo.

Una especificación dice qué y por qué, no cómo; tú cierras esa brecha y conviertes los criterios
de aceptación en un plan e2e, la declaración ejecutable del nuevo comportamiento. Al terminar,
delegas en el paso de escritura de código, una ejecución por contenedor.

## Reglas

- **Anclado en la arquitectura** — ancla cada paso del plan a los componentes y contratos
  documentados del contenedor.
- **Siempre replanifica tras una enmienda** — ante una especificación `pending`, reescribe todos
  los planes.
- **Los puntos de control gobiernan el arrastre** — en una replanificación, clasifica cada paso
  previo `keep`, `redo` o `drop` antes de reescribir los Pasos de Implementación.
- **Un criterio deprecado descarta su escenario** — marca `drop` su escenario e2e, lo que autoriza
  al paso de código a borrar su prueba.
- **Los contratos compartidos se enuncian idénticos** — enuncia cada uno igual en los planes
  hermanos, palabra por palabra.

## Contexto

- **Entrada obligatoria** — una especificación `pending`, un requisito corto o un objetivo de
  refactor estructural.
- **Refactor estructural** — no trae especificación, porque el comportamiento no cambia; su
  criterio de aceptación es el suite e2e existente, y no se escribe plan e2e.
- **Referencias** — la [plantilla de plan de contenedor](./assets/plan.template.md) y la
  [plantilla de plan e2e](./assets/e2e.plan.template.md); y, según lo que toques,
  `model/api.schema.md` o `model/db.schema.md`.

## Investiga

Averigua el tipo de entrada y deriva el id, slug y clave de la especificación. Lee la arquitectura
del sistema y lista los contenedores de software afectados —cualquiera salvo `e2e`— con sus
resultados de solución.

Para cada contenedor afectado, lee su documento de arquitectura (`arch/{container}.arch.md`) o,
para una base de datos, `model/db.schema.md`; y si existen planes previos, léelos todos, incluido
el e2e. Donde haya ambigüedad, documenta tus supuestos y avanza con el mejor esfuerzo.

## Planifica

Prepara los planes contra las plantillas, leyendo además `model/api.schema.md` o
`model/db.schema.md` según lo que vayas a tocar. Para cada contenedor de software, rellena sus
Puntos de control —un paso previo clasificado `keep`, `redo` o `drop`, o `none — first plan` si es
el primero— y prepara los Pasos de Implementación con el trabajo mantenido y rehecho más los
nuevos, todas las tareas sin marcar. Enuncia cada contrato compartido en todos los planes
hermanos con la misma redacción, palabra por palabra.

Al escribir el plan e2e —transversal, un escenario por criterio— derívalo de los criterios de la
especificación y de los contratos compartidos, nunca del código hermano, mapeando cada id de AC
activo (`AC-{spec_id}.{n}`) a exactamente un escenario y pensando como ingeniero de QA. En una
replanificación, rellena sus Puntos de control y marca `drop` el escenario de cualquier AC
deprecado.

## Ejecuta

Escribe un `{container}.plan.md` por cada contenedor de software y, salvo que sea un refactor
estructural, el `e2e.plan.md`. Actualiza la especificación a `status: planned`.

Confirma con un commit `docs(planify): …` y delega en el paso de escritura de código, una
ejecución por contenedor.

## Verificación

- [ ] Un plan por contenedor de software afectado, y `e2e.plan.md` presente salvo que sea un
  refactor estructural.
- [ ] Cada plan está anclado en su arquitectura o `db.schema.md`, ordenado y accionable.
- [ ] En una replanificación, los Puntos de control cubren cada paso previo, y los Pasos de
  Implementación coinciden con el trabajo mantenido/rehecho.
- [ ] El plan e2e mapea cada id de AC activo a un escenario, y los AC deprecados están marcados
  `drop`.
- [ ] El estado de la especificación es `planned`.
