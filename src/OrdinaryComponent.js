export class OrdinaryComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"}).innerHTML = this.template;
    }

    get template() {
        return `<div class="ordinary-text">Ordinary</div>`;
    }
}
