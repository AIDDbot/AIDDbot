# Plantilla de LEEME (prosa)

La versión en prosa de una skill: la misma información que su `SKILL.md`, en lenguaje natural.
El README es la variante en inglés; el LEEME, su traducción al español. Ambos comparten este
esquema y estas reglas.

## Reglas de formato

- **Longitud** — toda sección de prosa: 1–2 párrafos, 2–3 frases por párrafo; nunca trocees por
  longitud. Los tres pasos suelen tener **dos movimientos**, así que dos párrafos es lo normal
  ahí: uno por movimiento (ver esqueleto).
- **Lista o prosa** — van en **lista**: `Reglas`, `Contexto`, `Verificación`. Van en **prosa**:
  el intro y los tres pasos (`Investiga`, `Planifica`, `Ejecuta`).
- **Ganchos** — cada viñeta de `Reglas` y `Contexto` empieza con `**gancho corto** —` seguido de
  una frase.
- **Backticks** — para rutas, nombres de archivo, identificadores, comandos y valores literales.
- **Negrita** — solo en los ganchos de lista y, como mucho, un concepto por párrafo de paso.
- **Enlaces** — a plantillas y documentos referenciados, concentrados en `Contexto › Referencias`.
- **No repitas** — lo que ya es una `Regla` no se re-explica en un paso; se menciona de pasada.
- **Sin gramática de skill** — nada de `_verbo_`; en prosa el verbo va conjugado y natural.
- **Tono** — dirígete siempre al agente en 2.ª persona o imperativo ("Lee", "Escribe", "No
  ejecutes"); nunca hables de la skill en 3.ª persona ("la auditoría no ejecuta", "release
  publica").
- **Pipeline** — menciona la posición en la tubería lo justo; los handoffs van como acción en
  `Ejecuta`, no como narración de secuencia en el intro.

## Esqueleto

```md
---
name: {slug}
description: {qué hace, en una frase}
user-invocable: true
disable-model-invocation: true
---
# {Verbo} — {subtítulo de una línea}

{Intro P1 — rol + objetivo: actúas como {Rol}; qué genera y qué entrega.}

{Intro P2, opcional — filosofía, detalles, posición en el pipeline y handoff.}

## Reglas
- **{gancho}** — {una frase con la invariante}.

## Contexto
- **Entrada obligatoria** — {lo que el llamador debe aportar}.
- **Entrada opcional** — {lo que puede aportar, si aplica}.
- **Referencias** — {plantillas y documentos que rellena, como enlaces}.

## Investiga
{P1 — orientarse: aclarar el contexto y decidir el modo.}
{P2 — leer la evidencia y las fuentes que importan.}

## Planifica
{P1 — entender las guías y plantillas contra las que trabajar.}
{P2 — producir el plan: mapear el contenido y listar qué tocar.}

## Ejecuta
{P1 — escribir los artefactos; varios entregables como enumeración con ";".}
{P2 — cerrar: el commit y el handoff.}

## Verificación
- [ ] {un resultado comprobable}.
```

> El `SKILL.md` sigue siendo la fuente formal; este LEEME es su traducción a prosa. Ejecutar esta
> prosa de vuelta por `/skillify` debería reproducir la skill.
