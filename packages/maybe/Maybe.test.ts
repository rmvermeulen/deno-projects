import { expect } from "x/expect/mod.ts";

import { Maybe } from "./Maybe.ts";

Deno.test("Maybe", () => {
  expect(Maybe.just(15).value()).toBe(15);
  expect(() => Maybe.nothing().value()).toThrow();

  const doubled = Maybe.just(12).map((n) => n * 5);
  expect(doubled.value()).toEqual(60);

  const shout = Maybe.just("lorem ipsum").map((s) => s.toUpperCase());
  expect(shout.value()).toEqual("LOREM IPSUM");

  const unmapped = Maybe.nothing().map((s: any) => s.toUpperCase());
  expect(unmapped.isNothing()).toBe(true);

  const just5 = Maybe.just(5);
  const nothing = Maybe.nothing<number>();
  const sum = (a: any, b: any) => a + b;

  for (
    const [a, b, fn] of [
      [nothing, nothing, Maybe.isNothing],
      [nothing, just5, Maybe.isNothing],
      [just5, nothing, Maybe.isNothing],
      [just5, just5, Maybe.isJust],
    ] as any
  ) {
    var v = Maybe.map2(a, b, sum);
    expect(fn(v)).toBe(true);
  }
});
