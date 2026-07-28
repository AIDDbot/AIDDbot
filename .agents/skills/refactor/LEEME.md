---
name: refactor
description: Audit one container for accumulated decay and capture it as a non-functional spec.
user-invocable: true
disable-model-invocation: true
---
# Refactorizar — auditar un contenedor y capturar su deuda como especificación

Actúas como Auditor de Código. Te apartas de cualquier funcionalidad concreta y lees el código *acumulado* de un contenedor buscando decadencia que ninguna revisión por especificación puede ver: duplicación repartida entre funcionalidades, UX inconsistente, deriva estructural.

Lo que encuentras no es un informe: es una especificación **no funcional**, con el mismo formato y el mismo ciclo de vida que una funcional. Tú capturas el *qué* y el *porqué* de la deuda; el *cómo* lo decide el paso de planificación.

## Reglas

- **Nunca edites código** — solo capturas la deuda; el trabajo lo planifica y ejecuta el resto del ciclo.
- **Un contenedor por auditoría** — es la unidad del resto del ciclo; auditar toda la app son varias pasadas, una especificación cada una.
- **Cada auditoría es independiente** — una especificación no funcional registra un pago de deuda concreto y se cierra; nunca la enmiendas, porque al publicarse el código ya cambió y no queda nada que describir.
- **Serie propia** — los ids van por la serie `N`, separada de la secuencia de las funcionalidades; nunca tomes un número de aquella ni la hagas avanzar.
- **Nunca dos abiertas sobre el mismo contenedor** — si ya hay una en `pending`, `planned` o `in-progress`, se termina o se descarta antes de auditar otra vez; si no, dos ramas y dos planes se pisan.
- **Solo lo no funcional** — todo lo que captures preserva el comportamiento; si el arreglo cambiaría lo que afirma una prueba e2e en verde, es una funcionalidad y se la devuelves al humano.
- **Criterios comprobables** — cada criterio se verifica con una compuerta nombrada o con el suite; "el código queda más limpio" no es un criterio.
- **Fuera del PRD** — no añadas línea al índice; solo cataloga funcionalidades, porque su audiencia es el negocio.
- **Sin decadencia no hay especificación** — si el contenedor está sano, no escribas nada e infórmalo.

## Contexto

- **Entrada opcional** — el contenedor a auditar; si no te lo dan, escoge uno y dilo, o pregunta si hay duda.
- **Referencias** — la [guía de claridad de código](./references/refactor.patterns.md), la [guía de UI y accesibilidad](./references/ui.patterns.md), la [guía de triage](./references/triage.md) y la [plantilla de especificación no funcional](./assets/spec.template.md); y el `{container}.rules.md` del contenedor junto a `arch/system.arch.md`.

## Investiga

Fija el contenedor a auditar y lee su arquitectura y su `{container}.rules.md` —el estándar contra el que mides—, y lista los archivos en alcance.

Comprueba antes de nada que no haya ya una especificación no funcional abierta sobre ese contenedor: no hay índice que consultar, así que mira en `specs/` las carpetas de la serie `N` y descarta las que estén `done`. Si encuentras una viva del mismo contenedor, para y dilo.

Si no, deriva la clave `{spec_key}` como `{spec_id}-{slug}`: el id es el siguiente libre de la serie `N` —`N001`, `N002`…, propia y separada de la secuencia de las funcionalidades— y el slug es el nombre del contenedor. Esa clave da nombre a la carpeta y a la rama.

## Planifica

Lee tus guías de claridad de código y de UI y accesibilidad, la guía de triage y la plantilla. Recorre cada archivo del alcance por cada lente —claridad, estructura, UI, accesibilidad— y anota lo que encuentres con su severidad; un patrón que se repite es una sola anotación que dice cuántos sitios toca.

Convierte después esas anotaciones en el contenido de la especificación: la evidencia va tal cual, y cada decadencia se reescribe como criterio comprobable con la compuerta que lo juzga. Reserva siempre el primer criterio a la no regresión del suite e2e, y aparta a `Out of scope` cualquier arreglo que cambiaría el comportamiento.

## Ejecuta

Ponte en la rama correcta: quédate en `refactor/{spec_key}` si ya estás a mitad de ciclo, o sácala nueva desde el default actual. Escribe `specs/{spec_key}/spec.md` con `kind: non-functional`, la categoría no funcional que corresponda y `status: pending`; numera los criterios `AC-{spec_id}.{n}`, todos sin marcar.

Confirma con un commit `docs(refactor): …`. Después delega en el paso de planificación; si el contenedor estaba sano y no escribiste especificación, dilo y termina ahí.

## Verificación

- [ ] Existe `specs/{spec_key}/spec.md` con `kind: non-functional`, en el formato de la plantilla y sin marcadores de posición — o no existe y el contenedor está sano.
- [ ] Cada anotación de evidencia tiene su archivo, su línea y su severidad.
- [ ] Los criterios están numerados `AC-{spec_id}.{n}`, cada uno nombra la compuerta que lo comprueba, y el primero es la no regresión del suite.
- [ ] El `{spec_id}` es el siguiente libre de la serie `N` y la secuencia de las funcionalidades quedó intacta.
- [ ] Todo lo capturado preserva el comportamiento; lo que no, está en `Out of scope` y se le dijo al humano.
- [ ] Ninguna otra especificación no funcional del mismo contenedor quedó abierta.
- [ ] No se añadió línea al PRD ni se editó una sola línea de código.
