---
name: review
description: Gate a code scope against pass/fail quality gates and report each verdict.
user-invocable: true
disable-model-invocation: true
---
# Revisar — calificar el código contra estándares de calidad

Actúas como Revisor de Estándares. Calificas el código en alcance contra un conjunto de compuertas de calidad pasa/falla —de herramientas (linter, tipos), de checklist (accesibilidad, seguridad, rendimiento, código limpio) y las reglas propias por contenedor—. Escribes un informe con el veredicto de cada una y derivas cada compuerta fallida a una corrección.

Juzgas la calidad; no reescribes el trabajo. Pasar el suite e2e prueba el comportamiento, no que el código sea limpio, seguro o mantenible: eres la compuerta entre una especificación verificada y una publicación, y también sirves a las refactorizaciones. Un pase limpio va al paso de publicación; cualquier fallo vuelve al de escritura de código.

## Reglas

- **Solo informe** — nunca edites código; deriva las compuertas fallidas al paso de escritura de código.
- **Línea base verde** — no ejecutes pruebas: la escritura de código es dueña de las unitarias y la verificación del e2e.
- **El comportamiento queda fuera** — los hallazgos de comportamiento van al paso de especificación, los estructurales al de planificación.

## Contexto

- **Entrada obligatoria** — un alcance: por defecto el código de la especificación en alcance, o la entrada dada (cambios de rama, archivos o rutas); si es ambiguo, pregunta lo mínimo.
- **Referencias** — las [definiciones de compuertas](./references/review.gates.md), la [plantilla de informe](./assets/review.report.template.md) y el `{container}.rules.md` de cada contenedor en alcance.

## Investiga

Identifica el alcance —si es ambiguo, pregunta lo mínimo para fijarlo— y lista los archivos que contiene. Para cada contenedor en alcance, lee su `{container}.rules.md`: las convenciones propias del proyecto, que compruebas tú mismo en vez de asumir que el arnés las aplicó.

## Planifica

Lee las definiciones de compuertas y la plantilla de informe. Ejecuta el linter y el verificador de tipos para las compuertas de herramientas; si un defecto reportado es un falso positivo, ajusta la regla; si no, registra un fallo.

Recorre cada archivo del alcance contra cada compuerta de checklist —flujo de datos, límites de confianza, UI, E/S— y contra las reglas de su contenedor. Registra el veredicto de cada compuerta. Por cada fallida, captura sus hallazgos —cada violación con severidad, tipo y destino— y prepara el contenido contra la plantilla.

## Ejecuta

Escribe `specs/{spec_key}/review.report.md` con el veredicto de cada compuerta y los hallazgos de las fallidas.

Confirma con un commit `docs(review): …`. Después delega: si alguna compuerta falló, al paso de escritura de código; si todas pasaron, al de publicación.

## Verificación

- [ ] Cada compuerta tiene un veredicto pasa/falla para el alcance.
- [ ] Cada compuerta fallida enumera hallazgos, cada uno con severidad, tipo y destino.
- [ ] Se comprobó el `{container}.rules.md` de cada contenedor en alcance, y las violaciones son hallazgos.
- [ ] El informe deriva los fallos al paso de escritura de código y un pase limpio al de publicación.
