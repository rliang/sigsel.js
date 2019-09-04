"use strict";

const { signal, select } = require(".");

test("setup", async () => {
  const a = signal(), b = signal();
  select(a, b);
  await expect(a._.size).toEqual(1);
  await expect(b._.size).toEqual(1);
  select(a);
  await expect(a._.size).toEqual(2);
  await expect(b._.size).toEqual(1);
});

test("cleanup", async () => {
  const a = signal(), b = signal();
  select(a, b);
  select(a);
  select(b);
  a();
  await expect(a._.size).toEqual(0);
  await expect(b._.size).toEqual(1);
});

test("all selects are resolved", async () => {
  const a = signal(), b = signal();
  const s1 = select(a, b);
  const s2 = select(a);
  setImmediate(a);
  await expect(s1).resolves.toEqual(a);
  await expect(s2).resolves.toEqual(a);
});
