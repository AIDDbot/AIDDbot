
# 🤖 AIDDbot

Un asistente IA de programación que aumenta el IDE para desarrollar proyectos corporativos.

![AIDDbot coding agents](./docs/AIDD-bot.png)

> Read this document [in English here](https://github.com/AIDDbot/AIDDbot/blob/main/README.md)

## ❓¿Qué es AIDDbot?

**Es un asistente para ingenieros de software**  que ayuda con:

- documentación de producto, 
- generación de código, 
- pruebas y documentación.

## ⚙️ ¿Cómo funciona?

**Aumenta tu IDE y agente de desarrollo** con un conjunto de:

  - prompts, 
  - instrucciones o reglas 
  - herramientas y configuraciones.

## 🎯 ¿Por qué lo necesitas?

**Para desarrollar proyectos grandes y complejos**, que representan un reto con para los LLMs debido a:

- las limitaciones en memoria para aportar contexto, 
- alucinaciones por deficiencias en el entrenamiento y 
- la necesidad de mantener la coherencia a lo largo del tiempo.

> ℹ️ Más info sobre [El flujo de trabajo de AIDDbot](https://aicode.academy/blog/es/aiddbot-workflow/)

---

## 🔍 Introducción a AIDDbot

Puede trabajar con varios editores habilitados con IA:

- **GitHub Copilot** ✔️ Listo [Ver implementación](https://github.com/AIDDbot/AIDDbot/tree/main/.github)
- _Cursor_, _ClaudeCode_, _GeminiCLI_ ⏳  Próximamente

## 🔌 Instalación

`AIDDbot` es solo un conjunto de ficheros Markdown con instrucciones y configuraciones adaptadas a tu editor de código con IA. Instálalo clonando este repositorio y copiando la carpeta adecuada en la raíz de tu proyecto. 

O simplemente usa el prompt de instalación (para VSCode + GitHub Copilot).

1. Copia el contenido en bruto de [El Prompt de Instalación de AIDDbot](https://raw.githubusercontent.com/AIDDbot/AIDDbot/refs/heads/main/.github/prompts/Ab_install-for-copilot.prompt.md)
2. Pégalo en tu Chat de Copilot en `Modo Agente`.
   
> ℹ️ Más info sobre [Personalización de GitHub Copilot](https://aicode.academy/blog/es/vscode-github-copilot/)

## 📋 Uso (GitHub Copilot)

> El chat de GitHub Copilot viene con tres modos nativos: `Ask`, `Edit` y `Agent`. Con `AIDDbot` agregas un nuevo modo orientado a AI Driven Development. Más info: [Modos de Chat](https://code.visualstudio.com/docs/copilot/chat/chat-modes)

### 🦸 Modo de Chat: AIDDbot

Tras la instalación tendrás un nuevo modo de chat: **AIDDbot**.

- **[Modo de Chat AIDDbot](https://github.com/AIDDbot/AIDDbot/blob/main/.github/chatmodes/AIDDbot.chatmode.md)**: Configurado para flujos de arquitectura, construcción e ingeniería de calidad empresarial.

En Copilot, el modo de chat fija un contexto y otorga acceso a prompts y herramientas acordes a dicho contexto.

### 🧑‍💻 Prompts de Roles

Los prompts son consultas o comandos predefinidos que guían las respuestas de la IA. Ayudan a obtener información o acciones específicas de la IA.

Hay tres prompts alineados con los roles de AI-Driven Development: Architect / Builder / Craftsman. Llamarlos hace que AIDDbot actúe según el rol elegido.

- **[Prompt de rol Arquitecto](https://github.com/AIDDbot/AIDDbot/tree/main/.github/prompts/Ab_Architect.prompt.md)** `/Ab_Architect` – Documentación general y descubrimiento.
- **[Prompt de rol Constructor](https://github.com/AIDDbot/AIDDbot/tree/main/.github/prompts/Ab_Builder.prompt.md)** `/Ab_Builder` – Diseño e implementación de funcionalidades.
- **[Prompt de rol Artesano](https://github.com/AIDDbot/AIDDbot/tree/main/.github/prompts/Ab_Craftsman.prompt.md)** `/Ab_Craftsman` – Validación, limpieza y documentación.

Estos prompts de rol orquestan otros prompts especializados cuando es necesario. Explora la [carpeta de prompts](https://github.com/AIDDbot/AIDDbot/tree/main/.github/prompts) para ver todas las opciones.

### 📚 Instrucciones

GitHub Copilot permite definir ficheros de instrucciones como contexto reutilizable. Funcionan como plantillas, guías o referencias de buenas prácticas — genéricas o muy específicas (librerías, herramientas, patrones de diseño).

**AIDDbot** inyecta automáticamente los ficheros adecuados por prompt. También puedes referenciarlos manualmente usando el prefijo `#file:`.

Visita la [carpeta de instrucciones](https://github.com/AIDDbot/AIDDbot/tree/main/.github/instructions) para explorarlas.

### 🚧 En progreso

- Rutinas de auto-mejora para AIDDbot.
- Memoria del flujo de trabajo y características del proyecto.
- Diario / log para trazabilidad de decisiones.
- Inclusión automática de arquetipos según requisitos.

## 💭 Filosofía AIDD

AIDD (AI-Driven Development) combina capacidades de IA con prácticas consolidadas de ingeniería de software para aumentar productividad, calidad de código y colaboración a lo largo de todo el ciclo de vida.

El agente `AIDDbot` se adhiere a los tres principios del [Manifiesto AIDD](https://aiddbot.com/aidd-manifesto):

- **🧑‍💻 Humano en el Bucle**: Tu trabajo se vuelve más estratégico, colaborativo y responsable.
- **🔧 Reglas sobre Herramientas**: Las herramientas son medios; las reglas y procesos aportan valor duradero.
- **✅ Calidad IA**: No solo más productividad, también software mantenible y de alta calidad.

> Work smarter, not harder, with _Ab_!

---

- **Autor**: [Alberto Basalo](https://albertobasalo.dev)
- **Redes sociales**:
  - [X](https://x.com/albertobasalo)
  - [LinkedIn](https://www.linkedin.com/in/albertobasalo/)
  - [GitHub](https://github.com/albertobasalo)
- **Blog de AIDDbot.com**: [AIDDbot.com](https://aiddbot.com)
- **Organización AIDDbot en GitHub**: [GitHub/AIDDbot](https://github.com/AIDDbot)
- **Este repositorio**: [GitHub/AIDDbot/AIDDbot](https://github.com/AIDDbot/AIDDbot)
- **Academia en Español**: [AI code Academy](https://aicode.academy)
- **Curso de formación**: [Aprende a usar GitHub Copilot profesionalmente](https://aicode.academy/cursos/vs-code-copilot/)