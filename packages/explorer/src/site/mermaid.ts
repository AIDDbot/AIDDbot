// Renders the Mermaid blocks of a full document. The library loads only when a document has such a block.

let counter = 0;

function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
}

export async function renderMermaid(root: HTMLElement): Promise<void> {
  const blocks = [...root.querySelectorAll<HTMLElement>("pre > code.language-mermaid")];
  if (blocks.length === 0) return;
  const { default: mermaid } = await import("mermaid");
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "base",
    fontFamily: cssVar("font-body-md") || "Roboto, system-ui, sans-serif",
    themeVariables: {
      darkMode: document.documentElement.dataset.theme !== "light",
      background: cssVar("canvas"),
      primaryColor: cssVar("surface"),
      primaryTextColor: cssVar("on-surface"),
      primaryBorderColor: cssVar("primary"),
      lineColor: cssVar("muted"),
      secondaryColor: cssVar("surface"),
      tertiaryColor: cssVar("canvas"),
      textColor: cssVar("on-surface"),
      edgeLabelBackground: cssVar("canvas"),
    },
  });
  for (const code of blocks) {
    const source = code.textContent ?? "";
    const pre = code.parentElement as HTMLElement;
    try {
      const { svg } = await mermaid.render(`mermaid-${++counter}`, source);
      const figure = document.createElement("figure");
      figure.className = "mermaid-figure";
      figure.innerHTML = svg;
      figure.dataset.source = source;
      pre.replaceWith(figure);
    } catch (error) {
      pre.classList.add("mermaid-error");
      pre.title = `Mermaid could not render this diagram: ${(error as Error).message}`;
    }
  }
}
