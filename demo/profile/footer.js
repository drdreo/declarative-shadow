export class Footer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"}).innerHTML = this.template;
    }

    get template() {
        return `
           <style>
                :host {
                    display: block;
                    position: absolute;
                    bottom: 0;
                    width: 80%;
                }

                ul {
                    list-style: none;
                    border-radius: 3px;
                    border: 1px solid var(--border-color);
                    padding: 0.25rem;
                    display: flex;
                    justify-content: space-evenly;
                    color: #222;
                }
            </style>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Policy</li>
                <li>Terms</li>
                <li>Contact</li>
            </ul>`;
    }
}

customElements.define("my-footer", Footer);
