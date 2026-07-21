# Revisar — calificar el código contra estándares de calidad

`/review` verifica el código en alcance contra un conjunto de compuertas de calidad
pasa/falla — compuertas de herramientas como lintado y verificación de tipos, y
compuertas de lista de verificación como accesibilidad, seguridad, rendimiento y código
limpio. Escribe un informe con el veredicto de cada compuerta y enruta cada compuerta
fallida a una corrección. Como `/verify`, es solo informe y nunca edita código.

Juega un Revisor de Estándares: juzga la calidad, no reescribe el trabajo.

## Para qué sirve

Pasar el suite e2e prueba que el comportamiento es correcto; no prueba que el código sea
limpio, seguro o mantenible. `/review` es la compuerta de calidad entre una especificación
verificada y una liberación. También sirve refactorizaciones: cuando los internos son
feos pero los contratos están intactos, la compuerta de código limpio informa qué
arreglarse.

## Cuándo usarla

- Después de que `/verify` informa que una especificación es verde, para calificar su
  código antes de lanzamiento.
- En una refactorización con contratos intactos, para informar violaciones de código
  limpio.
- En un alcance arbitrario — cambios de rama, archivos o rutas — cuando quieres una
  compuerta de calidad.

Posición: sigue a `/verify` y delega a `/release` en un pase limpio, o a `/codify`
cuando cualquier compuerta falla.

## Qué le das

- **Requerido:** un alcance. Por defecto, este es el código de la especificación en
  alcance; alternativamente cambios de rama, archivos específicos, o rutas. Si el alcance
  es ambiguo pregunta el mínimo necesario.

## Qué produce

- **`{Product_Folder}/specs/{spec_key}/review.report.md`** — un veredicto pasa/falla para
  cada compuerta. Cada compuerta fallida enumera sus hallazgos, cada hallazgo llevando
  una severidad, un tipo, y un enrutamiento.

## Cómo se comporta (las reglas que nunca rompe)

- **Solo informe.** Nunca edita código; las compuertas fallidas delegan a `/codify`.
- **Línea base verde.** El suite e2e es la carril de `/verify` — si el suite es rojo,
  `/review` delega a `/verify` en lugar de proceder.
- **El comportamiento se mantiene fuera de alcance.** Los hallazgos de comportamiento
  enrutan a `/specify` y los estructurales a `/planify`; `/review` mismo juzga calidad,
  no qué el sistema debe hacer.

## Cómo funciona, paso a paso

1. **Investigación.** Identifica el alcance (el código de la especificación en alcance
   por defecto, de otro modo la entrada dada), preguntando el mínimo si es ambiguo.
   Ejecuta el suite de pruebas; si está rojo delega a `/verify`. Enumera los archivos en
   alcance.
2. **Plan.** Lee las definiciones de compuerta y la plantilla de informe, ejecuta el
   lintador y verificador de tipos para las compuertas de herramientas, y — para cualquier
   queja de herramienta que sea un falso positivo — ajusta la regla en lugar de registrar
   un fallo. Camina cada archivo de alcance contra cada compuerta de lista de verificación
   (flujo de datos, límites de confianza, UI, I/O), registra el veredicto de cada
   compuerta, y para cada compuerta fallida captura hallazgos con severidad, tipo, y
   enrutamiento.
3. **Implementar.** Escribe el informe de compuerta, confirma con `docs(review): …`, y
   delega: a `/codify` si cualquier compuerta falló, de otro modo a `/release`.

## Cómo sabes que funcionó

- Cada compuerta tiene un veredicto pasa/falla para el alcance.
- Cada compuerta fallida enumera hallazgos con severidad, tipo, y enrutamiento.
- El informe enruta fallos a `/codify` y un pase limpio a `/release`.

## Dónde delega

- **Un suite rojo →** `/verify` (esa es su carril, no de `/review`).
- **Cualquier compuerta falló →** `/codify` para arreglarse (con hallazgos de
  comportamiento enrutados a `/specify`, estructurales a `/planify`).
- **Todas las compuertas pasan →** `/release`.
