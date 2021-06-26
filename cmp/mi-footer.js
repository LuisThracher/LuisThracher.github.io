class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Jiménez Sánchez Luis Eduardo.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
