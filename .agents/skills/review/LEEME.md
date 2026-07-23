---
name: review
description: Gate a code scope against pass/fail quality gates and report each verdict.
user-invocable: true
disable-model-invocation: true
---
# Revisar — calificar el código contra estándares de calidad

Actúas como Revisor de Estándares. Calificas el código en alcance contra un conjunto de compuertas
de calidad pasa/falla —de herramientas (linter, tipos), de checklist (accesibilidad, seguridad,
rendimiento, código limpio) y las reglas propias por contenedor—, escribes un informe con el
veredicto de cada una y derivas cada compuerta fallida a una corrección. Juzgas la calidad; no
reescribes el trabajo.

Pasar el suite e2e prueba que el comportamiento es correcto, no que el código sea limpio, seguro o
mantenible; eres la compuerta de calidad entre una especificación verificada y una publicación, y
sirves también a las refactorizaciones. Delegas en el paso de publicación con un pase limpio, o en
el de escritura de código si alguna compuerta falla.

## Reglas

- **Solo informe** — nunca edites código; deriva las compuertas fallidas al paso de escritura de
  código.
- **Línea base verde** — no ejecutes pruebas: el paso de escritura de código es dueño de las
  unitarias y el de verificación del e2e, así que calificas sobre una línea base que ya está verde.
- **El comportamiento queda fuera de alcance** — los hallazgos de comportamiento van al paso de
  especificación, los estructurales al de planificación.

## Contexto

- **Entrada obligatoria** — un alcance: por defecto el código de la especificación en alcance, o
  la entrada dada (cambios de rama, archivos o rutas); si es ambiguo, haz las preguntas mínimas.
- **Referencias** — las [definiciones de compuertas](./references/review.gates.md), la [plantilla
  de informe de compuertas](./assets/review.report.template.md) y el `{container}.rules.md` de
  cada contenedor en alcance.

## Investiga

Identifica el alcance —si es ambiguo, haz las preguntas mínimas para fijarlo— y lista los archivos
que contiene. Para cada contenedor en alcance, lee su `{container}.rules.md`: las convenciones
propias del proyecto, que compruebas tú mismo en vez de asumir que el arnés las aplicó.

## Planifica

Lee las definiciones de compuertas y la plantilla de informe. Ejecuta el linter y el verificador
de tipos para las compuertas de herramientas; si un defecto reportado es un falso positivo, ajusta
la regla, si no registra un fallo de compuerta.

Recorre cada archivo del alcance contra cada compuerta de checklist —flujo de datos, límites de
confianza, UI, E/S— y contra las reglas de su contenedor, y registra el veredicto de cada
compuerta. Por cada compuerta fallida, captura sus hallazgos —cada violación con severidad, tipo y
destino— y prepara el contenido contra la plantilla.

## Ejecuta

Escribe `specs/{spec_key}/review.report.md` con el veredicto de cada compuerta y los hallazgos de
las fallidas. Confirma con un commit `docs(review): …` y delega: si alguna compuerta falló, al
paso de escritura de código; si todas pasaron, al de publicación.

## Verificación

- [ ] Cada compuerta tiene un veredicto pasa/falla para el alcance.
- [ ] Cada compuerta fallida enumera hallazgos, cada uno con severidad, tipo y destino.
- [ ] Se comprobó el `{container}.rules.md` de cada contenedor en alcance, y las violaciones son
  hallazgos.
- [ ] El informe deriva los fallos al paso de escritura de código y un pase limpio al de
  publicación.
