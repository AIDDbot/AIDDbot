// The breadcrumbs of a view: the path from the overview through the parent map.
import type { Element, MapId } from "../shared/types.ts";
import { elementHref, escapeHtml } from "./data.ts";
import { MAP_HREF, MAP_LABEL } from "./layout.ts";

export interface Crumb {
  label: string;
  href: string;
  code?: boolean;
}

/** The path of a map or a view: Map, then the map itself. */
export function mapCrumbs(map: MapId): Crumb[] {
  const root = { label: MAP_LABEL.overview, href: MAP_HREF.overview };
  if (map === "overview") return [root];
  return [root, { label: MAP_LABEL[map], href: MAP_HREF[map] }];
}

/** The path of an element: Map, its parent map, then the element. */
export function elementCrumbs(element: Element): Crumb[] {
  return [
    ...mapCrumbs(element.parent),
    {
      label: element.name,
      href: elementHref(element),
      code: element.kind === "type",
    },
  ];
}

/** The breadcrumbs as HTML. Each part is a link. The last part is the current page. */
export function breadcrumbsHtml(crumbs: Crumb[]): string {
  const items = crumbs
    .map((c, i) => {
      const text = c.code
        ? `<code>${escapeHtml(c.label)}</code>`
        : escapeHtml(c.label);
      const current = i === crumbs.length - 1 ? ' aria-current="page"' : "";
      return `<li><a href="${c.href}"${current}>${text}</a></li>`;
    })
    .join("");
  return `<nav class="breadcrumbs" aria-label="Breadcrumbs"><ol>${items}</ol></nav>`;
}
