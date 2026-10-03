# Columbus: ¿la hornada supera a los arquetipos?

Guion para que un agente (Codex) responda una sola pregunta: **¿los proyectos que genera una hornada de experimentos son mejores que los arquetipos actuales?** Sirve para cada hornada: si la respuesta es no, el informe dice qué le falta a la siguiente.

## Cómo lanzarlo

Abre Codex en `C:/code/aidd` para que vea todos los árboles y pásale:

```text
Lee AIDDbot/.product/columbus/comparison.md y compara la hornada {n} con los arquetipos. Escribe el informe donde indica el guion. No modifiques nada más.
```

## Hornadas

| Hornada | Experimentos | Prompt | Notas |
| --- | --- | --- | --- |
| 1 | `claude-4`, `codex-5` | F (Express + front sin framework con Vite + Playwright) | Resúmenes en `notes.md` |

Cada experimento está en `C:/code/aidd/experiments/columbus/{experimento}`. Los experimentos de una hornada se comparan entre sí solo para elegir el mejor de cada tipo de proyecto. Ese es el que se enfrenta al arquetipo.

## Reglas para el agente

- **Solo lectura.** No edites, formatees, instales ni commitees nada en `archetypes/` ni en `experiments/`. La única excepción es el canario de fronteras, que se deshace en el acto.
- Puedes ejecutar `lint`, `unit`, `quality` y los tests de Playwright de cada proyecto. Nunca ejecutes `fix`, `format` ni `npm install`.
- Al terminar, `git status` queda limpio en cada repo, salvo los ficheros que ya se ignoran (`coverage/`, `logs/`, `test-results/`, informes).
- No toques los skills de AIDDbot.
- Cada afirmación cita un fichero, un comando o una salida. Si algo no se puede comprobar, se dice «sin comprobar».
- Escribe el informe en español.

## Parejas

| Arquetipo actual | Proyecto de la hornada (según `.product/system.md`) |
| --- | --- |
| `C:/code/aidd/archetypes/back-express` | `back-api` |
| `C:/code/aidd/archetypes/front-standard` | `front-web` |
| `C:/code/aidd/archetypes/e2e-playwright` | `e2e` |

Contrato que vale para los dos lados: las specs de `{experimento}/.agents/skills/architect-system-foundation/assets/foundation/` y la plantilla `project.AGENTS.template.md` de la misma carpeta.

### No penaliza a ninguno de los dos lados

- **Muestras:** los arquetipos traen funcionalidad de muestra (`home`, `item-detail`, `content`…). Se excluyen de tamaño y calidad y se listan aparte.
- **Contratos nuevos:** `health` con `status: "ok"`, página `/health`, `DATABASE_URL` y `PORT` inválido que detiene el arranque. Si el arquetipo no los cumple, se anota como «arquetipo desfasado»: es una tarea de alineación, no una razón para que el arquetipo pierda.
- **Mecanismo:** `front-standard` sirve el front con Express y la hornada con Vite. Se compara el resultado, no el mecanismo.
- **Capa visual:** la hornada no tiene tema de marca (P22). No cuenta.

## Criterios

Por pareja y criterio, el veredicto es **Mejor**, **Igual** o **Peor** (la hornada frente al arquetipo), con su evidencia.

### Puertas (la hornada no puede ser peor en ninguna)

1. **Contrato fundacional.** Cada requisito de `configuration`, `monitoring`, `health` y `basic-auth`: cumple, parcial o no cumple. Cada URL y API de «Expected URLs and APIs» responde como se declara.
2. **Fronteras.** `main` → `core` → manifiesto → funcionalidades por fachada; `shared` sin negocio; capas `presentation` → `logic` → `data`. **Canario:** en cada proyecto con capas, añade en `{feature}/data` un import de `core`, ejecuta `lint`, anota si falla y deshaz con `git checkout -- <fichero>`.
3. **Verde.** `lint`, `unit` y la aceptación pasan. Anota cuántos tests hay y cuánto tardan.
4. **Seguridad.** Hash de contraseñas con parámetros de OWASP vigentes, sin hash ni secretos en las respuestas, verificación con tiempo constante, CORS acotado y cabeceras básicas.

### Calidad (decide cuando las puertas empatan)

5. **Tamaño y complejidad.** Sin muestras ni tests: ficheros, líneas y la salida de `quality`. Menos es mejor si cumple lo mismo.
6. **Lectura.** Naming, duplicación, sobreingeniería, contrato de error uniforme y logs. Las tres mejores piezas y los tres peores defectos de cada lado, con su fichero.
7. **Stack.** TypeScript 7, oxlint con tipos y fronteras, oxfmt, `node --test` y las dependencias justas.
8. **Listo para agentes.** El `AGENTS.md` de la hornada frente al `README.md` del arquetipo: ¿puede un agente empezar sin explorar el código?
9. **Deuda.** `.product/quality/debt.json` de cada experimento: ¿el arquetipo tiene el mismo problema?

### Trampas conocidas

Comprueba en los dos lados las que ya han aparecido en experimentos. Si un lado no cae en una trampa, eso cuenta a su favor:

- **`erasableSyntaxOnly`** activado en el back que Node ejecuta sin build. Sin él, las parameter properties pasan `lint` y `unit` y rompen el arranque (`codex-5`, S0002).
- **Custom elements** que añaden su contenido en `connectedCallback` y no en el `constructor` (`codex-5`, S0003).
- **Guard por lista de rutas:** el guard compara la ruta exacta mientras el router acepta mayúsculas y barra final, así que `/API/...` se salta la autenticación (`codex-5`, S0004). La protección debe ir con la ruta.
- **Puertos escritos a mano** en los tests de `e2e` (`claude-4`, D35).
- **Import dinámico roto:** una página cargada con `import()` que también se importa de forma estática (`claude-4`).
- **Reglas de negocio** que ninguna spec pide, por ejemplo `minlength` en el registro (`claude-4`).

## Regla de decisión

Por pareja:

- **Mejor:** ninguna puerta es Peor y la hornada gana más criterios de calidad de los que pierde.
- **Peor:** alguna puerta es Peor.
- **Igual:** en cualquier otro caso.

**La hornada supera a los arquetipos** si es Mejor en al menos una pareja y no es Peor en ninguna.

## Informe

Escríbelo en `C:/code/aidd/AIDDbot/.product/columbus/comparison.{n}.md`, donde `{n}` es el número de la hornada:

1. **Respuesta** en una línea: «La hornada {n} supera / no supera a los arquetipos».
2. **Tabla:** criterios 1–9 × parejas, con Mejor / Igual / Peor.
3. **Detalle por criterio**, con sus evidencias.
4. **Para la siguiente hornada:** lo que tiene el arquetipo y le falta a la hornada, y las trampas nuevas. Es la lista que hay que llevar al Blueprint o al Archetype Builder.
5. **Para Archetype Base:** lo que tiene la hornada y le falta al arquetipo.
6. **Sin comprobar:** lo que no se pudo verificar y por qué.

No commitees el informe: lo revisamos antes.
