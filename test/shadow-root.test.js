import { html, fixture, expect } from '@open-wc/testing';

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
        <div>Light content</div>
    </my-test>
    `);

    expect(el.childElementCount).to.equal(1);
    expect(el).lightDom.to.equal(`<div>Light content</div>`);
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
  });



});
