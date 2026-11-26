// Hash addresses: `#/`, `#/map/<map>`, `#/blocks`, `#/<kind>/<id>`, `#/doc/<id>`, and `#/doc/<id>/<anchor>`.
import type { Kind } from "../shared/types.ts";

/** The maps with their own view. The blocks view is not a map. */
export type MapView = "overview" | "change" | "brain";

export type Route =
  | { view: "map"; map: MapView }
  | { view: "blocks" }
  | { view: "element"; kind: Kind; id: string }
  | { view: "doc"; id: string; anchor: string }
  | { view: "not-found"; address: string };

const KINDS = new Set<string>(["phase", "step", "block", "type"]);
const DETAIL_MAPS = new Set<string>(["change", "brain"]);

export function parseRoute(hash: string): Route {
  const address = hash.replace(/^#/, "");
  if (address === "" || address === "/")
    return { view: "map", map: "overview" };
  const parts = address.replace(/^\//, "").split("/").map(decodeURIComponent);
  const [first = "", id = "", anchor = "", ...rest] = parts;
  if (first === "blocks" && parts.length === 1) return { view: "blocks" };
  if (rest.length > 0 || !id) return { view: "not-found", address };
  if (first === "map" && DETAIL_MAPS.has(id) && !anchor)
    return { view: "map", map: id as MapView };
  if (first === "doc") return { view: "doc", id, anchor };
  if (KINDS.has(first) && !anchor)
    return { view: "element", kind: first as Kind, id };
  return { view: "not-found", address };
}
