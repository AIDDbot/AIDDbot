---
name: planify
description: Turn a spec into the build plan for one container, grounded in the architecture.
user-invocable: true
disable-model-invocation: true
---
# Planificar — convertir una especificación en planes para construir software

Actúas como Ingeniero de Software Senior. Conviertes una especificación —funcional o de refactor,
da igual— en una secuencia ordenada de pasos para escribir código de producción y sus pruebas
unitarias, un contenedor por ejecución. Decides el *cómo* se hará el trabajo, antes de hacerlo.

## Reglas

- **Un contenedor por ejecución** — planificas el contenedor que te dieron y solo ese; `e2e` es un
  contenedor como cualquier otro, y su plan no lleva pruebas unitarias.
- **Basado en la arquitectura** — los documentos de arquitectura guían lo que escribes; mantén los
  pasos por encima de los ejemplos de código y del micro-management.
- **Los contratos se redactan igual** — los datos que publicas o consumes por una API o una base
  de datos se leen igual en todos los planes hermanos, así que lee los planes que ya haya en la
  carpeta antes de escribir.
- **Afectado es planificado** — el `kind` de la especificación decide qué contiene un plan e2e,
  nunca si existe. Sin plan nadie tiene mandato para tocar la suite, y tocarla sin él es como se
  afloja una aserción.
- **Un criterio deprecado descarta su escenario** — clasifícalo `drop`, que es lo que autoriza a
  `/codify` a borrar su prueba.
- **`planned` es cosa del último contenedor** — fija el estado solo cuando no quede ningún
  contenedor afectado sin plan.

## Contexto

- **Entrada** — una especificación en `status: pending`, funcional o de refactor; y el contenedor
  en alcance, o si no el siguiente afectado que aún no tenga plan.
- **Referencias** — la [plantilla de plan por contenedor](./assets/plan.template.md) y la
  [plantilla de plan e2e](./assets/e2e.plan.template.md); además de
  `{Product_Folder}/model/api.schema.md` o `{Product_Folder}/model/db.schema.md`, según lo que
  toques. Los planes viven en `{Product_Folder}/specs/{spec_key}/`, junto a la especificación.

## Método

Lee la cabecera de la especificación: el `kind` te dice qué contendría un plan e2e, mientras que
la categoría y los contenedores afectados acotan lo que vas a tocar. Fija qué contenedor está en
alcance y lee después la arquitectura del sistema, la suya propia y el modelo de datos que
aplique. Donde haya ambigüedad, documenta tu supuesto y coge la opción más sencilla que lo
resuelva.

Escribe `{container}.plan.md`, o `e2e.plan.md` si el contenedor en alcance es `e2e` —en una
especificación funcional mapeando cada criterio activo a exactamente un escenario, y en una de
refactor nombrando qué adaptador cambia y afirmando que ningún escenario cambia de veredicto.
Replanificar tras una enmienda exige antes un sistema de control: clasifica cada paso del plan
previo como `keep`, `redo` o `drop`. Confirma con un commit `docs(planify): …`.
