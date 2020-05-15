export class ShadowRoot extends HTMLElement {

    // attachment called inside constructor due to testing environment not able to catch that lifecyle method
    // It is also possible to call the attachment during connectedCallback().
    constructor() {
        super();
        this.attach();
    }

    attach() {
        // parentNode || parentElement -->  only difference comes when a node's parentNode is not an element. If so, parentElement is null.
        const parent = this.parentElement;
        if (!parent) {
            console.warn("No parent element!");
            return; // created imperatively: document.createElement("shadow-root");
        }

        // if there is an invalid mode, remain inert
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

        // move all children to the parent's shadow root
        while (this.firstChild) {
            shadowRoot.appendChild(this.firstChild);
        }
        parent.removeChild(this);
    }
}
