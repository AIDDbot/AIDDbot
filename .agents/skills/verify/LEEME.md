# Verificar — ejecutar el suite e2e e informar la verdad

`/verify` ejecuta el suite de extremo a extremo contra los criterios de aceptación de una
especificación e escribe un informe de defectos triado: un veredicto para cada criterio,
más una entrada por defecto, cada uno clasificado por tipo y enrutado a la skill que debe
manejarlo. Es estrictamente solo informe — nunca edita código, pruebas o planes.

Juega un Ingeniero de QA cuyo trabajo es encontrar defectos, no ocultarlos.

## Para qué sirve

El suite e2e verde es el contrato de todo el sistema. `/verify` es la skill que
realmente ejecuta ese suite y rinde un juicio: ¿la implementación satisface la
especificación? Al mantener la verificación en su propia sesión — una que no puede
aplicar también correcciones — mantiene a la persona juzgando separada de la persona que
escribió el código.

## Cuándo usarla

- Después de que `/codify` termina una ejecución e2e o una corrección, para verificar si
  se cumplen los criterios.
- Cualquier vez que necesites un veredicto honesto sobre el estado actual de una
  especificación.

Posición: sigue a `/codify`; delega a `/review` cuando todo pasa o de vuelta a `/codify`
cuando algo falla.

## Qué le das

- **Opcional:** la especificación (`{spec_key}` o `{slug}`) a verificar. Si es ambigua,
  lo pregunta.

## Qué produce

- **`{Product_Folder}/specs/{spec_key}/e2e.report.md`** — un veredicto por id de criterio
  de aceptación, seguido de una entrada por defecto.
- **Casillas de especificación** actualizadas (`[x]`/`[ ]`) reflejando el resultado del
  suite.
- La especificación establecida a **`status: verified`** (todos los criterios pasan) o
  **`status: failed`** (cualquier criterio falla).

## Cómo se comporta (las reglas que nunca rompe)

- **Solo informe.** Nunca edita código, pruebas o planes, y nunca aplica una corrección.
  Solo toca el informe y el estado/criterios de la especificación.
- **Solo criterios activos.** Nada bajo `Deprecated criteria` obtiene prueba, veredicto,
  o casilla.
- **Desconfía de la implementación, confía en la especificación.** Encontrar defectos es
  una forma de éxito, no un fracaso de la ejecución.
- **Nunca suavices el veredicto.** Una prueba inestable o incorrecta se informa como un
  `test bug`, no se deja pasar.

## Cómo funciona, paso a paso

1. **Investigación.** Identifica la especificación (preguntando si es ambigua), lee los
   criterios de aceptación activos, y lee el mapeo de escenario a criterio en
   `e2e.plan.md`.
2. **Plan.** Selecciona las pruebas que deben ejecutarse (sus títulos llevan los ids de
   criterios), lee los comandos de inicio/prueba y fixtures del archivo de reglas de
   agente, y lee formas de campo de API o datos cuando debe afirmar respuestas o estado
   persistido. Lee la plantilla de informe de defectos y prepara su contenido.
3. **Implementar.** Ejecuta las pruebas afectadas (o todas las pruebas como último
   recurso), escribe el informe con un veredicto por criterio y una entrada por defecto,
   y actualiza las casillas de la especificación del resultado. Si cada criterio pasa,
   establece `status: verified` y delega a `/review`; de otro modo establece
   `status: failed` y delega a `/codify`. Confirma con `docs(e2e): {spec_key} report`.

## Cómo sabes que funcionó

- Cada criterio activo tiene una prueba mapeada, un veredicto de informe, y su casilla en
  la especificación.
- Ningún criterio deprecado fue verificado, recibió un veredicto, o fue marcado.
- El estado de la especificación es `verified` o `failed`, coincidiendo con el resultado
  del suite.
- El suite es verde, o cada defecto lleva un tipo y un entrutamiento.
- Ningún código, prueba, plan, o edición correctiva fue hecha — solo informe y estado.

## Dónde delega

- **Todo verde →** `/review`, para calificar la calidad del código.
- **Cualquier fallo →** `/codify`, con cada defecto triado: `code bug` y `test bug` van a
  `/codify`; un defecto `structural` escala a `/planify`.
