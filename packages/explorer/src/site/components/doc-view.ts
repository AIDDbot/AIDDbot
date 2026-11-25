// <doc-view doc="glossary" anchor="spec">: one full document, rendered, with META badges and a table of contents.
import type { Doc, LinkItem } from "../../shared/types.ts";
import { escapeHtml, findDoc, loadData } from "../data.ts";
import { renderMermaid } from "../mermaid.ts";

const BADGE_CLASS: Record<string, string> = {
  done: "verified",
  accepted: "verified",
  draft: "warning",
  proposed: "warning",
  superseded: "muted",
  deprecated: "muted",
};

function linkList(items: LinkItem[]): string {
  return items
    .map((i) =>
      i.href
        ? `<li><a href="${escapeHtml(i.href)}"${i.external ? ' target="_blank" rel="noopener"' : ""}>${escapeHtml(i.label)}</a></li>`
        : `<li><span class="outside">${escapeHtml(i.label)}</span></li>`,
    )
    .join("");
}

export class DocView extends HTMLElement {
  async connectedCallback() {
    const data = await loadData();
    const doc = findDoc(data, this.getAttribute("doc") ?? "");
    if (!doc) {
      this.replaceChildren(document.createElement("not-found-view"));
      return;
    }
    this.render(doc);
    await renderMermaid(this);
    this.scrollToAnchor();
  }

  private render(doc: Doc) {
    document.title = `${doc.title} · AIDDbot explorer`;
    const badges = doc.meta
      ? Object.entries(doc.meta)
          .map(([k, v]) => {
            const cls = k === "status" ? (BADGE_CLASS[v] ?? "") : k === "type" ? "primary" : "";
            const value = k === "type" ? `<a href="#/type/${escapeHtml(v)}">${escapeHtml(v)}</a>` : escapeHtml(v);
            return `<span class="badge ${cls}"><span class="badge-key">${k}</span> ${value}</span>`;
          })
          .join("")
      : `<span class="badge"><span class="badge-key">type</span> <a href="#/type/${escapeHtml(doc.type)}">${escapeHtml(doc.type)}</a></span>
         <span class="badge muted">no META by design</span>`;
    const warnings = doc.warnings.length
      ? `<div class="callout warning" role="note"><strong>Warning.</strong> The build found ${doc.warnings.length} problem(s) in this document:<ul>${doc.warnings
          .map((w) => `<li>${escapeHtml(w)}</li>`)
          .join("")}</ul></div>`
      : "";
    const toc = doc.toc
      .map((t) => `<li class="toc-${t.level}"><a href="#/doc/${doc.id}/${t.id}">${escapeHtml(t.text)}</a></li>`)
      .join("");
    this.innerHTML = `
      <div class="page doc-page">
        <article class="page-main">
          <p class="eyebrow"><a href="#/">Map</a> › <code>${escapeHtml(doc.path)}</code></p>
          <div class="badges">${badges}</div>
          ${warnings}
          <div class="prose doc-body">${doc.html}</div>
        </article>
        <aside class="page-aside">
          ${toc ? `<nav aria-label="Contents"><h2>Contents</h2><ul class="toc">${toc}</ul></nav>` : ""}
          ${doc.related.length ? `<h2>Related</h2><ul class="link-list">${linkList(doc.related)}</ul>` : ""}
          ${doc.sources.length ? `<h2>Sources</h2><ul class="link-list sources">${linkList(doc.sources)}</ul>` : ""}
        </aside>
      </div>`;
  }

  private scrollToAnchor() {
    const anchor = this.getAttribute("anchor");
    if (!anchor) {
      window.scrollTo({ top: 0 });
      return;
    }
    const target = document.getElementById(anchor) ?? document.getElementById(anchor.toLowerCase());
    if (!target) return;
    target.scrollIntoView({ block: "start" });
    // A table row anchor (glossary term) marks its row.
    const row = target.closest("tr") ?? target;
    row.classList.add("target");
  }
}

customElements.define("doc-view", DocView);
