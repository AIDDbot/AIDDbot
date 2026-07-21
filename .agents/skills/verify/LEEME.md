# Verificar — ejecutar el suite e2e e informar la verdad

`/verify` ejecuta el suite de extremo a extremo contra los criterios de aceptación de una
especificación y escribe un informe de defectos triado: un veredicto por criterio, más una
entrada por defecto, clasificado por tipo y derivado a la skill que debe atenderlo. Es
estrictamente solo-informe: nunca edita código, pruebas ni planes. Actúa como Ingeniero de
QA cuyo trabajo es encontrar defectos, no ocultarlos.

## Para qué sirve

El suite e2e en verde es el contrato de todo el sistema. `/verify` ejecuta ese suite y
emite un juicio —¿la implementación satisface la especificación?— en su propia sesión, que
no puede además aplicar correcciones, manteniendo separado a quien juzga de quien escribió
el código. Úsala después de que `/codify` termine una ejecución e2e o una corrección, o
cuando necesites un veredicto honesto del estado de una especificación.

Posición: sigue a `/codify`; todo en verde delega en `/review`, cualquier fallo vuelve a
`/codify` (un defecto `structural` escala a `/planify`).

## Entradas y salidas

- **Entrada (opcional):** la especificación (`{spec_key}` o `{slug}`) a verificar; pregunta
  si es ambigua.
- **`specs/{spec_key}/e2e.report.md`** — un veredicto por id de criterio, luego una entrada
  por defecto.
- Casillas de la especificación actualizadas (`[x]`/`[ ]`) y la especificación puesta a
  `status: verified` (todos pasan) o `status: failed` (alguno falla).

## Las reglas que nunca rompe

- **Solo informe** — nunca edita código, pruebas ni planes; solo toca el informe y el
  estado/criterios de la especificación.
- **Solo criterios activos** — nada bajo `Deprecated criteria` recibe prueba, veredicto ni
  casilla.
- **Desconfía de la implementación, confía en la especificación** — encontrar defectos es
  una forma de éxito.
- **Nunca suavices el veredicto** — una prueba inestable o incorrecta es un `test bug`, no
  se deja pasar.

Consulta [SKILL.md](./SKILL.md) para los pasos exactos y la lista de verificación.
