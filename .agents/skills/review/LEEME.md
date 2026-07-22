# Revisar — calificar el código contra estándares de calidad

`/review` comprueba el código en alcance contra un conjunto de compuertas de calidad
pasa/falla: compuertas de herramientas como linter y verificación de tipos, y compuertas de
checklist como accesibilidad, seguridad, rendimiento y código limpio. Escribe un informe
con el veredicto de cada compuerta y deriva cada compuerta fallida a una corrección. Como
`/verify`, es solo-informe y nunca edita código. Actúa como Revisor de Estándares: juzga la
calidad, no reescribe el trabajo.

## Para qué sirve

Pasar el suite e2e prueba que el comportamiento es correcto; no prueba que el código sea
limpio, seguro o mantenible. `/review` es la compuerta de calidad entre una especificación
verificada y una publicación, y también sirve a las refactorizaciones: cuando las tripas
son feas pero los contratos están intactos, la compuerta de código limpio informa qué
arreglar. Úsala después de que `/verify` deje una especificación en verde, en un refactor
con contratos intactos, o sobre un alcance arbitrario (cambios de rama, archivos, rutas).

Posición: sigue a `/verify` y delega en `/release` con un pase limpio, o en `/codify` si
alguna compuerta falla (los hallazgos de comportamiento van a `/specify`, los estructurales
a `/planify`). `/review` no ejecuta pruebas: `/codify` es dueño de las unitarias y `/verify`
del e2e.

## Entradas y salidas

- **Entrada (requerida):** un alcance — por defecto el código de la especificación en
  alcance, o bien cambios de rama, archivos o rutas; pregunta lo mínimo si es ambiguo.
- **`specs/{spec_key}/review.report.md`** — un veredicto pasa/falla por compuerta; cada
  compuerta fallida enumera hallazgos, cada uno con severidad, tipo y destino.

## Las reglas que nunca rompe

- **Solo informe** — nunca edita código; las compuertas fallidas delegan en `/codify`.
- **Línea base verde** — `/review` no ejecuta pruebas; `/codify` es dueño de las unitarias y
  `/verify` del e2e.
- **El comportamiento queda fuera de alcance** — los hallazgos de comportamiento van a
  `/specify` y los estructurales a `/planify`.

Consulta [SKILL.md](./SKILL.md) para los pasos exactos y la lista de verificación.
