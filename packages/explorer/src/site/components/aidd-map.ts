// <aidd-map>: the map of the whole method. With `mini`, the small map of an element page.
import type { ExplorerData } from "../../shared/types.ts";
import {
  allElements,
  CHAPTER_LABEL,
  elementHref,
  escapeHtml,
  KIND_LABEL,
  key,
  loadData,
} from "../data.ts";
import { mapLayout, type MapNode } from "../layout.ts";
import { defs, fit, reducedMotion, svg } from "../svg.ts";

export class AiddMap extends HTMLElement {
  static observedAttributes = ["current", "mini"];
  private data: ExplorerData | null = null;
  private busy = false;

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

  private render() {
    const data = this.data;
    if (!data) return;
    const layout = mapLayout(data);
    const current = this.getAttribute("current") ?? "";
    const links = new Map(
      allElements(data).map((e) => [key(e), new Set(e.links.map(key))]),
    );

    const world = svg("g", { class: "world" });
    world.append(
      svg("rect", {
        class: "band brain-band",
        x: layout.brain.x,
        y: layout.brain.y,
        width: layout.brain.w,
        height: layout.brain.h,
        rx: 14,
      }),
    );
    world.append(
      svg("rect", {
        class: "band",
        x: layout.band.x,
        y: layout.band.y,
        width: layout.band.w,
        height: layout.band.h,
        rx: 14,
      }),
    );
    if (layout.flow) {
      const f = layout.flow;
      world.append(
        svg("rect", {
          class: "flow-frame",
          x: f.x,
          y: f.y,
          width: f.w,
          height: f.h,
          rx: 14,
        }),
      );
    }
    if (!this.mini) {
      for (const l of layout.labels)
        world.append(svg("text", { class: l.cls, x: l.x, y: l.y }, l.text));
    }
    for (const e of layout.edges) {
      const marker =
        e.cls.includes("doc-edge") || e.cls.includes("zoom-edge")
          ? undefined
          : "url(#arrow)";
      world.append(
        svg("path", {
          class: e.cls,
          d: e.d,
          "data-from": e.from,
          "data-to": e.to,
          "marker-end": marker,
        }),
      );
    }
    for (const node of layout.nodes) world.append(this.node(node, current));

    const label = this.mini
      ? "Mini-map of AIDDbot. Select it to go back to the map."
      : "Map of AIDDbot: the project loop of lifecycle phases, the project brain, the change loop of steps with their document types, and the building blocks.";
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
      link.href = "#/";
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
      "Select an element to open its page. Point at an element to see its links. The list below has the same content as text.";
    figure.append(caption);
    this.replaceChildren(figure, this.textEquivalent(data));
  }

  private node(node: MapNode, current: string): SVGElement {
    const k = `${node.kind}/${node.id}`;
    const cls = `node ${node.kind}${k === current ? " current" : ""}`;
    const shape = svg("rect", {
      x: node.x,
      y: node.y,
      width: node.w,
      height: node.h,
      rx: node.kind === "type" ? 6 : 10,
    });
    const text = svg(
      "text",
      {
        x: node.x + node.w / 2,
        y: node.y + node.h / 2,
        "text-anchor": "middle",
        "dominant-baseline": "central",
      },
      fit(node.label, node.w, node.kind === "type" ? 7.2 : 7.5),
    );
    const title = svg("title", {}, `${KIND_LABEL[node.kind]}: ${node.label}`);
    if (this.mini) return svg("g", { class: cls, "data-key": k }, title, shape);
    return svg(
      "a",
      { href: elementHref(node), class: cls, "data-key": k },
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

  /** Zooms into the element, then opens its page. With reduced motion, opens the page at once. */
  private zoom(event: MouseEvent, root: SVGSVGElement) {
    const link =
      event.target instanceof Element
        ? event.target.closest<SVGAElement>("a.node")
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
    const scale = Math.min(
      5,
      (view.width * 0.4) / box.width,
      (view.height * 0.5) / box.height,
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

  /** The text equivalent of the map: one list for each chapter, in table order. */
  private textEquivalent(data: ExplorerData): HTMLElement {
    const details = document.createElement("details");
    details.className = "map-text";
    const { phases, steps, blocks, types } = data.chapters;
    const brain = types.filter((t) => data.brain.includes(t.id));
    const changeTypes = types.filter((t) => !data.brain.includes(t.id));
    const list = (
      title: string,
      items: {
        kind: string;
        id: string;
        name: string;
        links: { label: string }[];
      }[],
    ) =>
      `<section><h2>${escapeHtml(title)}</h2><ol>${items
        .map(
          (e) =>
            `<li><a href="#/${e.kind}/${e.id}">${escapeHtml(e.name)}</a> <span class="muted">— linked to ${e.links
              .map((l) => escapeHtml(l.label))
              .join(", ")}</span></li>`,
        )
        .join("")}</ol></section>`;
    details.innerHTML = `<summary>The map as text</summary><div class="map-text-grid">${list("Project loop: lifecycle phases", phases)}${list(
      "Project brain",
      brain,
    )}${list("Change loop: steps", steps)}${list(
      "Change documents",
      changeTypes,
    )}${list(CHAPTER_LABEL.block, blocks)}</div>`;
    return details;
  }
}

customElements.define("aidd-map", AiddMap);
