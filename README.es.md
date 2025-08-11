
# AIDDbot

![AIDDbot coding agents](./AIDD-bot.png)

**AIDDbot** es un asistente con IA para el trabajo diario de los ingenieros de software. Ayuda con documentación de producto, generación de código, pruebas de calidad y más.
> Read this document [in English here](https://github.com/AIDDbot/AIDDbot/blob/main/README.md)

Consiste en un **conjunto de prompts, instrucciones, reglas y herramientas** que permiten al agente ejecutar las tareas de forma eficaz.

Es útil para cualquier lenguaje o tipo de proyecto, pero es especialmente adecuado para desarrollos corporativos y de largo alcance.

Puede trabajar con varios editores habilitados con IA:

- **GitHub Copilot** 🟢 Listo [Ver implementación](https://github.com/AIDDbot/AIDDbot/tree/main/.github)
- _Cursor_, _ClaudeCode_, _GeminiCLI_ 🟡 Próximamente

## 🔌 Instalación

`AIDDbot` es solo un conjunto de ficheros Markdown con instrucciones y configuraciones adaptadas a tu editor de código con IA. Instálalo clonando este repositorio y copiando la carpeta adecuada en la raíz de tu proyecto. O simplemente usa el prompt de instalación (para VS Code + GitHub Copilot).

### Para GitHub Copilot

> Lee más sobre [Personalización de GitHub Copilot](https://code.visualstudio.com/docs/copilot/copilot-customization)

- [ ] Copia el contenido en bruto de [El Prompt de Instalación de AIDDbot](https://raw.githubusercontent.com/AIDDbot/AIDDbot/refs/heads/main/.github/prompts/Ab_install-for-copilot.prompt.md)
- [ ] Pégalo en tu Chat de Copilot en `Modo Agente`.


## ℹ️ Uso (GitHub Copilot)

> El chat de GitHub Copilot viene con tres modos nativos: `Ask`, `Edit` y `Agent`. Con `AIDDbot` agregas un nuevo modo orientado a AI Driven Development. Más info: [Modos de Chat](https://code.visualstudio.com/docs/copilot/chat/chat-modes)

### 🤖 Modo de Chat: AIDDbot

Tras la instalación tendrás un nuevo modo de chat: **AIDDbot**.

- **[Modo de Chat AIDDbot](https://github.com/AIDDbot/AIDDbot/blob/main/.github/chatmodes/AIDDbot.chatmode.md)**: Configurado para flujos de arquitectura, construcción e ingeniería de calidad empresarial.

En Copilot, el modo de chat fija un contexto y otorga acceso a prompts y herramientas acordes a dicho contexto.

### 🧑‍� Roles

Hay tres prompts alineados con los roles de AI-Driven Development: Architect / Builder / Craftsman. Llamarlos hace que AIDDbot actúe según el rol elegido.

- **[Prompt de rol Arquitecto](/.github/prompts/Ab_Architect.prompt.md)** `/Ab_Architect` – Documentación general y descubrimiento.
- **[Prompt de rol Constructor](/.github/prompts/Ab_Builder.prompt.md)** `/Ab_Builder` – Diseño e implementación de funcionalidades.
- **[Prompt de rol Artesano](/.github/prompts/Ab_Craftsman.prompt.md)** `/Ab_Craftsman` – Validación, limpieza y documentación.

Estos prompts de rol orquestan otros prompts especializados cuando es necesario. Explora la [carpeta de prompts](https://github.com/AIDDbot/AIDDbot/tree/main/.github/prompts) para ver todas las opciones.

### � Instrucciones

GitHub Copilot permite definir ficheros de instrucciones como contexto reutilizable. Funcionan como plantillas, guías o referencias de buenas prácticas — genéricas o muy específicas (librerías, herramientas, patrones).

**AIDDbot** inyecta automáticamente los ficheros adecuados por prompt. También puedes referenciarlos manualmente usando el prefijo `#file:`.

Visita la [carpeta de instrucciones](https://github.com/AIDDbot/AIDDbot/tree/main/.github/instructions) para explorarlas.

#### Agregar Instrucciones

Además del conjunto incorporado puedes crear otros personalizados para tu stack — automáticamente — usando el propio agente.

- 📋 **[Generación de Instrucciones](https://github.com/AIDDbot/AIDDbot/blob/main/.github/prompts/Ab_add-instructions.prompt.md)** `/Ab_add-instructions`: Genera ficheros de instrucciones específicos del stack.

Este prompt se invoca automáticamente desde el prompt del Arquitecto tras identificar dependencias del stack, pero también puedes llamarlo manualmente con un alcance.
  
```txt
/Ab_add-instructions java language
```

### 🛠️ En progreso

- Memoria del flujo de trabajo y características del proyecto.
- Diario / log para trazabilidad de decisiones.
- Inclusión automática de arquetipos según requisitos.
- Rutinas de auto-mejora para AIDDbot.

## 💭 Filosofía AIDD

AIDD (AI Driven Development) combina capacidades de IA con prácticas consolidadas de ingeniería de software para aumentar productividad, calidad de código y colaboración a lo largo de todo el ciclo de vida.

El agente `AIDDbot` se adhiere a los tres principios del [Manifiesto AIDD](https://aiddbot.com/aidd-manifesto):

- **🧑‍💻 Humano en el Bucle**: Tu trabajo se vuelve más estratégico, colaborativo y responsable.
- **🔧 Reglas sobre Herramientas**: Las herramientas son medios; las reglas y procesos aportan valor duradero.
- **✅ Calidad IA**: No solo más productividad, también software mantenible y de alta calidad.

> ¡Trabaja más inteligente, no más duro, con _Ab_!

---

- **Autor**: [Alberto Basalo](https://albertobasalo.dev)
- **Redes sociales**:
  - [X](https://x.com/albertobasalo)
  - [LinkedIn](https://www.linkedin.com/in/albertobasalo/)
  - [GitHub](https://github.com/albertobasalo)
- **Cursos en Español**: [AI code Academy](https://aicode.academy)
- **Blog de AIDDbot.com**: [AIDDbot.com](https://aiddbot.com)
- **Organización AIDDbot en GitHub**: [GitHub/AIDDbot](https://github.com/AIDDbot)
- **Este repositorio**: [GitHub/AIDDbot/AIDDbot](https://github.com/AIDDbot/AIDDbot)