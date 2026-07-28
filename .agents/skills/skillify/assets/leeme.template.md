# Plantilla de LEEME (prosa)

El LEEME es el gemelo en español de un `SKILL.md`: la misma skill, escrita en prosa dirigida al
agente que la ejecuta. Nada de pseudocódigo, marcado de verbos ni pasos numerados —un agente lee
instrucciones, no una gramática. Ambos siguen este esqueleto y estas reglas.

## Reglas de formato

- **Longitud** — toda sección de prosa: 1–2 párrafos, 2–3 frases por párrafo; nunca trocees por
  longitud. Los tres pasos suelen tener **dos movimientos**, así que dos párrafos es lo normal
  ahí: uno por movimiento.
- **Lista o prosa** — van en **lista**: `Reglas`, `Contexto`, `Verificación`. Van en **prosa**:
  el intro y los tres pasos (`Investiga`, `Planifica`, `Ejecuta`).
- **Ganchos** — cada viñeta de `Reglas` y `Contexto` empieza con `**gancho corto** —` seguido de
  una frase.
- **Backticks** — para rutas, nombres de archivo, identificadores, comandos y valores literales.
- **Negrita** — solo en los ganchos de lista y, como mucho, un concepto por párrafo de paso.
- **Enlaces** — a plantillas y documentos referenciados, concentrados en `Contexto › Referencias`.
- **No repitas** — lo que ya es una `Regla` no se re-explica en un paso; se menciona de pasada.
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

{Intro P1 — rol y objetivo: actúas como {Rol}; qué generas y qué entregas.}

{Intro P2, opcional — filosofía, límites, lo que nunca haces.}

## Reglas
- **{gancho}** — {la invariante, en una frase}.

## Contexto
- **Entrada obligatoria** — {lo que el llamador debe aportar}.
- **Entrada opcional** — {lo que puede aportar, si aplica}.
- **Referencias** — {las plantillas y documentos que lees o rellenas, como enlaces}.

## Investiga
{P1 — orientarse: fijar el alcance y decidir el modo.}
{P2 — leer la evidencia y las fuentes que importan.}

## Planifica
{P1 — las guías y plantillas contra las que trabajas.}
{P2 — producir el plan: mapear el contenido y listar qué tocar.}

## Ejecuta
{P1 — escribir los artefactos; varios entregables como una frase con ";".}
{P2 — cerrar: el commit y el handoff.}

## Verificación
- [ ] {un resultado comprobable}.
```

> Pasar esta prosa de vuelta por `/skillify` debería reproducir la misma skill.
