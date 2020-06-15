export class Comments extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"}).innerHTML = this.template;
    }

    get template() {
        return `
             <link rel="stylesheet" type="text/css" href="comments.css">
            <h1>Recent Comments</h1>
            <div>
                <h3>Declarative Shadow DOM</h3>
                <p>To quote the conclusion, working on a declarative solution was fun...</p>
            </div>
            <div>
                <h3>The journey of Web Components</h3>
                <p>Just came across this amazing blog post and wanted to say...</p>
            </div>`;
    }
}

customElements.define("my-comments", Comments);
