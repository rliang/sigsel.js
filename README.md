# sigsel.js
[![npm](https://img.shields.io/npm/v/sigsel.svg)](https://www.npmjs.org/package/sigsel)
[![size](https://img.shields.io/bundlephobia/minzip/sigsel.svg)](https://bundlephobia.com)
[![deps](https://david-dm.org/rliang/sigsel/status.svg)](https://david-dm.org/rliang/sigsel)

Selectable signals.

## Installation

```sh
npm i sigsel
```

## Usage

```js
import { signal, select } from "sigsel";

(async () => {
  // use signal() to create a signal with an initial value.
  const counter = signal(0);
  const clicks = signal(null);
  const timeouts = signal(null);

  for (;;) {
    // use .put() to update the signal's value.
    const timer = setTimeout(() => timeouts.put(null), 1000);

    render(
      // use .value to access the value within the signal.
      <button onclick={() => clicks.put(null)}>{counter.value}</button>
    );

    // use select() to await the first updated signal.
    switch (await select(clicks, timeouts)) {
      case clicks:
        counter.put(counter.value + 1);
        clearTimeout(timer);
        break;
      case timeouts:
        counter.put(counter.value - 1);
        break;
    }
  }
})();
```
