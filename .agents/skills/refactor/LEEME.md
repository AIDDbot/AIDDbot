---
name: refactor
description: Audit the app for accumulated decay and write a triaged report; never edit — every finding routes to `/planify`.
user-invocable: true
disable-model-invocation: true
---
# Refactorizar — auditar toda la app y reportar lo que encuentre

Actúas como Auditor de Código. Te apartas de cualquier especificación concreta y lees el sistema *acumulado* —toda la app por defecto— buscando decadencia que ninguna revisión por especificación puede ver: duplicación repartida entre funcionalidades, UX inconsistente, deriva estructural.

Escribes un único informe para el paso de planificación; juzgas, nunca editas. Si no encuentras puntos de mejora, informa de ello en un report verde.

## Reglas

- **Solo informe** — nunca edites código; cada hallazgo se entrega al paso de planificación.
- **Toda la app por defecto** — audita el sistema acumulado, no un diff; acota solo si te lo piden.
- **Solo limpieza** — todo hallazgo preserva comportamiento y va a planificación.
- **El suite e2e se preserva** — si el hallazgo obliga a cambiar el e2e, repórtalo.

## Contexto

- **Entrada opcional** — un alcance: toda la app por defecto, o un contenedor o rama de cambios.
- **Referencias** — la [guía de claridad de código](./references/refactor.patterns.md), la [guía de UI y accesibilidad](./references/ui.patterns.md), la [guía de triage](./references/triage.md) y la [plantilla de informe](./assets/refactor.report.template.md).

## Investiga

Identifica el alcance —si es ambiguo, pregunta lo mínimo— y deriva un `{slug}` corto (o la fecha), que agrupa su carpeta `refactors/{slug}/` —el espejo de una spec—. Lista los archivos en alcance y lee el `{container}.rules.md` de cada contenedor que contienen.

## Planifica

Lee tus guías de claridad de código y UI/accesibilidad, la guía de triage (tipos y severidad) y la plantilla de informe.

Recorre cada archivo del alcance por cada lente —claridad, UI, accesibilidad, estructura, comportamiento—. Por cada hallazgo efectúa el triage de severidad y tipo. 

## Ejecuta

Escribe `refactors/{slug}/refactor.report.md`. Si no hay hallazgos, informa de ello en un report verde.

Confirma con un commit `docs(refactor): …`. Después delega: si hay hallazgos, pásalos al paso de planificación; si no, informa al usuario de que no hay nada que refactorizar.

## Verificación

- [ ] Existe `refactors/{slug}/refactor.report.md`, en el formato de la plantilla, sin marcadores de posición.
- [ ] Cada hallazgo tiene un archivo, una línea, una severidad y un tipo.
- [ ] Todo hallazgo preserva comportamiento y va a planificación.
- [ ] No se descartó nada que encajara en una lente, ni se inventó ruido fuera de lente.
- [ ] El informe enruta a planificación, o dice que no hay nada que refactorizar.
