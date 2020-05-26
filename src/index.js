import {ShadowRoot} from "./ShadowRoot.js";
import {OrdinaryComponent} from "./OrdinaryComponent.js";
import DeclarativeShadowDOM from "./declarative-shadow-dom.js";

customElements.define("shadow-root", ShadowRoot);
customElements.define("ordinary-component", OrdinaryComponent);
// 3rd party implementation test using the template element
customElements.define("declarative-shadow-dom", DeclarativeShadowDOM, {
    extends: "template"
});
