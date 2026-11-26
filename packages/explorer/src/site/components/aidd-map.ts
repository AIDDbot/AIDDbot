// <aidd-map map="change">: one map of the method. With `mini`, the small map of an element page.
import type { Element, ExplorerData, MapId } from "../../shared/types.ts";
import {
  allElements,
  elementHref,
  escapeHtml,
  fieldOf,
  KIND_LABEL,
  key,
  loadData,
} from "../data.ts";
import {
  DEFAULT_IMPACT,
  impactLevel,
  MAP_HREF,
  MAP_LABEL,
  type MapLayout,
  type MapNode,
  mapLayout,
} from "../layout.ts";
import { defs, fit, reducedMotion, svg } from "../svg.ts";

const MAPS = new Set<string>(["overview", "change", "brain", "blocks"]);

const ARIA_LABEL: Record<MapId, string> = {
  overview:
    "Overview of AIDDbot: the project loop of lifecycle phases, the project brain, and the change loop of steps.",
  change:
    "Change loop map: the steps of a change, the document types of each step, and the project brain.",
  brain:
    "Project brain map: the brain document types, with the phases above and the steps below.",
  blocks: "The building blocks of AIDDbot.",
};

export class AiddMap extends HTMLElement {
  static observedAttributes = ["current", "mini", "map"];
  private data: ExplorerData | null = null;
  private busy = false;
  private impact = DEFAULT_IMPACT;

  async connectedCallback() {
    this.data = await loadData();
    this.render();
  }

  attributeChangedCallback() {
    if (this.data) this.render();
  }

  get mini(): boolean {
    return this.hasAttribute("mini");
  }

  get map(): MapId {
    const map = this.getAttribute("map") ?? "overview";
    return (MAPS.has(map) ? map : "overview") as MapId;
  }

  private render() {
    const data = this.data;
    if (!data) return;
    const map = this.map;
    const layout = mapLayout(data, map, this.impact);
    const current = this.getAttribute("current") ?? "";
    const links = relatedKeys(data, layout);

    const world = svg("g", { class: "world" });
    for (const f of layout.frames) {
      const rect = svg("rect", {
        class: f.cls,
        x: f.x,
        y: f.y,
        width: f.w,
        height: f.h,
        rx: 14,
      });
      if (f.href && !this.mini)
        world.append(
          svg(
            "a",
            { href: f.href, class: "frame-link" },
            svg("title", {}, `Open the ${MAP_LABEL.change.toLowerCase()} map`),
            rect,
          ),
        );
      else world.append(rect);
    }
    for (const e of layout.edges) {
      const marker =
        e.cls.includes("doc-edge") || e.cls.includes("zoom-edge")
          ? undefined
          : e.cls.includes("hover-edge")
            ? "url(#arrow-active)"
            : "url(#arrow)";
      world.append(
        svg("path", {
          class: e.cls,
          d: e.d,
          "data-from": e.from,
          "data-to": e.to,
          "marker-start": e.cls.includes("both") ? marker : undefined,
          "marker-end": marker,
        }),
      );
    }
    // Labels go over the links, so a heading stays readable where a link crosses it.
    if (!this.mini) {
      for (const l of layout.labels)
        world.append(svg("text", { class: l.cls, x: l.x, y: l.y }, l.text));
    }
    for (const node of layout.nodes) world.append(this.node(node, current));

    const label = this.mini
      ? `Mini-map: ${MAP_LABEL[map]}. Select it to open this map.`
      : ARIA_LABEL[map];
    const root = svg(
      "svg",
      {
        class: `map ${this.mini ? "mini" : "full"}`,
        viewBox: `0 0 ${layout.width} ${layout.height}`,
        role: this.mini ? "img" : "group",
        "aria-label": label,
      },
      defs(),
      world,
    );

    if (this.mini) {
      const link = document.createElement("a");
      link.href = MAP_HREF[map];
      link.className = "mini-map";
      link.setAttribute("aria-label", label);
      link.append(root);
      this.replaceChildren(link);
      return;
    }

    root.addEventListener("pointerover", (event) =>
      this.highlight(root, event.target, links),
    );
    root.addEventListener("focusin", (event) =>
      this.highlight(root, event.target, links),
    );
    root.addEventListener("pointerleave", () =>
      this.highlight(root, null, links),
    );
    root.addEventListener("focusout", () => this.highlight(root, null, links));
    root.addEventListener("click", (event) => this.zoom(event, root));

    const figure = document.createElement("figure");
    figure.className = "map-figure";
    figure.append(root);
    const caption = document.createElement("figcaption");
    caption.textContent =
      "Select an element to open it. Point at an element to see its links. The list below has the same content as text.";
    figure.append(caption);
    const parts: HTMLElement[] = [];
    if (map === "change") parts.push(this.impactSelector(data));
    parts.push(figure, textEquivalent(data, layout));
    this.replaceChildren(...parts);
  }

  /** The selector of impact levels of the change loop map. */
  private impactSelector(data: ExplorerData): HTMLElement {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "impact-filter";
    const level = impactLevel(data, this.impact);
    const note = level
      ? [
          level.skips.length
            ? `Hides ${level.skips.map((id) => `<code>${escapeHtml(id)}</code>`).join(", ")}.`
            : "",
          level.adds.length
            ? `Marks ${level.adds.map((id) => `<code>${escapeHtml(id)}</code>`).join(", ")} as required.`
            : "",
        ]
          .filter(Boolean)
          .join(" ") || "Shows the full change flow."
      : "";
    fieldset.innerHTML = `<legend>Impact level</legend>${data.impacts
      .map(
        (l) =>
          `<label><input type="radio" name="impact" value="${escapeHtml(l.id)}"${
            l.id === level?.id ? " checked" : ""
          } /> <code>${escapeHtml(l.id)}</code></label>`,
      )
      .join(
        "",
      )}<a href="#/doc/documentation-catalog/impact-levels">About impact levels</a><p class="impact-note" aria-live="polite">${note}</p>`;
    fieldset.addEventListener("change", (event) => {
      const input = event.target as HTMLInputElement;
      this.impact = input.value;
      this.render();
      this.querySelector<HTMLInputElement>(
        `.impact-filter input[value="${CSS.escape(input.value)}"]`,
      )?.focus();
    });
    return fieldset;
  }

  private node(node: MapNode, current: string): SVGElement {
    const cls = `node ${node.kind}${node.key === current ? " current" : ""}${
      node.extra ? ` ${node.extra}` : ""
    }`;
    const shape = svg("rect", {
      x: node.x,
      y: node.y,
      width: node.w,
      height: node.h,
      rx: node.kind === "type" ? 6 : 10,
    });
    const cx = node.x + node.w / 2;
    const lines = node.lines ?? [node.label];
    const lineHeight = 15;
    const text = svg(
      "text",
      {
        x: cx,
        y: node.y + node.h / 2 - ((lines.length - 1) * lineHeight) / 2,
        "text-anchor": "middle",
        "dominant-baseline": "central",
      },
      ...lines.map((line, i) =>
        svg(
          "tspan",
          { x: cx, dy: i === 0 ? 0 : lineHeight },
          fit(line, node.w, node.kind === "type" ? 7.2 : 7.5),
        ),
      ),
    );
    const required = node.extra?.includes("required") ? " (required)" : "";
    const kindLabel = node.kind === "map" ? "Map" : KIND_LABEL[node.kind];
    const title = svg(
      "title",
      {},
      node.kind === "map"
        ? `Open the ${MAP_LABEL.brain.toLowerCase()} map`
        : `${kindLabel}: ${node.label}${required}`,
    );
    if (this.mini)
      return svg("g", { class: cls, "data-key": node.key }, title, shape);
    return svg(
      "a",
      { href: node.href, class: cls, "data-key": node.key },
      title,
      shape,
      text,
    );
  }

  private highlight(
    root: SVGSVGElement,
    target: EventTarget | null,
    links: Map<string, Set<string>>,
  ) {
    const node =
      target instanceof Element ? target.closest<SVGElement>(".node") : null;
    const k = node?.dataset.key;
    root.classList.toggle("focus-mode", Boolean(k));
    const related = k
      ? new Set([k, ...(links.get(k) ?? [])])
      : new Set<string>();
    for (const n of root.querySelectorAll<SVGElement>(".node"))
      n.classList.toggle("related", related.has(n.dataset.key ?? ""));
    for (const e of root.querySelectorAll<SVGElement>(".edge")) {
      e.classList.toggle(
        "related",
        Boolean(k) && (e.dataset.from === k || e.dataset.to === k),
      );
    }
  }

  /** Zooms into the box, then opens its address. With reduced motion, opens it at once. */
  private zoom(event: MouseEvent, root: SVGSVGElement) {
    const link =
      event.target instanceof Element
        ? event.target.closest<SVGAElement>("a.node, a.frame-link")
        : null;
    if (!link) return;
    event.preventDefault();
    const href = link.getAttribute("href") ?? "#/";
    if (reducedMotion() || this.busy) {
      location.hash = href;
      return;
    }
    this.busy = true;
    const box = (link.querySelector("rect") as SVGRectElement).getBBox();
    const view = root.viewBox.baseVal;
    const scale = Math.max(
      1,
      Math.min(
        5,
        (view.width * 0.4) / box.width,
        (view.height * 0.5) / box.height,
      ),
    );
    const tx = view.width / 2 - (box.x + box.width / 2) * scale;
    const ty = view.height / 2 - (box.y + box.height / 2) * scale;
    const world = root.querySelector<SVGGElement>(".world");
    root.classList.add("zooming");
    link.classList.add("zoom-target");
    const animation = world?.animate(
      [
        { transform: "none" },
        { transform: `translate(${tx}px, ${ty}px) scale(${scale})` },
      ],
      {
        duration: 650,
        easing: "cubic-bezier(.4,0,.2,1)",
        fill: "forwards",
      },
    );
    const go = () => {
      this.busy = false;
      location.hash = href;
    };
    if (animation) animation.onfinish = go;
    else go();
  }
}

/** For each box: the boxes linked to it, by its element links and by the edges of the map. */
function relatedKeys(
  data: ExplorerData,
  layout: MapLayout,
): Map<string, Set<string>> {
  const links = new Map(
    allElements(data).map((e) => [key(e), new Set(e.links.map(key))]),
  );
  for (const e of layout.edges) {
    for (const [a, b] of [
      [e.from, e.to],
      [e.to, e.from],
    ] as const) {
      const set = links.get(a) ?? new Set<string>();
      set.add(b);
      links.set(a, set);
    }
  }
  return links;
}

/** The text equivalent of a map: one list for each row, in table order. */
function textEquivalent(data: ExplorerData, layout: MapLayout): HTMLElement {
  const details = document.createElement("details");
  details.className = "map-text";
  const shown = new Set(layout.nodes.map((n) => n.key));
  const { phases, steps, types } = data.chapters;
  const brain = types.filter((t) => data.brain.includes(t.id));
  const names = (e: Element, column: string) =>
    (fieldOf(e, column)?.refs ?? [])
      .filter((r) => shown.has(key(r)))
      .map((r) => escapeHtml(r.label))
      .join(", ") || "—";
  const list = (title: string, items: Element[], note: (e: Element) => string) =>
    `<section><h2>${escapeHtml(title)}</h2><ol>${items
      .filter((e) => shown.has(key(e)))
      .map(
        (e) =>
          `<li><a href="${elementHref(e)}">${escapeHtml(e.name)}</a> <span class="muted">— ${note(e)}</span></li>`,
      )
      .join("")}</ol></section>`;
  const uses = (e: Element) =>
    `uses ${names(e, "Uses")}; produces ${names(e, "Produces")}`;
  const writers = (t: Element) => {
    const by = (column: string) =>
      [...phases, ...steps]
        .filter((e) => fieldOf(e, column)?.refs.some((r) => r.id === t.id))
        .map((e) => escapeHtml(e.name))
        .join(", ") || "—";
    return `written by ${by("Produces")}; read by ${by("Uses")}`;
  };
  const brainUse = (e: Element) => {
    const touches = (column: string) =>
      fieldOf(e, column)?.refs.some((r) => data.brain.includes(r.id)) ?? false;
    const parts = [
      touches("Uses") ? "reads the project brain" : "",
      touches("Produces") ? "writes the project brain" : "",
    ].filter(Boolean);
    return parts.join(", ") || "no link to the project brain";
  };
  const owner = (t: Element) =>
    `${t.owner ? `under ${escapeHtml(t.owner.label)}` : "no step"}${
      layout.nodes.find((n) => n.key === key(t))?.extra?.includes("required")
        ? ", required"
        : ""
    }`;
  let body = "";
  switch (layout.map) {
    case "overview":
      body = `${list("Project loop: lifecycle phases", phases, brainUse)}<section><h2>${MAP_LABEL.brain}</h2><p><a href="${MAP_HREF.brain}">Open the project brain map</a>.</p></section>${list(
        "Change loop: steps",
        steps,
        (e) =>
          `${brainUse(e)}; <a href="${MAP_HREF.change}">open the change loop map</a>`,
      )}`;
      break;
    case "change":
      body = `${list(MAP_LABEL.brain, brain, writers)}${list("Change loop: steps", steps, uses)}${list(
        "Change documents",
        types.filter((t) => !data.brain.includes(t.id)),
        owner,
      )}`;
      break;
    case "brain":
      body = `${data.brainGroups
        .map((g) =>
          list(
            `${MAP_LABEL.brain}: ${g.label}`,
            brain.filter((t) => g.types.includes(t.id)),
            writers,
          ),
        )
        .join("")}${list("Lifecycle phases", phases, uses)}${list("Change loop: steps", steps, uses)}`;
      break;
    default:
      body = "";
  }
  details.innerHTML = `<summary>The map as text</summary><div class="map-text-grid">${body}</div>`;
  return details;
}

customElements.define("aidd-map", AiddMap);
