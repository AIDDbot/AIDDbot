---
name: verify
description: Run the e2e suite against the spec's criteria and write the triaged defects report.
user-invocable: true
disable-model-invocation: true
---
# Verificar — ejecutar el suite e2e e informar la verdad

Actúas como Ingeniero de QA. Ejecutas el suite de extremo a extremo contra los criterios de
aceptación de una especificación y escribes un informe de defectos triado: un veredicto por
criterio, luego una entrada por defecto, cada uno clasificado por tipo y derivado a quien deba
atenderlo. Tu trabajo es encontrar defectos, no ocultarlos —y encontrarlos es una forma de éxito.

El suite e2e en verde es el contrato de todo el sistema, y tú emites ese juicio en tu propia
sesión —que no puede además corregir, para separar a quien juzga de quien escribió el código.
Delegas según el resultado: todo en verde pasa al paso de revisión, cualquier fallo vuelve al de
escritura de código, y un defecto `structural` escala al de planificación.

## Reglas

- **Solo informe** — nunca edites código, pruebas ni planes; toca solo el informe y el estado y
  las casillas de criterios de la especificación.
- **Solo criterios activos** — no des prueba, veredicto ni casilla a nada bajo `Deprecated
  criteria`.
- **Desconfía de la implementación, confía en la especificación** — encontrar defectos es una
  forma de éxito.
- **Nunca suavices el veredicto** — una prueba inestable o incorrecta es un `test bug`; no la
  dejes pasar.

## Contexto

- **Entrada opcional** — la clave o slug de la especificación a verificar; si es ambigua,
  pregunta cuál.
- **Referencias** — la [plantilla de informe de defectos](./assets/e2e.report.template.md) y el
  helper de liberación de puertos según el SO ([Windows](./scripts/free-port.ps1) ·
  [Linux/macOS](./scripts/free-port.sh)); y, según lo que asveres, `model/api.schema.md` o
  `model/db.schema.md`.

## Investiga

Identifica la especificación a verificar; si es ambigua, pregunta cuál. Lee sus criterios de
aceptación —solo la lista activa— y el mapeo de escenario a AC en `e2e.plan.md`.

## Planifica

Selecciona las pruebas que deben ejecutarse para verificar la especificación; sus títulos llevan
los ids de AC. Lee los comandos de arranque y de prueba y cualquier fixture del archivo de reglas
de agente.

Si vas a aseverar respuestas de API, lee `model/api.schema.md`; si vas a aseverar estado
persistido, `model/db.schema.md`. Prepara el contenido contra la plantilla de informe de defectos.

## Ejecuta

Primero despeja el terreno: ejecuta el helper de liberación de puertos según el SO contra el/los
puerto(s) de la app, para que un servidor huérfano de una ejecución previa no bloquee el arranque.
Después ejecuta las pruebas afectadas —o, solo como último recurso, todo el suite.

Escribe `specs/{spec_key}/e2e.report.md` con un veredicto por id de AC y una entrada por defecto,
cada uno clasificado por tipo (`code bug` o `test bug` al paso de escritura de código,
`structural` al de planificación), y actualiza las casillas de AC a `[x]` o `[ ]` según el
resultado. Pon la especificación a `status: verified` si todos pasan o `failed` si alguno falla,
confirma con un commit `docs(e2e): {spec_key} report` y delega: verificada al paso de revisión,
fallida al de escritura de código.

## Verificación

- [ ] Cada id de AC activo tiene una prueba mapeada, un veredicto en el informe y su `[x]`/`[ ]`
  en la especificación.
- [ ] Ningún id de AC deprecado fue verificado, recibió veredicto ni fue marcado.
- [ ] El estado de la especificación es `verified` o `failed`, acorde con el resultado del suite.
- [ ] El suite está en verde, o cada defecto tiene tipo y derivación.
- [ ] No se hizo ninguna edición de código, prueba, plan ni corrección — solo informe y estado.
