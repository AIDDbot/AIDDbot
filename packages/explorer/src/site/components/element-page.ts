// <element-page kind="phase" element="design">: one element of the method, with its diagram, sections, and mini-map.
import type { Element, ExplorerData, Section } from "../../shared/types.ts";
import { CHAPTER_LABEL, elementHref, escapeHtml, findDoc, findElement, KIND_LABEL, loadData } from "../data.ts";
import { diagram } from "../diagrams.ts";
import { buildUp } from "../svg.ts";

/** The column that holds the name of the element. The summary does not repeat it. */
const NAME_COLUMN: Record<string, string> = { phase: "Phase", step: "Step", block: "Block", type: "ID" };

export class ElementPage extends HTMLElement {
  async connectedCallback() {
    const data = await loadData();
    const element = findElement(data, this.getAttribute("kind") ?? "", this.getAttribute("element") ?? "");
    if (!element) {
      this.replaceChildren(document.createElement("not-found-view"));
      return;
    }
    this.render(data, element);
  }

  private render(data: ExplorerData, element: Element) {
    document.title = `${element.name} · AIDDbot explorer`;
    const summary = element.fields
      .filter((f) => f.column !== NAME_COLUMN[element.kind] && f.column !== "#" && f.html)
      .map((f) => `<dt>${escapeHtml(f.column)}</dt><dd>${f.html}</dd>`)
      .join("");
    const sections = (list: Section[], cls: string) =>
      list
        .map(
          (s) =>
            `<article class="${cls}"><h3><a href="#/doc/${s.docId}${s.anchor ? `/${s.anchor}` : ""}">${escapeHtml(s.title)}</a>
             <small>${escapeHtml(findDoc(data, s.docId)?.title ?? s.docId)}</small></h3><div class="prose">${s.html}</div></article>`,
        )
        .join("");
    const documents = (element.documents ?? [])
      .map((id) => findDoc(data, id))
      .filter((d) => d !== undefined)
      .map((d) => `<li><a href="#/doc/${d.id}"><code>${escapeHtml(d.id)}</code> ${escapeHtml(d.title)}</a></li>`)
      .join("");
    const links = element.links
      .map((l) => `<li><a href="${elementHref(l)}"><span class="kind">${KIND_LABEL[l.kind]}</span><span>${escapeHtml(l.label)}</span></a></li>`)
      .join("");

    this.innerHTML = `
      <div class="page">
        <div class="page-main">
          <p class="eyebrow"><a href="#/">Map</a> › ${CHAPTER_LABEL[element.kind]}</p>
          <h1 class="${element.kind === "type" ? "code-title" : ""}">${escapeHtml(element.name)}</h1>
          <dl class="summary">${summary}</dl>
          <figure class="diagram-figure"><figcaption>${KIND_LABEL[element.kind]} diagram</figcaption></figure>
          ${documents ? `<section><h2>Documents of this type</h2><ul class="doc-list">${documents}</ul></section>` : ""}
          ${element.sections.length ? `<section><h2>From the wiki</h2>${sections(element.sections, "section-card")}</section>` : ""}
          ${element.terms.length ? `<section><h2>Glossary terms</h2>${sections(element.terms, "term-card")}</section>` : ""}
        </div>
        <aside class="page-aside">
          <aidd-map mini current="${element.kind}/${element.id}"></aidd-map>
          <h2>Linked elements</h2>
          <ul class="link-list">${links}</ul>
        </aside>
      </div>`;
    const svgDiagram = diagram(data, element);
    this.querySelector(".diagram-figure")?.prepend(svgDiagram);
    buildUp(svgDiagram);
  }
}

customElements.define("element-page", ElementPage);
