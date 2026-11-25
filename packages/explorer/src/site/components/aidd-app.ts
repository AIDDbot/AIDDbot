// <aidd-app>: the site shell. It shows the view that the hash address asks for.
import { escapeHtml, loadData } from "../data.ts";
import { parseRoute } from "../router.ts";

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
        <nav aria-label="Main"><a href="#/">Map</a><a href="#/doc/index">Wiki</a></nav>
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
            .map((p) => `<li><code>${escapeHtml(p.file)}</code>: ${escapeHtml(p.message)}</li>`)
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
        document.title = "AIDDbot explorer";
        view = document.createElement("map-view");
        break;
      case "element":
        view = document.createElement("element-page");
        view.setAttribute("kind", route.kind);
        view.setAttribute("element", route.id);
        break;
      case "doc": {
        // Same document, other anchor: scroll only.
        const current = this.main.querySelector("doc-view");
        if (current && current.getAttribute("doc") === route.id && route.anchor) {
          current.setAttribute("anchor", route.anchor);
          document.getElementById(route.anchor)?.scrollIntoView({ block: "start" });
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

/** <map-view>: the home view. */
export class MapView extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="map-intro">
        <h1>The AIDDbot method</h1>
        <p>Seven lifecycle phases. Inside them, the five steps of every change. Under each one, the documents it uses and makes. Below, the building blocks that do the work.</p>
      </section>
      <aidd-map></aidd-map>`;
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
      const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
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
