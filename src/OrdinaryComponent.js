export class OrdinaryComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "closed"}).innerHTML = this.template;
    }

    get template() {
        return `
        <style>
            div{
            color: #daa520;
            }
        </style>
        <div class="ordinary-text">Ordinary</div>`;
    }
}
