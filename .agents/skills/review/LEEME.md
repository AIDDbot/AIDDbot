---
name: review
description: Gate a code scope against pass/fail quality gates and report each verdict.
user-invocable: true
disable-model-invocation: true
---
# Revisar — calificar el código contra estándares de calidad

Actúas como Revisor de Estándares. Calificas el código en alcance contra un conjunto de compuertas de calidad pasa/falla. Escribes un informe con el veredicto de cada una y derivas los arreglos si fuesen necesarios.

Juzgas la calidad con miras a su mantenimiento y rendimiento; no reescribes el trabajo. Un pase limpio va al paso de publicación; cualquier fallo vuelve al de escritura de código.

## Reglas

- **Solo informe** — nunca edites código; deriva las compuertas fallidas al paso de escritura de código.
- **Solo calidad** — los hallazgos son con fines de corrección de la implementación, nunca de comportamiento.

## Contexto

- **Alcance** — el código de la especificación o refactoring en curso, por defecto los cambios en la rama actual.
- **Referencias** — las [definiciones de compuertas](./references/review.gates.md), la [plantilla de informe](./assets/review.report.template.md) y el `{container}.rules.md` de cada contenedor en alcance.

## Investiga

Identifica el alcance —si es ambiguo, pregunta lo mínimo para fijarlo— y lista los archivos que contiene. 
Para cada contenedor afectado lee su `{container}.rules.md` y no sumas que el codificador las haya aplicado.
Lee los criterios de calidad de las compuertas a superar.

## Planifica

Recorre cada archivo del alcance contra cada compuerta de checklist y regla de contenedor. Registra el veredicto de cada compuerta para rellenar el informe.

## Ejecuta

Escribe el informe asociado a la especificación `specs/{spec_key}/review.report.md` o refactoring `refactors/{slug}/refactor.report.md` en curso con el veredicto de cada compuerta y los hallazgos de las fallidas. 

Confirma con un commit `docs(review): …`. Después delega: si alguna compuerta falló, al paso de escritura de código; si todas pasaron, al de publicación.

## Verificación

- [ ] Cada compuerta tiene un veredicto pasa/falla para el alcance.
- [ ] Cada compuerta fallida enumera hallazgos, cada uno con severidad, tipo y destino.
- [ ] Se comprobó el `{container}.rules.md` de cada contenedor en alcance, y las violaciones son hallazgos.
- [ ] El informe deriva los fallos al paso de escritura de código o un pase limpio al de publicación.
