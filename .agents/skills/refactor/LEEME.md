# Refactorizar — informar dónde el código puede quedar más claro

`/refactor` lee el código en alcance, detecta complejidad que estorba a la claridad y escribe
un informe de refactorizaciones que preservan el comportamiento —una entrada por oportunidad,
cada una derivada a `/codify` para aplicarla. Juzga; nunca edita. Actúa como Revisor de
Refactorización, igual que `/review` y `/verify` son solo-informe.

## Para qué sirve

El suite e2e en verde es el contrato; refactorizar no debe moverlo. Esta skill es la puerta de
"tripas feas, contratos intactos" del mantenimiento: encuentra oportunidades de claridad y las
deja listas para que `/codify` las aplique, sin mezclar el juicio con la escritura. Úsala en un
refactor sin especificación, sobre el código cambiado o un contenedor concreto.

Posición: reporta y delega en `/codify`; luego `/verify` confirma que el suite sigue verde.

## Entradas y salidas

- **Entrada (requerida):** un alcance — el código cambiado por defecto, o un contenedor o rutas.
- **`refactors/{slug}/refactor.report.md`** — una entrada por oportunidad; todas delegan en `/codify`.

## Las reglas que nunca rompe

- **Solo informe** — nunca edita código; las oportunidades se aplican vía `/codify`.
- **Preserva el comportamiento** — misma entrada, salida, efectos y errores; si dudas, descártala.
- **Alcance a lo cambiado** — nada de refactors de paso sobre código intacto.
- **Convención sobre gusto** — refactoriza hacia las reglas del proyecto y el código vecino.
- **Aquí no hay pruebas** — `/codify` es dueño de las unitarias y `/verify` del e2e.

Consulta [SKILL.md](./SKILL.md) para los pasos exactos y la lista de verificación.
