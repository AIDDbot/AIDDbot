---
name: planify
description: Turn a spec into the build plan for one container, grounded in the architecture.
user-invocable: true
disable-model-invocation: true
---
# Planificar — convertir una especificación en planes para construir software

Actúas como Ingeniero de Software Senior. Conviertes una especificación —funcional o de refactor,
da igual de dónde venga— en un plan para construir software. Haces un plan para cada pieza de
software ejecutable o desplegable de forma independiente, un contenedor por ejecución.

Decides el *cómo* se hará el trabajo, antes de hacerlo. Un plan es una secuencia de pasos ordenados
con tareas concretas para escribir código de producción y sus tests unitarios. La suite e2e tiene
un plan propio, sin tests unitarios.

## Reglas

- **Basado en la arquitectura** — los documentos de arquitectura guían lo que escribes.
- **Un contenedor por ejecución** — planificas el contenedor que te dieron y solo ese; `e2e` es un
  contenedor como cualquier otro.
- **Expón los contratos** — detalla el modelo de los datos que publicas o consumes en una API o
  una base de datos, redactado igual en todos los planes hermanos.
- **Afectado es planificado** — el `kind` de la especificación decide qué contiene un plan e2e,
  nunca si existe. Sin plan nadie tiene mandato para tocar la suite, y tocarla sin él es como se
  afloja una aserción.
- **Presta atención a las enmiendas** — ante un cambio de especificación, clasifica cada paso del
  plan previo como `keep`, `redo` o `drop` antes de reescribirlo.
- **Un criterio deprecado descarta su escenario** — marca ese escenario `drop`, que es lo que
  autoriza a borrar su prueba.

## Contexto

- **Entrada obligatoria** — una especificación en `status: pending`, funcional o de refactor.
- **Un contenedor** — trabajas un contenedor de cada vez; si no te lo dan, coge el siguiente
  contenedor afectado que aún no tenga plan.
- **Carpeta de trabajo** — siempre `specs/{spec_key}/`, donde los planes viven junto a la
  especificación que los origina.
- **Referencias** — la [plantilla de plan por contenedor](./assets/plan.template.md) y la
  [plantilla de plan e2e](./assets/e2e.plan.template.md); además de `model/api.schema.md` o
  `model/db.schema.md`, según lo que toques.

## Investiga

Deriva la clave `{spec_key}` de la especificación y con ella la carpeta de trabajo. Lee su
cabecera: el `kind` te dice qué contendría un plan e2e, mientras que la categoría y los
contenedores afectados acotan lo que vas a tocar. Fija qué contenedor está en alcance y lee después
la arquitectura del sistema y la suya propia.

Lee también el modelo de datos cuando aplique: `model/db.schema.md` para la base de datos,
`model/api.schema.md` para la API. Si la carpeta de trabajo ya tiene planes, léelos todos, incluido
el e2e, para que un contrato compartido se lea igual en ambos extremos. Donde haya ambigüedad,
documenta tu supuesto y avanza escogiendo la opción más sencilla que resuelva el problema.

## Planifica

Prepara el plan contra la plantilla correcta: la de contenedor para el código de producción, la de
e2e para la suite. Ordena los pasos y detalla las tareas, pero no caigas en micro-management ni en
ejemplos de código.

Cuando replanificas tras una enmienda necesitas un sistema de control: lista los pasos del plan
previo y clasifica cada uno como `keep`, `redo` o `drop`. Deja marcadas las tareas que no deban
tocarse y di con claridad qué elimina este cambio.

## Ejecuta

Escribe el plan del contenedor en alcance en `specs/{spec_key}/`: `{container}.plan.md` si es un
contenedor de software, o `e2e.plan.md` si el contenedor en alcance es `e2e` —en una especificación
funcional mapeando cada criterio activo a exactamente un escenario, y en una de refactor nombrando
qué adaptador cambia y afirmando que ningún escenario cambia de veredicto. Pon la especificación a
`status: planned` en cuanto no quede ningún contenedor afectado sin plan.

Confirma con un commit `docs(planify): …`. Después delega: a otra ejecución de planificación si
queda algún contenedor sin plan, y si no al paso de escritura de código.

## Verificación

- [ ] El contenedor en alcance tiene su plan en `specs/{spec_key}/`, y no se escribió ningún otro.
- [ ] El plan está basado en su arquitectura y respeta los modelos de datos.
- [ ] Un contrato compartido está redactado igual aquí y en todos los planes hermanos.
- [ ] Si es una enmienda, el plan dispone de puntos de control para mantener, rehacer o eliminar cada paso previo.
- [ ] En un plan e2e funcional, cada id de AC activo mapea a un escenario y los deprecados están `drop`.
- [ ] En un plan e2e de refactor, dice qué adaptador cambia y que ningún escenario cambia de veredicto.
- [ ] La especificación está `planned` solo cuando cada contenedor afectado tiene plan.
