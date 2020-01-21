export class ShadowRoot extends HTMLElement {

  constructor() {
    super();
    this.stamp();
  }

  connectedCallback() {
  }

  stamp() {
    const parent = this.parentElement; // this.parentNode
    if (!parent) {
      throw 'declarative-shadow-dom needs a perentElement to stamp to';
    }

    let shadowRoot = parent.shadowRoot;
    if (!shadowRoot) {
      shadowRoot = parent.attachShadow({ mode: this.getAttribute('mode') || 'open' });
    } else {
      // parent already has a shadowRoot attached
      throw new Error("Can not re-attach shadow to parent!");
    }

    for (let node of this.childNodes) {
      let fragment = document.importNode(node, true);
      shadowRoot.appendChild(fragment);
    }

    parent.removeChild(this);
  }

}