# Declarative Shadow Root (DSR) \<shadow-root>

[![Build Status](https://travis-ci.com/drdreo/declarative-shadow.svg?branch=master)](https://travis-ci.com/drdreo/declarative-shadow)

This is a protoype repository to test and showcase the functionality and needs of a declarative shadow DOM approach discussed at [GitHub](https://github.com/whatwg/dom/issues/510).
It's coherent with my master thesis: ["Application of a Declarative Shadow DOM for the Definition of Web Components"](https://github.com/drdreo/declarative-shadow/blob/master/Application_of_a_Declarative_Shadow_DOM_for_the_Definition_of_Web_Components_Hahn.pdf)

Chrome will already ship this feature in Chrome 90 driven by Mason Freed https://www.chromestatus.com/feature/5191745052606464

# Abstract
Web Components complement client-side web development with a native component model. However, as of today, the interest in adopting the web standard is still limited
because of disadvantages such as server-side rendering. The idea of it is nothing new, but it has been said that Web Components can not be rendered on the server due to the lack
of a declarative representation of a shadow DOM. The purpose of a declarative approach is to empower non-scripting environments with the features Web Components provide,
especially the encapsulation aspect of the shadow DOM. This would also enhance serverside pre-rendering ofWeb Components and additionally push the adoption of this feature
further among the web community. A declarative shadow root can potentially establish a new way of attaching a shadow DOM additionally to the imperative way. The goal is
not to replace the current mechanism, but to expand the use cases of the shadow DOM. 

The original proposal of a declarative shadow DOM was declined in 2019 by browser
vendors and web specification developers due to implementation costs. The main aim of this thesis is to create a reasonable prototype, point out the advantages and disadvantages
of a declarative approach as well as provide reasons to reconsider developing it.

## Installation
```bash
npm i
```

## Usage
```html
<my-test id="shadow-host">
  <shadow-root mode="open | closed">
    <h2>Shadow h2</h2>
    <slot></slot>
    <div>Shadow div</div>
  </shadow-root>
  <div>Light content</div>
</my-test>

<script type="module">
  import 'shadow-root.js';
</script>
```

## Folder structure

* demo  - the demo files are located here
  * performance -- a HTML file containing a lot of shadow-root elements
  * profile -- an example how to utilise the element for a profile-card
  * index.html -- the demo playground where you can test and expirement with the element freely
* perf  - the performance benchmark using [tachometer](https://www.npmjs.com/package/tachometer)
* src   - the source files for the DSR element
  * declarative-shadow-dom.js -- a third party solution employing a template element
  * index.js -- registering all custom elements for easier access
  * OrdinaryComponent.js -- an ordinary Web Component to test use cases combined with a DSR
* test  - the unit tests which are run by the travis CI. Using @open-wc/testing

# Running
## Local Demo with `es-dev-server`
To run a local development server that serves the basic demo located in `demo/index.html`:
```bash
npm start
```

## Testing (with Karma)
I've used the [open-wc](https://github.com/open-wc/open-wc) for Web Component testing.

To run the suite of karma tests:
```bash
npm run test
```

To run the tests in watch mode:
```bash
npm run test:watch
```

To run the tests with coverage check:
```bash
npm run test:coverage
```

### Testing via BrowserStack
To run the suite of karma tests in BrowserStack, run
```bash
npm run test:bs
```

### Managing Test Snapshots
You can manage the test snapshots using
```bash
npm run test:update-snapshots
```
or
```bash
npm run test:prune-snapshots
```
