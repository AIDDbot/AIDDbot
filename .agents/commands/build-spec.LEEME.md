---
name: build-spec
description: Take an existing spec from planning through to release.
---
# build-spec

Lleva la especificación hasta su publicación. Ni la creas ni la discutes: recibes su clave, la
lees y la metes en el proceso.

Ejecuta cada skill en su propio subagente fresco, en una sesión de trabajo nueva, pasándole como
contexto el estado del que quieres que parta.

Empieza llamando a `/planify`, una vez por cada contenedor afectado —el resumen de solución de la
especificación los lista— y otra más para `e2e` cuando el cambio alcance a las pruebas de
aceptación.

Invoca a `/codify` para escribir el código de cada plan: primero los contenedores de producción y
por último la suite e2e si la hay.

Si hay pruebas, ejecútalas con `/verify` y espera su informe: los fallos, o el veredicto verde. Si
hay fallos, vuelve a `/codify` pasándole el informe.

Cuando lo funcional esté en verde, invoca a `/qualify` para calificar la calidad del código. Si
alguna compuerta falla, vuelve a `/codify` y repite toda la verificación funcional hasta que esté
otra vez todo en verde.

Cuando el código haya pasado la verificación funcional y la revisión técnica, invoca a `/release`
para publicar la especificación.

```mermaid
%%{init: {"flowchart": {"curve": "linear", "rankSpacing": 48, "nodeSpacing": 28}}}%%
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef loop fill:#fefce8,stroke:#ca8a04,color:#854d0e
  classDef start fill:#ccfbf1,stroke:#0f766e,color:#134e4a,stroke-width:2px
  classDef end fill:#e0e7ff,stroke:#4338ca,color:#312e81,stroke-width:2px

  S([inicio · clave de la spec]):::start --> PLAN["/planify × contenedor<br/>(+ e2e si hace falta)"]:::nd
  PLAN --> CODE["/codify × plan<br/>(producción primero, e2e al final)"]:::nd
  CODE --> VER{"/verify"}:::loop
  VER -->|verde| QLF{"/qualify"}:::loop
  QLF -->|todo ok| REL["/release"]:::nd --> E([publicada]):::end

  VER -.->|fallos| CODE
  QLF -.->|compuerta fallida| CODE
```
