class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Jimenez Sanches Luis Eduardo.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
