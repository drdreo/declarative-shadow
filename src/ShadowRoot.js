export class ShadowRoot extends HTMLElement {

    constructor() {
        super();
        this.attach();
    }

    attach() {
        const parent = this.parentElement; // this.parentNode
        if (!parent) {
            return; // created imperatively: document.createElement("shadow-root");
        }

        // if there is no mode defined, it should do nothing
        const mode = this.getAttribute("mode");
        if (mode !== "open" && mode !== "closed") {
            return;
        }

        let shadowRoot = parent.shadowRoot;
        if (!shadowRoot) {
            const delegatesFocus = this.hasAttribute("delegatesFocus");
            shadowRoot = parent.attachShadow({mode, delegatesFocus});
        } else {
            throw new Error(`Shadow root already attached to <${parent.tagName}>`);
        }

        for (let node of this.childNodes) {
            let fragment = document.importNode(node, true);
            shadowRoot.appendChild(fragment);
        }
        parent.removeChild(this);
    }
}
