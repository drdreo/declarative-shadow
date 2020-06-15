export class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"}).innerHTML = this.template;
    }

    get template() {
        return `
            <link rel="stylesheet" type="text/css" href="header.css">
            <img src="https://portfolio.andreas-hahn.at/Images/logo.png" width="50"/>
            <div>Example Profile Site</div>
            <button>Edit</button>`;
    }
}

customElements.define("my-header", Header);
