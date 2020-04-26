import { expect } from "https://deno.land/x/expect/mod.ts";

import { suite } from "./test_suite.ts";
import { Maybe } from "./maybe.ts";

const it = suite("Maybe");

it("has a some constructor", async () => {
  const m = Maybe.some(15);
  expect(m.value()).toBe(15);
});

it("has a none constructor", async () => {
  const m = Maybe.none();

  expect(() => m.value()).toThrow();
});

it("can call a function if it has a value", async () => {
  const doubled = Maybe.some(12).map((n) => n * 5);
  expect(doubled.value()).toEqual(60);

  const shout = Maybe.some("some text").map((s) => s.toUpperCase());
  expect(shout.value()).toEqual("SOME TEXT");

  const unmapped = Maybe.none().map((s) => s.toUpperCase());
  expect(unmapped.isNone()).toBe(true);
});

it("can call a 2-arity function with the values of 2 Maybe's", async () => {
  const some5 = Maybe.some(5);
  const none = Maybe.none<number>();
  const sum = (a: any, b: any) => a + b;

  for (
    const [a, b, fn] of [
      [none, none, Maybe.isNone],
      [none, some5, Maybe.isNone],
      [some5, none, Maybe.isNone],
      [some5, some5, Maybe.isSome],
    ] as any
  ) {
    var v = Maybe.map2(a, b, sum);
    expect(fn(v)).toBe(true);
  }
});
