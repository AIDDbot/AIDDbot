// Small helpers to build SVG and to animate it.

const NS = "http://www.w3.org/2000/svg";

type Attrs = Record<string, string | number | undefined>;

export function svg<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Attrs = {},
  ...children: (Node | string)[]
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(NS, tag);
  for (const [name, value] of Object.entries(attrs))
    if (value !== undefined) node.setAttribute(name, String(value));
  for (const child of children) node.append(child);
  return node;
}

/** True when the person asks the browser for reduced motion. */
export function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Arrow markers for a diagram. */
export function defs(): SVGDefsElement {
  const marker = (id: string, cls: string, size = 7) =>
    svg(
      "marker",
      {
        id,
        viewBox: "0 0 10 10",
        refX: 9,
        refY: 5,
        markerWidth: size,
        markerHeight: size,
        orient: "auto-start-reverse",
      },
      svg("path", { d: "M0,0 L10,5 L0,10 z", class: cls }),
    );
  return svg(
    "defs",
    {},
    marker("arrow", "arrow-head"),
    marker("arrow-accent", "arrow-head accent"),
    marker("arrow-active", "arrow-head active", 11),
  );
}

/** Shortens a label to fit a box of `width` units, at about 7.5 units for each character. */
export function fit(label: string, width: number, charWidth = 7.5): string {
  const max = Math.max(3, Math.floor((width - 10) / charWidth));
  return label.length > max ? `${label.slice(0, max - 1)}…` : label;
}

/**
 * Builds a diagram up step by step: each child with `data-step` fades in after the previous steps.
 * With reduced motion, the diagram shows its final state at once.
 */
export function buildUp(root: SVGSVGElement, stepMs = 160): void {
  if (reducedMotion()) return;
  for (const node of root.querySelectorAll<SVGGraphicsElement>("[data-step]")) {
    const step = Number(node.dataset.step ?? 0);
    if (node instanceof SVGPathElement && node.classList.contains("edge")) {
      const length = node.getTotalLength?.() ?? 0;
      node.animate(
        [
          {
            strokeDasharray: `${length}`,
            strokeDashoffset: length,
            opacity: 0,
          },
          { strokeDasharray: `${length}`, strokeDashoffset: 0, opacity: 1 },
        ],
        {
          duration: 420,
          delay: step * stepMs,
          easing: "ease-out",
          fill: "backwards",
        },
      );
    } else {
      node.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: 360,
          delay: step * stepMs,
          easing: "ease-out",
          fill: "backwards",
        },
      );
    }
  }
}
