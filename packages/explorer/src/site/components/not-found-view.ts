// <not-found-view>: the view for an unknown address.

export class NotFoundView extends HTMLElement {
  connectedCallback() {
    document.title = "Not found · AIDDbot explorer";
    this.innerHTML = `
      <section class="not-found">
        <h1>Page not found</h1>
        <p>The explorer has no page at this address.</p>
        <p><a class="button" href="#/">Go to the map</a></p>
      </section>`;
  }
}

customElements.define("not-found-view", NotFoundView);
