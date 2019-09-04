# sigsel.js
[![npm](https://img.shields.io/npm/v/sigsel.svg)](https://www.npmjs.org/package/sigsel)
[![size](https://img.shields.io/bundlephobia/minzip/sigsel.svg)](https://bundlephobia.com)
[![deps](https://david-dm.org/rliang/sigsel/status.svg)](https://david-dm.org/rliang/sigsel)

Selectable signals.

Inspired by Go's channels and Clojure's `core.async`,
this library aims to make concurrent programming easier.

Since JS is single-threaded,
there can be no data races across synchronous calls.
This means we do not need channels and can just share variables.
However, we still want a mechanism for synchronizing asynchronous operations.
For that purpose, we use a `signal` object.

## Installation

```sh
npm i sigsel
```

## Usage

### Counter

```jsx
import { signal, select } from "sigsel";

(async () => {
  let counter = 0;
  const click = signal();
  const timeout = signal();
  for (;;) {
    const timer = setTimeout(timeout, 1000);
    render(<button onclick={click}>{counter}</button>);
    switch (await select(click, timeout)) {
      case click:
        counter++;
        break;
      case timeout:
        counter--;
        break;
    }
    clearTimeout(timer);
  }
})();
```
