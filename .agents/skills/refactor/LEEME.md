# Refactorizar — auditar toda la app y triar lo que encuentre

`/refactor` se aparta de cualquier spec concreta y lee el sistema *acumulado* —toda la app por
defecto— buscando decadencia que ninguna revisión por spec puede ver: duplicación repartida
entre features, UX inconsistente, deriva estructural, abstracciones que se volvieron
estructurales. Escribe un único informe triado y enruta cada hallazgo a la puerta del pipeline
que sí puede arreglarlo. Juzga; nunca edita. Actúa como Auditor de Código, igual que `/review`
y `/verify` son solo-informe.

## Para qué sirve

El suite e2e en verde es el contrato. `/refactor` es la pasada periódica —cada varias specs, o
en un tren de release— que da dueño a la decadencia transversal. Cada hallazgo lleva severidad,
tipo y destino, y se enruta por una pregunta: *¿arreglarlo cambiaría lo que afirma un test e2e
en verde?* No, y es local → `/codify`. No, pero hay que mover contratos o componentes →
`/planify`. Sí → `/specify`. Nunca descarta un hallazgo real por "no cambiar comportamiento": lo
escala.

Posición: reporta y enruta. Los hallazgos de `/codify` se aplican y luego `/verify` confirma;
los de `/planify` y `/specify` reingresan al pipeline por su propia puerta.

## Entradas y salidas

- **Entrada (opcional):** un alcance — toda la app por defecto, o un contenedor o rutas.
- **`refactors/{slug}/refactor.report.md`** — un hallazgo triado por entrada; enruta a `/codify`, `/planify` o `/specify`.

## Las reglas que nunca rompe

- **Solo informe** — nunca edita código; cada hallazgo va a su puerta del pipeline.
- **Toda la app por defecto** — audita el sistema acumulado, no un diff; acota solo si te lo piden.
- **Enruta, nunca descartes** — preservando comportamiento y local → `/codify`; estructural → `/planify`; cambia comportamiento → `/specify`.
- **El suite e2e es la línea** — un arreglo que cambiaría lo que afirma un test verde es de `/specify`.
- **Aquí no hay pruebas** — `/codify` es dueño de las unitarias y `/verify` del e2e.

Consulta [SKILL.md](./SKILL.md) para los pasos exactos y la lista de verificación.
