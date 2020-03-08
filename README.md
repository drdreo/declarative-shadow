# \<shadow-root>

[![Build Status](https://travis-ci.com/drdreo/declarative-shadow.svg?branch=master)](https://travis-ci.com/drdreo/declarative-shadow)

This is a protoype repository to test and showcase the functionality and needs of a declarative shadow DOM approach discussed at [GitHub](https://github.com/whatwg/dom/issues/510).
It's coherent with my master thesis: "Declarative Shadow Root"

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
