// <aidd-app>: the site shell. It shows the view that the hash address asks for.
import { breadcrumbsHtml, mapCrumbs } from "../breadcrumbs.ts";
import { escapeHtml, loadData } from "../data.ts";
import { MAP_LABEL } from "../layout.ts";
import { type MapView as MapName, parseRoute } from "../router.ts";

const LOGO = "https://albertobasalo.dev/logo_2.png";

export class AiddApp extends HTMLElement {
  private main!: HTMLElement;

  async connectedCallback() {
    this.innerHTML = `
      <a class="skip" href="#main" data-skip>Skip to content</a>
      <header class="top">
        <a class="brand" href="#/" aria-label="AIDDbot explorer: map">
          <img src="${LOGO}" alt="" width="32" height="32" />
          <span class="wordmark">AIDDbot</span><span class="brand-sub">explorer</span>
        </a>
        <nav aria-label="Main"><a href="#/">Map</a><a href="#/blocks">Building blocks</a><a href="#/doc/index">Wiki</a></nav>
        <theme-toggle></theme-toggle>
      </header>
      <main id="main" tabindex="-1"></main>
      <footer class="bottom"></footer>`;
    this.main = this.querySelector("main") as HTMLElement;
    this.querySelector("[data-skip]")?.addEventListener("click", (event) => {
      event.preventDefault();
      this.main.focus();
    });
    window.addEventListener("hashchange", () => this.route());
    try {
      const data = await loadData();
      const footer = this.querySelector("footer") as HTMLElement;
      const problems = data.problems.length
        ? `<details><summary>${data.problems.length} build problem(s)</summary><ul>${data.problems
            .map(
              (p) =>
                `<li><code>${escapeHtml(p.file)}</code>: ${escapeHtml(p.message)}</li>`,
            )
            .join("")}</ul></details>`
        : "<span>No build problems.</span>";
      footer.innerHTML = `<span>Built from the AIDDbot documents on ${escapeHtml(data.generated.slice(0, 10))}.</span>${problems}`;
      this.route();
    } catch (error) {
      this.main.innerHTML = `<div class="callout danger" role="alert"><strong>Error.</strong> The explorer could not load its data: ${escapeHtml(
        (error as Error).message,
      )}</div>`;
    }
  }

  private route() {
    const route = parseRoute(location.hash);
    let view: HTMLElement;
    switch (route.view) {
      case "map":
        document.title =
          route.map === "overview"
            ? "AIDDbot explorer"
            : `${MAP_LABEL[route.map]} · AIDDbot explorer`;
        view = document.createElement("map-view");
        view.setAttribute("map", route.map);
        break;
      case "blocks":
        view = document.createElement("blocks-view");
        break;
      case "element":
        view = document.createElement("element-page");
        view.setAttribute("kind", route.kind);
        view.setAttribute("element", route.id);
        break;
      case "doc": {
        // Same document, other anchor: scroll only.
        const current = this.main.querySelector("doc-view");
        if (
          current &&
          current.getAttribute("doc") === route.id &&
          route.anchor
        ) {
          current.setAttribute("anchor", route.anchor);
          document
            .getElementById(route.anchor)
            ?.scrollIntoView({ block: "start" });
          return;
        }
        view = document.createElement("doc-view");
        view.setAttribute("doc", route.id);
        if (route.anchor) view.setAttribute("anchor", route.anchor);
        break;
      }
      default:
        view = document.createElement("not-found-view");
    }
    this.main.replaceChildren(view);
    if (route.view !== "doc") window.scrollTo({ top: 0 });
  }
}

const INTRO: Record<MapName, { title: string; text: string }> = {
  overview: {
    title: "The AIDDbot method",
    text: "On top, the project loop of lifecycle phases. At the bottom, the change loop: the steps of every change. Between them, the project brain that each change reads and Close updates. Select the brain or the change loop to see their documents.",
  },
  change: {
    title: "The change loop",
    text: "The steps of every change, with the documents that each step makes. On top, the project brain that each change reads and Close updates. Choose an impact level to see the documents of that level.",
  },
  brain: {
    title: "The project brain",
    text: "The living documents of the project, in the middle. The lifecycle phases are above and the change steps below. Point at a document to see who writes it and who reads it.",
  },
};

/** <map-view map="change">: the overview or a detail map. */
export class MapView extends HTMLElement {
  connectedCallback() {
    const map = (this.getAttribute("map") ?? "overview") as MapName;
    const intro = INTRO[map] ?? INTRO.overview;
    this.innerHTML = `
      <section class="map-intro">
        ${map === "overview" ? "" : breadcrumbsHtml(mapCrumbs(map))}
        <h1>${intro.title}</h1>
        <p>${intro.text}</p>
      </section>
      <aidd-map map="${map}"></aidd-map>`;
  }
}

/** <theme-toggle>: switches between the dark and the light theme. */
export class ThemeToggle extends HTMLElement {
  connectedCallback() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-button";
    const update = () => {
      const light = document.documentElement.dataset.theme === "light";
      button.textContent = light ? "Dark theme" : "Light theme";
      button.setAttribute("aria-pressed", String(light));
    };
    button.addEventListener("click", () => {
      const next =
        document.documentElement.dataset.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("aiddbot-theme", next);
      } catch {
        // Private mode: the theme lasts only for this page.
      }
      update();
    });
    update();
    this.replaceChildren(button);
  }
}

customElements.define("map-view", MapView);
customElements.define("theme-toggle", ThemeToggle);
customElements.define("aidd-app", AiddApp);
