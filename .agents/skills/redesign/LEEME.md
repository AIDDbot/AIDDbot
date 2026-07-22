# Rediseñar — informar dónde la UI puede cumplir el sistema de diseño y WCAG

`/redesign` lee el código de frontend en alcance, detecta dónde se queda corto respecto al
sistema de diseño y la accesibilidad, y escribe un informe de rediseños que preservan el
comportamiento —una entrada por oportunidad, cada una derivada a `/codify` para aplicarla.
Juzga; nunca edita. Actúa como Revisor de Rediseño, igual que `/review` y `/verify` son
solo-informe.

## Para qué sirve

El suite e2e en verde es el contrato; rediseñar no debe moverlo. Esta skill encuentra
oportunidades de UI, sistema de diseño y accesibilidad, y las deja listas para que `/codify` las
aplique, sin mezclar el juicio con la escritura. Úsala sobre el contenedor de frontend, en un
rediseño sin especificación que preserva el comportamiento funcional.

Posición: reporta y delega en `/codify`; luego `/verify` confirma que el suite sigue verde.

## Entradas y salidas

- **Entrada (requerida):** un alcance — el contenedor de frontend por defecto, o rutas.
- **`redesigns/{slug}/redesign.report.md`** — una entrada por oportunidad; todas delegan en `/codify`.

## Las reglas que nunca rompe

- **Solo informe** — nunca edita código; las oportunidades se aplican vía `/codify`.
- **Preserva el comportamiento** — pule aspecto, estructura y accesibilidad, no lo que hace la app; si dudas, descártala.
- **Alcance al frontend** — nada de backend ni cambios de paso.
- **Sistema de diseño sobre gusto** — alinéate a los tokens, la escala y la tipografía del proyecto.
- **Aquí no hay pruebas** — `/codify` es dueño de las unitarias y `/verify` del e2e.

Consulta [SKILL.md](./SKILL.md) para los pasos exactos y la lista de verificación.
