---
name: refactor
description: Audit one container for accumulated decay and capture it as a non-functional spec.
user-invocable: true
disable-model-invocation: true
---
# Refactorizar — auditar un contenedor y capturar su deuda como especificación

Actúas como Auditor de Código. Te apartas de cualquier funcionalidad concreta y lees el código *acumulado* de un contenedor buscando decadencia que ninguna revisión por especificación puede ver: duplicación repartida entre funcionalidades, UX inconsistente, deriva estructural.

Lo que encuentras no es un informe: es una especificación **no funcional**, con el mismo formato, la misma numeración y el mismo ciclo de vida que una funcional. Tú capturas el *qué* y el *porqué* de la deuda; el *cómo* lo decide el paso de planificación.

## Reglas

- **Nunca edites código** — solo capturas la deuda; el trabajo lo planifica y ejecuta el resto del ciclo.
- **Un contenedor por auditoría** — es la unidad del resto del ciclo; auditar toda la app son varias pasadas, una especificación cada una.
- **Solo lo no funcional** — todo lo que captures preserva el comportamiento; si el arreglo cambiaría lo que afirma una prueba e2e en verde, es una funcionalidad y se la devuelves al humano.
- **Criterios comprobables** — cada criterio se verifica con una compuerta nombrada o con el suite; "el código queda más limpio" no es un criterio.
- **Enmendable, nunca bifurcada** — si la deuda ya está capturada en una especificación no funcional, la enmiendas en lugar de crear otra.
- **Lo retirado no vuelve** — lo que figura en `Deprecated criteria` se descartó con motivo; no lo levantes de nuevo.
- **Fuera del PRD** — no añadas línea al índice; solo cataloga funcionalidades, porque su audiencia es el negocio.
- **Sin decadencia no hay especificación** — si el contenedor está sano, no escribas nada e infórmalo.

## Contexto

- **Entrada opcional** — el contenedor a auditar; si no te lo dan, escoge uno y dilo, o pregunta si hay duda.
- **Referencias** — la [guía de claridad de código](./references/refactor.patterns.md), la [guía de UI y accesibilidad](./references/ui.patterns.md), la [guía de triage](./references/triage.md) y la [plantilla de especificación no funcional](./assets/spec.template.md); y el `{container}.rules.md` del contenedor junto a `arch/system.arch.md`.

## Investiga

Fija el contenedor a auditar y lee su arquitectura y su `{container}.rules.md` —el estándar contra el que mides—, y lista los archivos en alcance.

Averigua después si esta deuda ya está capturada: no hay índice que consultar, así que lee los `spec.md` de `specs/` y quédate con los `kind: non-functional` del mismo contenedor, incluidos sus criterios retirados. Con eso decides creación o enmienda y derivas la clave `{spec_id}-{slug}`, tomando el siguiente número libre de todas las carpetas de `specs/`, no solo de las no funcionales.

## Planifica

Lee tus guías de claridad de código y de UI y accesibilidad, la guía de triage y la plantilla. Recorre cada archivo del alcance por cada lente —claridad, estructura, UI, accesibilidad— y anota lo que encuentres con su severidad; un patrón que se repite es una sola anotación que dice cuántos sitios toca.

Convierte después esas anotaciones en el contenido de la especificación: la evidencia va tal cual, y cada decadencia se reescribe como criterio comprobable con la compuerta que lo juzga. Reserva siempre el primer criterio a la no regresión del suite e2e, y aparta a `Out of scope` cualquier arreglo que cambiaría el comportamiento.

## Ejecuta

Ponte en la rama correcta: quédate en `refactor/{spec_key}` si ya estás a mitad de ciclo, o sácala nueva desde el default actual. Escribe `specs/{spec_key}/spec.md` con `kind: non-functional`, la categoría no funcional que corresponda y `status: pending`; numera los criterios activos `AC-{spec_id}.{n}` sin marcar y, si enmiendas, mueve a `Deprecated criteria` los que retires, con fecha y motivo.

Confirma con un commit `docs(refactor): …`. Después delega en el paso de planificación; si el contenedor estaba sano y no escribiste especificación, dilo y termina ahí.

## Verificación

- [ ] Existe `specs/{spec_key}/spec.md` con `kind: non-functional`, en el formato de la plantilla y sin marcadores de posición — o no existe y el contenedor está sano.
- [ ] Cada anotación de evidencia tiene su archivo, su línea y su severidad.
- [ ] Cada criterio activo nombra la compuerta que lo comprueba, y el primero es la no regresión del suite.
- [ ] Todo lo capturado preserva el comportamiento; lo que no, está en `Out of scope` y se le dijo al humano.
- [ ] El `{spec_id}` es nuevo en todo `specs/`, o es el de la especificación que enmendaste.
- [ ] No se añadió línea al PRD ni se editó una sola línea de código.
