// Hash addresses: `#/`, `#/<kind>/<id>`, `#/doc/<id>`, and `#/doc/<id>/<anchor>`.
import type { Kind } from "../shared/types.ts";

export type Route =
  | { view: "map" }
  | { view: "element"; kind: Kind; id: string }
  | { view: "doc"; id: string; anchor: string }
  | { view: "not-found"; address: string };

const KINDS = new Set<string>(["phase", "step", "block", "type"]);

export function parseRoute(hash: string): Route {
  const address = hash.replace(/^#/, "");
  if (address === "" || address === "/") return { view: "map" };
  const parts = address.replace(/^\//, "").split("/").map(decodeURIComponent);
  const [first = "", id = "", anchor = "", ...rest] = parts;
  if (rest.length > 0 || !id) return { view: "not-found", address };
  if (first === "doc") return { view: "doc", id, anchor };
  if (KINDS.has(first) && !anchor) return { view: "element", kind: first as Kind, id };
  return { view: "not-found", address };
}
