# Plantilla de LEEME (prosa)

El LEEME es el gemelo en español de un `SKILL.md`: la misma skill, escrita en prosa dirigida al
agente que la ejecuta —nada de pseudocódigo, marcado de verbos ni pasos numerados. Ambos siguen
este esqueleto y estas reglas.

## Reglas de formato

- **Presupuesto** — 50 líneas, medidas sobre el `SKILL.md`. El español corre algo más largo y no
  se trocea por eso. Una skill que pide mucho más pide un fichero en `references/`, no más prosa.
- **Las reglas se ganan su sitio** — escribe solo lo que un agente capaz erraría por su cuenta:
  una decisión del proyecto, un límite contraintuitivo, un orden que importa. Si lo haría igual,
  fuera.
- **Una vez, en un solo sitio** — una invariante vive en `Reglas` y no se repite en `Método`, y no
  hay checklist de cierre que la enuncie una tercera vez.
- **La plantilla especifica el artefacto** — di cuándo y por qué escribir algo; deja que la
  plantilla de `assets/` diga qué forma tiene, y no la parafrasees aquí.
- **Sin narrar la tubería** — fija los estados que te tocan y para. El
  [catálogo](../../skills.catalog.md) es dueño del enrutado; los comandos orquestan.
- **Lista o prosa** — `Reglas` y `Contexto` van en lista, cada viñeta abriendo con
  `**gancho corto** —`. `Método` va en prosa, en 2.ª persona o imperativo.
- **Backticks** para rutas, identificadores, comandos y valores literales; **negrita** en los
  ganchos de lista y, como mucho, un concepto por párrafo.
- **Enlaces** a toda plantilla o documento que consumas, concentrados en `Contexto › Referencias`.

## Esqueleto

```md
---
name: {slug}
description: {qué hace, en una frase}
user-invocable: true
disable-model-invocation: true
---
# {Verbo} — {subtítulo de una línea}

{Rol, qué produces y el límite que importa. De dos a cuatro frases.}

## Reglas
- **{gancho}** — {la invariante, en una frase}.

## Contexto
- **Entrada** — {lo que aporta el llamador; dilo cuando sea opcional}.
- **Referencias** — {las plantillas y documentos que lees o rellenas, como enlaces}.

## Método
{P1 — orientarse: qué leer, qué fijar, qué preguntar.}
{P2 — escribir los artefactos y confirmar el commit.}
```

> Pasar esta prosa de vuelta por `/skillify` debería reproducir la misma skill.
