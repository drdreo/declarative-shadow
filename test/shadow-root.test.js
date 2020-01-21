import { html, fixture, expect } from '@open-wc/testing';

import '../shadow-root.js';

describe('ShadowRoot', () => {
  it('has a default title "Hey there" and counter 5', async () => {
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

    expect(el.id).to.equal('shadow-root');
    expect(el.shadowRoot).to.exist;
  });

 
});
