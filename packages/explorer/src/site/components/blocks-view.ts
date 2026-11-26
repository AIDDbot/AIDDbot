// <blocks-view>: every building block in table order, with its role and a link to its page.
import { elementHref, escapeHtml, fieldOf, loadData } from "../data.ts";
import { breadcrumbsHtml, mapCrumbs } from "../breadcrumbs.ts";

export class BlocksView extends HTMLElement {
  async connectedCallback() {
    document.title = "Building blocks · AIDDbot explorer";
    const data = await loadData();
    const rows = data.chapters.blocks
      .map(
        (b) =>
          `<li class="block-card"><h2><a href="${elementHref(b)}">${escapeHtml(b.name)}</a></h2><div class="prose">${
            fieldOf(b, "Role")?.html ?? ""
          }</div></li>`,
      )
      .join("");
    this.innerHTML = `
      <section class="map-intro">
        ${breadcrumbsHtml(mapCrumbs("blocks"))}
        <h1>Building blocks</h1>
        <p>The parts of AIDDbot that do the work. Select a block to open its page.</p>
      </section>
      <ol class="block-list">${rows}</ol>`;
  }
}

customElements.define("blocks-view", BlocksView);
