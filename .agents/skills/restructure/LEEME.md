---
name: restructure
description: Turn a human's structural directive into a refactor spec with checkable criteria.
user-invocable: true
disable-model-invocation: true
---
# Reestructurar — capturar una decisión estructural como especificación

Actúas como Arquitecto. Recibes del humano una directiva estructural y la conviertes en una
especificación. En ella escribes de forma concisa y formal la razón del cambio y el estado en el
que queda el código una vez aplicada.

No es una funcionalidad: cuando esté aplicada, el producto hace exactamente lo mismo, pero está
construido de otra manera. Capturas el *qué*, el *porqué* y hasta dónde llega; el *cómo* lo decide
el paso de planificación. Controlas el estado y la metadata en la cabecera de la especificación.

## Reglas

- **Sin directiva no hay especificación** — sin la orden del humano, propón candidatas, pregunta y
  no escribas nada.
- **Cada especificación es identificable** — un número secuencial único de tu propia serie `R001`,
  `R002`…, una categoría, un slug que nombre la decisión y no un contenedor, y unas etiquetas de
  contexto; la marcas `kind: refactor`.
- **Una decisión por especificación** — puede alcanzar varios contenedores, y los alcanza juntos,
  pero nunca lleva dos decisiones.
- **Nunca dos solapadas** — una especificación de refactor viva cuyo alcance solape con el tuyo
  tiene que cerrarse o descartarse antes de que abras esta.
- **El comportamiento no se toca** — si la directiva cambia lo que el usuario obtiene, es una
  funcionalidad: devuélvesela al humano.
- **La suite cambia de forma, nunca de veredicto** — un plan puede reescribir *cómo* llega una
  prueba a su resultado, jamás *qué* afirma; ningún criterio funcional vivo deja de cumplirse.
- **Una red que falta es su propia especificación** — la cobertura que la decisión necesita y no
  tiene se convierte en otra especificación de refactor, con `e2e` como único contenedor, cerrada
  antes de que empiece esta.
- **Cada criterio nombra a su juez** — el paso de verificación cuando la suite lo demuestra, y si
  no una de las compuertas de calidad; el primer criterio es siempre la no regresión de la suite.
- **El PRD no se toca** — no cambias lo que el producto hace, así que nunca le añades una línea.
- **Una rama por especificación** — cada especificación tiene su rama, que se borra al liberarla.

## Contexto

- **Entrada obligatoria** — la directiva estructural del humano: qué se homogeneiza, qué se
  extrae, qué se unifica. Si no la tienes, no la inventes.
- **Referencias** — la [plantilla de especificación de refactor](./assets/spec.template.md);
  además de `arch/system.arch.md`, `model/model.schema.md` y el `rules/{container}.rules.md` de
  cada contenedor en alcance.

## Investiga

Pide al humano que aclare el contexto, con una pregunta cerrada cada vez. Parte de la directiva y
acota su radio: lee la arquitectura del sistema y decide qué contenedores alcanza, incluido `e2e`
si el cambio llega a la superficie por la que las pruebas hablan con la aplicación. Después
enumera los lugares afectados, agrupados por contenedor —cada sitio al que llega la decisión, no
una lista de defectos.

Comprueba que no haya ya una especificación de refactor viva que solape con ese alcance: no hay
índice que consultar, así que mira en `specs/` las carpetas de la serie `R` y descarta las que
estén `done`. Deriva `{spec_id}` como el siguiente id `R` libre, y con él la clave
`{spec_id}-{slug}`.

## Planifica

Prepara el contenido contra la plantilla de especificación. Lee el modelo conceptual para usar los
mismos términos, el documento del sistema para proponer el destino contenedor a contenedor, y las
reglas de codificación de cada contenedor en alcance.

Prepara el porqué —qué duele hoy por no haber tomado esta decisión—, el índice de lugares
afectados y lo que queda fuera de alcance. Después propón el estado en el que queda el código una
vez aplicada, y lista los criterios que lo demuestran. Si un criterio no encaja con ningún juez,
afínalo o descártalo.

## Ejecuta

Ponte en la rama correcta: quédate en `refactor/{spec_key}` si ya estás a mitad de ciclo, o sácala
nueva desde el default actual, borrando antes una obsoleta que dejara una publicación previa.
Luego escribe o actualiza `specs/{spec_key}/spec.md` con `kind: refactor` y `status: pending`,
numerando los criterios `AC-{spec_id}.{n}`, todos sin marcar.

Confirma con un commit `docs(refactor): …`. Después delega en el paso de planificación. Si la
directiva resultó ser una funcionalidad, o no había decisión estructural en ella, no escribas
especificación y dilo.

## Verificación

- [ ] Existía una directiva del humano; no se escribió nada sin ella.
- [ ] Existe `specs/{spec_key}/spec.md` con `kind: refactor`, en el formato correcto y sin marcadores.
- [ ] La especificación contiene una sola decisión estructural, y sus lugares afectados están listados por contenedor.
- [ ] Los criterios están numerados `AC-{spec_id}.{n}`; el primero es la no regresión de la suite y el resto nombran a su juez.
- [ ] `{spec_id}` es el siguiente id `R` libre y la secuencia funcional queda intacta.
- [ ] El comportamiento no se toca; lo que lo cambiaría está en `Out of scope` y se le señaló al humano.
- [ ] `e2e` aparece entre los contenedores afectados solo si la decisión alcanza la superficie de pruebas.
- [ ] Ninguna otra especificación de refactor viva solapa con este alcance.
- [ ] No se añadió línea al PRD ni se editó una línea de código.
- [ ] El repositorio está en una rama `refactor/{spec_key}` sacada del default actual.
