import {ShadowRoot} from "./ShadowRoot.js";
import {OrdinaryComponent} from "./OrdinaryComponent.js";
import DeclarativeShadowDOM from "./declarative-shadow-dom";

// 3rd party
customElements.define("declarative-shadow-dom", DeclarativeShadowDOM, {
    extends: "template"
});

customElements.define("shadow-root", ShadowRoot);
customElements.define("ordinary-component", OrdinaryComponent);
