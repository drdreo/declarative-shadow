import { html, fixture, expect, assert } from '@open-wc/testing';

import '../shadow-root.js';
// https://gist.github.com/tomalec/a20af4eee86640defdc7aeccccc78c1c#file-declarative-shadow-dom-test-html-L8-L12

describe('ShadowRoot', () => {
  it('should attach a shadowRoot to the element', async () => {
    const el = await fixture(html`
      <my-test id="shadow-root">
        <shadow-root mode="open">       
        </shadow-root>
    </my-test>
    `);

    expect(el.shadowRoot).to.exist;
  });

  it('should add its children into the shadow DOM of the element', async () => {
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

  it('should remove itself and its children', async () => {
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

  it('should remove itself and its children but ignore light DOM', async () => {
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


  it('should be inert created imperatively', async () => {
    const el = await fixture(html`
      <my-test id="shadow-root">
        <div>Light content</div>
      </my-test>
    `);
    const shadow = document.createElement('shadow-root');
    shadow.setAttribute('mode', 'open');
    el.appendChild(shadow);

    expect(el.shadowRoot).to.be.null;
    expect(el.childElementCount).to.equal(2);
    expect(el.children.length).to.equal(2);
    //expect(shadow).to.be.an("HTMLUnknownElement");

  });


  describe("mode Attribute", () => {

    it('should create open shadow root');
    it('should create closed shadow root');

    describe('with mode set to "foo"', () => {
      it('should not create shadow root');
      it('should keep `<shadowroot>` as `HTMLUnknownElement`');
    });

    describe('with mode not set', () => {
      it('should not create shadow root');
      it('should keep `<shadowroot>` as `HTMLUnknownElement`');
    });

  });

  it('should process scripts in <shadow-root>');

  it('should throw when calling attachShadow on an element that already has the shadow root attached by declarative <shadow-root>', async () => {
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
      el.attachShadow({ mode: 'open' });
    }
    expect(attachShadow).to.throw();
  });

  // which one??
  it('should throw when adding two <shadow-root>s');
  it('<shadowroot> element used in the elements that already have a shadow root must not try to attach Shadow Root and must not appear in `childNodes`');

  it('element cannot be used in the elements that cannot have shadow root (see the list for imperative API), in such cases it becomes `HTMLUnknownElement`');
  it('Another (valid) <shadowroot mode="open|closed"> inside the node that already has a parsed <shadowroot>, should make the same effect as <shadowroot> in the element that already has shadow root.');

  describe('<shadowroot> can be used inside the content of a <template>', () => {

    it('should not attach a shadow root to its parent element');
    it('should be available in `.childNodes` as `HTMLShadowRootElement`');
    describe('once template is cloned and connected to the document', () => {
      it('should attach a shadow root to its parent element');
      it('should not be available in `.childNodes`');
    });
  });

  it("should test", async () => {

    // Proposed by @hayatoito at https://github.com/whatwg/dom/issues/510#issuecomment-331323635
    // Construct a dom tree in an imperative way
    const el = await fixture(html`<div></div>`);
    const shadow = document.createElement('shadow-root');
    shadow.mode = "open";
    el.appendChild(shadow);

    expect(el.hasChildNodes()).to.be.true;
    expect(el.shadowRoot).to.be.null;

    // Then, we *serialize* and *deserialize* |p|.
    expect(el).lightDom.to.equal('<shadowroot mode="open"></shadowroot>');
    el.innerHTML = inner_html;

    // Now, |p| changed.
    assert(!el.hasChildNodes(), "dont have childs");
    assert(el.shadowRoot, "have shadow root");

  });

});
