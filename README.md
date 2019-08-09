# sigsel.js
[![npm](https://img.shields.io/npm/v/sigsel.svg)](https://www.npmjs.org/package/sigsel)
[![size](https://img.shields.io/bundlephobia/minzip/sigsel.svg)](https://bundlephobia.com)
[![deps](https://david-dm.org/rliang/sigsel/status.svg)](https://david-dm.org/rliang/sigsel)

Selectable signals.

Inspired by Go's channels and Clojure's `core.async`,
with a minimal footprint.

## Installation

```sh
npm i sigsel
```

## Usage

### Counter

```jsx
import { signal, select } from "sigsel";

(async () => {
  // use signal() to create a signal with an initial value.
  // signals are unbuffered and only hold one value.
  const counter = signal(0);
  const timeouts = signal(null);

  for (;;) {
    // use .put() to update the signal's value.
    // all consumers select()'ing a signal will be notified.
    const timer = setTimeout(() => timeouts.put(null), 1000);

    render(
      // use .value to access the value within the signal.
      <button onclick={() => counter.put(counter.value + 1)}>
        {counter.value}
      </button>
    );

    // use select() to await the first updated signal.
    switch (await select(counter, timeouts)) {
      case counter:
        clearTimeout(timer);
        break;
      case timeouts:
        counter.put(counter.value - 1);
        break;
    }
  }
})();
```

### Ping/pong

```js
import { signal, select } from "sigsel";

async function player(name, table, close) {
  for (;;) {
    if ((await select(table, close)) === close) break;
    console.log(name, 'hits:', table.value);
    await new Promise(r => setTimeout(r, 100));
    table.put(table.value + 1);
  }
}

(async () => {
  const table = signal();
  const close = signal();
  player('ping', table, close);
  table.put(0);
  player('pong', table, close);
  await new Promise(r => setTimeout(r, 1000));
  close.put(null);
})();
```
