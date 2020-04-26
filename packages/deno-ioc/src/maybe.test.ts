import { expect } from "../../deno-expect/mod.ts";
import { Maybe } from "./maybe.ts";

Deno.test("Maybe::some constructor", async () => {
  const m = Maybe.some(15);
  expect(m.value()).toBe(15);
});
Deno.test("Maybe::none constructor", async () => {
  const m = Maybe.none();

  expect(() => m.value()).toThrow();
});

Deno.test("Maybe::map", async () => {
  expect(Maybe.some(12).map((n) => n * 5)
    .value()).toEqual(60);
  expect(Maybe.some("some text").map((s) => s.toUpperCase())
    .value()).toEqual("SOME TEXT");
});

Deno.test("Maybe::map2", async () => {
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
