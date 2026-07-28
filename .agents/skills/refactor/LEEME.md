---
name: refactor
description: Turn a human's structural directive into a non-functional spec with checkable criteria.
user-invocable: true
disable-model-invocation: true
---
# Refactorizar — capturar una decisión estructural como especificación

Actúas como Arquitecto. Recibes del humano una directiva estructural —homogeneizar las rutas que expone un servicio, extraer a una utilidad común una validación repetida, unificar en un componente lo que hoy se dibuja de cinco maneras— y la conviertes en una especificación. No es una funcionalidad: cuando esté aplicada, el producto hace exactamente lo mismo, pero está construido de otra manera.

Tu unidad no es el archivo ni el contenedor: es la decisión, y una sola decisión puede alcanzar a medio repositorio. Capturas el *qué* y el *porqué* del cambio y hasta dónde llega; el *cómo* lo decide el paso de planificación. La decadencia que se ve leyendo un diff no es asunto tuyo: esa la caza la revisión.

## Reglas

- **Sin directiva no hay especificación** — necesitas la orden del humano, sea un encargo directo o el poso de una sesión de exploración; si no la tienes, propón candidatos y pregunta, pero no escribas.
- **Nunca edites código** — solo capturas la decisión; el trabajo lo planifica y ejecuta el resto del ciclo.
- **Una decisión por especificación** — puede cruzar varios contenedores, y los cruza junta; lo que no puede es llevar dos decisiones dentro.
- **Nunca dos abiertas que se pisen** — si hay una especificación no funcional en `pending`, `planned` o `in-progress` cuyo alcance solape con el tuyo, se termina o se descarta antes; si no, dos ramas y dos planes chocan.
- **Serie propia** — los ids van por la serie `N`, separada de la secuencia de las funcionalidades; nunca tomes un número de aquella ni la hagas avanzar.
- **El comportamiento no se toca** — el producto hace lo mismo antes y después; si la directiva cambia lo que el usuario obtiene, es una funcionalidad y se la devuelves al humano.
- **El suite e2e cambia de forma, nunca de veredicto** — puedes reescribir *cómo* una prueba llega al resultado —rutas, selectores, ayudantes—, nunca *qué* resultado afirma; ningún criterio funcional vigente deja de cumplirse.
- **Pruebas nuevas, solo de caracterización** — una prueba e2e nueva solo se admite si afirma comportamiento que ya existe y nadie cubría, y se escribe antes de tocar nada, como red del cambio.
- **Criterios comprobables** — el primero es siempre la no regresión del suite, que juzga la verificación; los demás nombran la compuerta de revisión que los dictamina. "El código queda más limpio" no es un criterio.
- **Fuera del PRD** — no añadas línea al índice; solo cataloga funcionalidades, porque su audiencia es el negocio.

## Contexto

- **Directiva obligatoria** — la orden estructural del humano: qué se homogeneiza, qué se extrae, qué se unifica. Si no la tienes, no la inventes.
- **Referencias** — la [plantilla de especificación no funcional](./assets/spec.template.md), la [lista cerrada de compuertas](../review/references/review.gates.md) de la que tus criterios toman nombre, el esquema de arquitectura `arch/system.arch.md` y el `{container}.rules.md` de cada contenedor que la decisión toque.

## Investiga

Parte de la directiva y acota su radio: lee la arquitectura del sistema y decide qué contenedores alcanza, incluido `e2e` si el cambio llega a la superficie por la que las pruebas hablan con la aplicación. Enumera después los sitios concretos afectados, que son la evidencia de la especificación: no haces una auditoría, haces el censo de lo que la decisión toca.

Comprueba que no haya ya una especificación no funcional viva que solape con ese alcance: no hay índice que consultar, así que mira en `specs/` las carpetas de la serie `N` y descarta las que estén `done`. Si encuentras una que se pise con la tuya, para y dilo; si no, deriva la clave `{spec_key}` como `{spec_id}-{slug}`, donde el id es el siguiente libre de la serie `N` y el slug nombra la decisión, no el contenedor.

## Planifica

Escribe el porqué —qué duele hoy por no haber tomado antes esta decisión— y el qué: el estado en el que queda el código una vez aplicada, dicho en términos que alguien pueda comprobar. Lee el `{container}.rules.md` de cada contenedor en alcance para nombrar ese destino con sus mismos términos.

Convierte después ese estado en criterios. Reserva el primero a la no regresión del suite y haz que los demás describan la estructura resultante, cada uno nombrando la compuerta que lo juzgará, tomada de la lista cerrada; si un criterio no cabe en ninguna, no está lo bastante afilado. Aparta a `Out of scope` todo lo que la directiva roce pero cambiaría el comportamiento, y díselo al humano.

## Ejecuta

Ponte en la rama correcta: quédate en `refactor/{spec_key}` si ya estás a mitad de ciclo, o sácala nueva desde el default actual. Escribe `specs/{spec_key}/spec.md` con `kind: non-functional`, la categoría no funcional que corresponda a la directiva y `status: pending`; numera los criterios `AC-{spec_id}.{n}`, todos sin marcar.

Confirma con un commit `docs(refactor): …`. Después delega en el paso de planificación; si la directiva resultó ser una funcionalidad, o no había decisión estructural que tomar, no escribas especificación: dilo y termina ahí.

## Verificación

- [ ] Hubo una directiva del humano, y nada se escribió sin ella.
- [ ] Existe `specs/{spec_key}/spec.md` con `kind: non-functional`, en el formato de la plantilla y sin marcadores de posición.
- [ ] La especificación recoge una sola decisión estructural, y su evidencia enumera los sitios que alcanza.
- [ ] Los criterios están numerados `AC-{spec_id}.{n}`; el primero es la no regresión del suite y los demás nombran la compuerta que los juzga.
- [ ] El `{spec_id}` es el siguiente libre de la serie `N` y la secuencia de las funcionalidades quedó intacta.
- [ ] El comportamiento queda intacto; lo que lo cambiaría está en `Out of scope` y se le dijo al humano.
- [ ] Ninguna prueba e2e nueva afirma comportamiento que no existiera ya.
- [ ] Ninguna otra especificación no funcional viva solapa con este alcance.
- [ ] No se añadió línea al PRD ni se editó una sola línea de código.
