export class ShadowRoot extends HTMLElement {

  constructor() {
    super();
    console.log("constructor - " + this.tagName);
    this.stamp();
  }

  connectedCallback() {
    console.log("connected - " + this.tagName);

  }

  stamp() {
    console.log(this.content);

    const parent = this.parentNode;
    let shadowRoot = parent.shadowRoot;
    if (!shadowRoot) {
      shadowRoot = parent.attachShadow({mode: this.getAttribute('mode') || 'open'});
    }

    for (let node of this.childNodes) {
      let fragment = document.importNode(node, true);
      shadowRoot.appendChild(fragment);
    }

    parent.removeChild(this);
  }
  
}