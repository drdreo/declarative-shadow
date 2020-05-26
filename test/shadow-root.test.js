import {elementUpdated, expect, fixture, html} from "@open-wc/testing";

import "../src/index";
// Thanks to Tomek Wytrębowicz for defining some of the mentioned scenarios 
// https://gist.github.com/tomalec/a20af4eee86640defdc7aeccccc78c1c#file-declarative-shadow-dom-test-html-L8-L12

// Example on how to utlize the tools for testing a Web Component
// describe("Ordinary Web Component", async () => {
//     it("should have a shadowRoot", async () => {
//         const el = await fixture(html`
//                 <ordinary-component>
//                 </ordinary-component>
//             `);
//
//         expect(el.shadowRoot).to.exist;
//         expect(el).shadowDom.to.equal(`<div class="ordinary-text">Ordinary</div>`);
//         expect(el).lightDom.to.equal("");
//         expect(el.childElementCount).to.equal(0);
//     });
// });

describe("ShadowRoot", () => {
    it("should attach a shadowRoot to the element", async () => {
        const el = await fixture(html`
              <my-test id="shadow-root">
                <shadow-root mode="open">       
                </shadow-root>
            </my-test>
            `);

        expect(el.shadowRoot).to.exist;
    });

    it("should add its children into the shadow DOM of the element", async () => {
        const el = await fixture(html`
              <my-test id="shadow-root">
                <shadow-root mode="open">
                    <h2>Shadow h2</h2>
                    <slot></slot>
                    <h5>Shadow h5</h5>
                </shadow-root>
                <div>Light content</div>
            </my-test>
            `);

        expect(el).shadowDom.to.equal(`
            <h2>Shadow h2</h2>
            <slot></slot>
            <h5>Shadow h5</h5>
          `);
    });

    it("should remove itself and its children", async () => {
        const el = await fixture(html`
              <my-test id="shadow-root">
                <shadow-root mode="open">
                    <h2>Shadow h2</h2>
                    <slot></slot>
                    <h5>Shadow h5</h5>
                </shadow-root>
            </my-test>
            `);

        expect(el.childElementCount).to.equal(0);
        expect(el.children.length).to.equal(0);
        expect(el).lightDom.to.equal("");
    });

    it("should remove itself and its children but ignore light DOM", async () => {
        const el = await fixture(html`
              <my-test id="shadow-root">
                <shadow-root mode="open">
                    <h2>Shadow h2</h2>
                    <slot></slot>
                    <h5>Shadow h5</h5>
                </shadow-root>
                <div>Light content</div>
              </my-test>
            `);

        expect(el.childElementCount).to.equal(1);
        expect(el.children.length).to.equal(1);
        expect(el).lightDom.to.equal(`<div>Light content</div>`);
    });


    it("should be inert created imperatively", async () => {
        const el = await fixture(html`
              <my-test id="shadow-root">
                <div>Light content</div>
              </my-test>
            `);

        const shadow = document.createElement("shadow-root");
        shadow.setAttribute("mode", "open");
        el.appendChild(shadow);

        expect(el.shadowRoot).to.be.null;
        expect(el.childElementCount).to.equal(2);
        expect(el.children.length).to.equal(2);
        //expect(shadow).to.be.an("HTMLUnknownElement");

    });


    describe("mode Attribute", () => {

        it("should create open shadow root", async () => {
            const el = await fixture(html`
                  <my-test id="shadow-root">
                    <shadow-root mode="open">
                        <h2>Shadow h2</h2>
                    </shadow-root>
                  </my-test>
                `);
            expect(el.shadowRoot).to.exist;
            expect(el.shadowRoot.mode).to.equal("open");
        });

        it("should create closed shadow root", async () => {
            const el = await fixture(html`
                  <my-test id="shadow-root">
                    <shadow-root mode="closed">
                        <h2>Shadow h2</h2>
                    </shadow-root>
                  </my-test>
                `);

            expect(el.shadowRoot).to.be.null;
            expect(el.childElementCount).to.equal(0);
            expect(el.children.length).to.equal(0);
        });

        it("should attach an open shadow root without elements", async () => {
            const el = await fixture(html`
                  <my-test id="shadow-root">
                    <shadow-root mode="open">
                    </shadow-root>
                  </my-test>
                `);
            expect(el.shadowRoot).to.exist;
            expect(el.shadowRoot.mode).to.equal("open");
            expect(el).shadowDom.to.equal("");
        });

        describe("with mode set to \"foo\"", () => {
            let el;
            before(async () => {
                el = await fixture(html`
                  <my-test id="shadow-root">
                    <shadow-root mode="foo">
                        <h2>Shadow h2</h2>
                    </shadow-root>
                  </my-test>
                `);
            });

            it("should not create shadow root", async () => {
                expect(el.shadowRoot).to.be.null;
            });

            it("should keep `<shadow-root>` as `HTMLElement`", async () => {
                expect(el).lightDom.to.equal(`
                        <shadow-root mode="foo">
                         <h2>Shadow h2</h2>
                        </shadow-root>
                      `);
                expect(el.childElementCount).to.equal(1);
                expect(el.children.length).equal(1);
                expect(el.children[0]).to.be.an("HTMLElement");
            });
        });

        describe("with mode not set", () => {
            let el;

            before(async () => {
                el = await fixture(html`
                  <my-test id="shadow-root">
                    <shadow-root>
                        <h2>Shadow h2</h2>
                    </shadow-root>
                  </my-test>
                `);
            });

            it("should not create shadow root", async () => {
                expect(el.shadowRoot).to.be.null;
            });

            it("should keep `<shadow-root>` as `HTMLElement`", async () => {
                expect(el).lightDom.to.equal(`
                        <shadow-root>
                         <h2>Shadow h2</h2>
                        </shadow-root>
                      `);
                expect(el.childElementCount).to.equal(1);
                expect(el.children.length).equal(1);
                expect(el.children[0]).to.be.an("HTMLElement");
            });
        });

    });

    describe("delegatesFocus Attribute", () => {

        it("should set the delegatesFocus option", async () => {
            const el = await fixture(html`
                  <my-test id="shadow-root">
                    <shadow-root mode="open" delegatesFocus>
                        <h2>Shadow h2</h2>
                    </shadow-root>
                  </my-test>
                `);
            expect(el.shadowRoot).to.exist;
            expect(el.shadowRoot.delegatesFocus).to.be.true;
        });

        it("should NOT set the delegatesFocus option", async () => {
            const el = await fixture(html`
                  <div id="shadow-root">
                    <shadow-root mode="open">
                        <h2>Shadow h2</h2>
                    </shadow-root>
                  </div>
                `);
            expect(el.shadowRoot).to.exist;
            expect(el.shadowRoot.delegatesFocus).to.be.false;
        });
    });

    //NOTE: tested manually
    it("should process scripts in <shadow-root>");
    // const el = await fixture(html`
    //         <my-test id="shadow-root">
    //           <shadow-root mode="open">
    //               <h2>Shadow h2</h2>
    //               <slot></slot>
    //                 <script>
    //                     const root = document.currentScript.parentNode;
    //                     const host = root.parentNode;
    //                     host.classList.add("executed");
    //                 </script>
    //           </shadow-root>
    //           <div>Light content</div>
    //         </my-test>
    //       `);


    it("should throw when calling attachShadow on an element that already has the shadow root attached by declarative <shadow-root>", async () => {
        const el = await fixture(html`
                <my-test id="shadow-root">
                  <shadow-root mode="open">
                      <h2>Shadow h2</h2>
                      <slot></slot>
                      <h5>Shadow h5</h5>
                  </shadow-root>
                  <div>Light content</div>
                </my-test>
              `);

        function attachShadow() {
            el.attachShadow({mode: "open"});
        }

        expect(attachShadow).to.throw();
    });

    // Note: Manually Tested
    it("should throw when adding two <shadow-root>s");
// , async () => {
//         try {
//             const el = await fixture(html`
//                 <my-test id="shadow-root">
//                   <shadow-root mode="open">
//                       <h2>Shadow h2</h2>
//                       <slot></slot>
//                       <h5>Shadow h5</h5>
//                   </shadow-root>
//                    <shadow-root mode="open">
//                       <div>Shadow2</div>
//                   </shadow-root>
//                 </my-test>
//               `);
//         } catch (e) {
//             console.log(e);
//             expect(true).to.be.true;
//         }
//
//
//     }

    // Note: Manually Tested
    it("<shadow-root> used in an element that already has a shadow root must not attach shadow root");
    // Note: Manually Tested
    it("element cannot be used in the elements that cannot have shadow root (see the list for imperative API), in such cases it becomes `HTMLUnknownElement`");
    // must be a custom element or a “article”, “aside”, “blockquote”, “body”, “div”, “footer”, “h1-h6”, “header”, “main” “nav”, “p”, “section”, or “span”
    // const el = await fixture(html`
    //             <a>
    //               <shadow-root mode="open">
    //                   <h2>Shadow h2</h2>
    //                   <slot></slot>
    //                   <h5>Shadow h5</h5>
    //               </shadow-root>
    //               <div>Light content</div>
    //             </a>`);
    // expect(el.childElementCount).to.equal(2);


    describe("<shadow-root> can be used inside the content of a <template>", () => {

        let template, host, el;
        before(async () => {
            el = await fixture(html`
                    <div>
                        <template id="template">
                            <my-test id="shadow-host">
                              <shadow-root mode="open">
                                  <h2>Shadow h2</h2>
                                  <slot></slot>
                                  <h5>Shadow h5</h5>
                              </shadow-root>
                              <div>Light content</div>
                            </my-test>
                      </template>
                      <div id="container"></div>
                    </div>
              `);
            template = el.querySelector("#template");
            host = template.content.querySelector("#shadow-host");
        });

        describe("should be inert when template is not cloned yet", () => {

            it("should NOT attach a shadow root to its parent element", () => {
                expect(host.shadowRoot).to.be.null;
            });

            it("should still be available in the lightDOM", () => {
                expect(host).lightDom.to.equal(`
                        <shadow-root mode="open">
                              <h2>Shadow h2</h2>
                              <slot></slot>
                              <h5>Shadow h5</h5>
                          </shadow-root>
                          <div>Light content</div>
                      `);
                expect(host.childElementCount).to.equal(2);
            });
        });

        // Note: Manually Tested
        describe("once template is cloned and connected to the document", () => {
            let clonedHost;
            before(async () => {
                const clone = template.content.cloneNode(true);
                clonedHost = clone.querySelector("#shadow-host");
                el.querySelector("#container").appendChild(clone);
                await elementUpdated(el);
            });

            it("should attach a shadow root to its parent element");
            it("should not be available in `.childNodes`");
        });
    });

    it("should construct a DOM tree imperatively", async () => {
        // Proposed by @hayatoito at https://github.com/whatwg/dom/issues/510#issuecomment-331323635

        const el = await fixture(html`<div></div>`);
        const shadow = document.createElement("shadow-root");
        shadow.setAttribute("mode", "open");// shadow.mode = "open";
        el.appendChild(shadow);

        expect(el.hasChildNodes()).to.be.true;
        expect(el.shadowRoot).to.be.null;

        // Then, we *serialize* and *deserialize* |p|.
        const inner_html = el.innerHTML;
        expect(el.innerHTML).to.equal("<shadow-root mode=\"open\"></shadow-root>");
        el.innerHTML = inner_html;

        // Now, |p| changed and has a shadow Root
        expect(el.hasChildNodes()).to.be.false;
        expect(el.shadowRoot).to.exist;
        expect(el.shadowRoot.mode).to.equal("open");

    });
});
